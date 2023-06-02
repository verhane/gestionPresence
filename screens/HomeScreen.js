import React, {useEffect, useState} from "react";
import {Button, Card, Colors, Image, Picker, Text, View} from "react-native-ui-lib";
import {Alert, StyleSheet} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useStore} from "../zustand/store";
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import i18n from "../i18n";
const HomeScreen = ({route,navigation})=>{
    const [latestPointages , setLatestPointages] =useState([]);
    const [adminName , setAdminName]=useState('');
    const user = useStore((state)=> state.user);
    const [storeUser ,setStoreUser] = useState(user.id);
    // const {user} =route.params;
    const currentDate = new Date();
    useEffect(()=>{
        setStoreUser(user.id);

    },[])
    const handleLatestPointage = async () => {
        const getToken = async () => {
            try {
                const value = await AsyncStorage.getItem('AccesToken');
                if (value !== null) {
                    return value;
                }
            } catch (error) {
                console.log(error);
            }
        };
        const token = await getToken();
                const axiosfetch = async ()=> {
                    axios.get('http://192.168.100.68:1212/api/getLastPointages/'+storeUser,
                        {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        }
                    ).then(function (response) {
                        // handle success
                        setLatestPointages(response.data[0])
                        // console.warn(response);
                        // console.warn(response.data[1]);
                        setAdminName(response.data[1]);
                    })
                        .catch(function (error) {
                            // handle error
                            console.log(error);
                            console.warn(error);
                        })
                }
                axiosfetch();
    }
    useEffect(()=>{
        handleLatestPointage();
    },[])

// When a value is missing from a language it'll fall back to another language with the key present.
    i18n.enableFallback = true;

  return    ( <><View style={styles.main}>
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <View>
                <Text style={{fontWeight:'bold'}}>
                    {adminName}
                </Text>
            </View>
            <View>
                <Text style={{fontWeight:'bold'}}> {currentDate.toDateString()}</Text>
            </View>
        </View>
      <View style={{alignItems:'center',marginBottom:25}}>
          <Image source={ require('../assets/eljo.png')} style={{width:100,height:100}} />
          <Text style={{marginBottom:10,fontWeight:'bold',fontSize:20,marginTop:10}}> 2BTCM </Text>
      </View>
        <Card style={styles.card}>
            <View style={{marginBottom:25}}>
            <Text style={{marginTop:20,textTransform:'uppercase'}}>{i18n.t('dernierPointage')} :</Text>
            </View>
            <View style={{flexDirection:'row' ,justifyContent:'space-around' ,marginBottom:15}}>
                <View>
                    <Text style={{fontWeight:'bold'}}>{i18n.t('date')}</Text>
                </View>
                <View>
                    <Text style={{fontWeight:'bold'}}>
                        {i18n.t('classe')}
                    </Text>
                </View>
                <View>
                    <Text style={{fontWeight:'bold'}}>{i18n.t('heure')}</Text>
                </View>
            </View>
            {
                latestPointages.map(pointage=>

                    (
                    <>
                    <View style={{flexDirection:'row',alignItems:'center' ,justifyContent:'space-around',marginBottom:20}}>
                        <View>
                            <Text >{pointage.date}</Text>
                        </View>
                        <View>
                            <Text >{pointage.classe.libelle_fr}</Text>
                        </View>
                        <View>
                            <Text >{pointage.heure}</Text>
                        </View>
                    </View></>

                ))
            }

        </Card>
      <View style={{position:'relative'}}>
          <Button
              label={i18n.t('newPointage').toUpperCase()}
              style={{backgroundColor:'#00B9E8',marginTop:30}}
              onPress={()=>navigation.push('ajoutePointage')}
          />
          <AntDesign name="plus" size={25} color="white" style={{position:'absolute',left:'20%',top:'55%'}} />
      </View>
    </View></>)
}
const styles = StyleSheet.create({
    main: {
        padding: 15,
        backgroundColor: '#F2F3F4',

    },
    card: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 30,
        paddingBottom: 30,
        marginTop: 20
    },
})
export default HomeScreen ;