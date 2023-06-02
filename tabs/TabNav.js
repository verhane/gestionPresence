import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs' ;
import HomeScreen from "../screens/HomeScreen";
import ajoutePointageStack from "../stackScreen/ajoutePointageStack";
import {AntDesign} from "@expo/vector-icons";
import Settings from "../screens/settings";
import { Feather } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
function TabNav(props) {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home"
                        component={HomeScreen}
                        options={()=>({
                            headerShown:false,
                            tabBarIcon:({color ,size})=>(
                                <AntDesign name="home" size={size} color={color} />
                            )
                        })}
            ></Tab.Screen>
            <Tab.Screen name="Parametres"
                        component={Settings}
                        options={()=>({
                            headerShown:false,
                            tabBarIcon:({color ,size})=>(
                                <Feather name="settings" size={size} color={color} />
                            )
                        })}
            ></Tab.Screen>
        </Tab.Navigator>
    );
}

export default TabNav;