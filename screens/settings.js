import React, {useEffect, useState} from "react";
import {Button, Card, Colors, Image, Picker, Text, View} from "react-native-ui-lib";
import {Alert, StyleSheet, TouchableOpacity} from "react-native";
import PickerItem from "react-native-ui-lib/src/components/picker/PickerItem";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import i18n from "../i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Updates from 'expo-updates';
import {useStore} from "../zustand/store";

const Settings = ()=>{
    const [etat , setEtat] = useState('');
    const [language, setLanguage] = useState(i18n.locale);
    const globalVariable = useStore((state) => state.globalVariable);
    const setGlobalVariable = useStore((state) => state.setGlobalVariable);
    const trans = [
        {
            id:1 ,lang:'fr'
        },
        {
            id:2 ,lang:'ar'
        }
    ];
    const handlePickerItem = async (value)=>{
        setEtat(value);
        if(value ===1){
            const newLanguage = 'fr' ;
            setLanguage(newLanguage);
            i18n.locale = newLanguage;
            try {
                await AsyncStorage.setItem('@language', newLanguage);
            } catch (error) {
                console.log('Error saving language preference:', error);
            }
            await Updates.reloadAsync();
        }
        if (value==2){
            const newLanguage = 'ar' ;
            setLanguage(newLanguage);
            i18n.locale = newLanguage;
            try {
                await AsyncStorage.setItem('@language', newLanguage);
            } catch (error) {
                console.log('Error saving language preference:', error);
            }
            await Updates.reloadAsync();

        }
    }
    return(
        <View style={{padding:20}}>
        <Card style={{padding:15,height:150}}>
            <View style={{flexDirection:'row'}}>
                <View style={{marginTop:10,marginRight:10}}>
            {/*<FontAwesome name="language" size={35} color="black" />*/}
                <MaterialIcons name="language" size={35} color="black" />
                </View>
                <View>


            <Picker
                // containerStyle={{backgroundColor:"red",flexDirection:"row"}}
                value={etat}
                placeholderTextColor={Colors.red1}
                placeholder={i18n.t('translation')}
                floatingPlaceholder
                onChange={handlePickerItem}
            >
                {trans.map(e => (
                    <PickerItem key={e.id} value={e.id} label={e.lang}/>
                ))}


            </Picker>
                </View>
            </View>
            <TouchableOpacity onPress={()=>{
                    AsyncStorage.removeItem('AccesToken');
                    setGlobalVariable(true)
            }}>
            <View style={{flexDirection:'row'}}>
                <View style={{marginRight:10}}>
                    <Ionicons name="log-out-outline" size={35} color="black" />
                </View>
                <View>
                    <Text style={{fontSize:20,marginTop:5}}>{i18n.t('deconnecter')}</Text>
                </View>
            </View>
            </TouchableOpacity>
        </Card>
        </View>
    )
}

export default Settings;