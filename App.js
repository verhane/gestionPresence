import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import {View, Text, Button, Colors, Checkbox, Card, DateTimePicker, Picker, LoaderScreen} from 'react-native-ui-lib';
import {SelectList} from "react-native-dropdown-select-list";
import React, {createContext, useContext, useEffect, useState} from "react";
import  ListPointagge from './screens/ListElevesScreen';
import AjoutePointageScreen from './screens/AjoutePointageScreen';
import DatePicker from 'react-native-date-picker';
import PickerItem from "react-native-ui-lib/src/components/picker/PickerItem";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListElevesScreen from "./screens/ListElevesScreen";
import Login from "./components/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreen from "./screens/HomeScreen";
import { FontAwesome } from '@expo/vector-icons';
import { AppProvider } from './Context/AppContext';
import { AppContext  } from './Context/AppContext';
import { useStore } from './zustand/store';
import TabNav from "./tabs/TabNav";
import AjoutePointageStack from "./stackScreen/ajoutePointageStack";
import {I18nextProvider} from "react-i18next";
import i18n from "./i18n";




const Stack = createNativeStackNavigator();
export default function App() {
    const [showScreen , setShowScreen] =useState(false);
    // const {setGlobalVariable} = useContext(AppContext);
    const globalVariable = useStore((state) => state.globalVariable);
    const setGlobalVariable = useStore((state) => state.setGlobalVariable);
    const [loading , setLoading]=useState(true);
    useEffect(()=>{
        handleToken();
        setTimeout(()=>{
            setLoading(false)
        },1000)
    },[])
    const handleToken = async ()=>{

        const dataToken = await AsyncStorage.getItem('AccesToken');
        if (!dataToken){
            // navigation.replace('login');
            // setShowScreen(true)
            setGlobalVariable(true)
        }else{
            // navigation.navigate('ajoutePointage');
            // setShowScreen(false);
            setGlobalVariable(false)
        }
    }
    if(loading)
        return <LoaderScreen message={'loading'} color={Colors.grey40}/>
  return (
      <I18nextProvider i18n={i18n}>
      <NavigationContainer>
          <Stack.Navigator>
              {globalVariable===true?(
                  <Stack.Screen
                      name="login"
                      component={Login}
                      options={{title: 'sign in'}}
                  />
              ):(
                  <Stack.Screen
                      name="Home"
                      component={TabNav}

                      options={{

                          title: 'accueil' ,
                          headerRight: () => (
                              <FontAwesome name="sign-out" size={24} color="#00B9E8" onPress={()=>
                              {
                                  AsyncStorage.removeItem('AccesToken');
                                  setGlobalVariable(true)

                              }} />
                          ),
                      }
                  }
                  />

              )}
              <Stack.Screen
                  name="ajoutePointage"
                  component={AjoutePointageStack}
                  options={{title: 'cree pointage'}}
              />
              <Stack.Screen name="ListEleve" component={ListElevesScreen}
                            options={{title: 'list des eleves'}}
              />

          </Stack.Navigator>

      </NavigationContainer>
      </I18nextProvider>
  );
}

        const styles = StyleSheet.create({
    section_etudiant:{
      backgroundColor:  '#F2F3F4',
        padding:25 ,
    },
    pointage_heading:{
      fontSize:20,
        fontWeight:300,
        letterSpacing:1
    },
    list_eleves:{
   display:'flex',
      justifyContent:'space-between',
        flexDirection:'row'
    },

});
