import React, {useEffect, useState} from "react";
import {Button, Card, Colors, DateTimePicker, LoaderScreen, Picker, Text, View} from "react-native-ui-lib";
import {SelectList} from "react-native-dropdown-select-list";
import {Alert, StyleSheet} from "react-native";
import useClasseApi  from "../api/useClasseApi";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const AjoutePointageStack = ({navigation}) =>{
    // const {data} = useClasseApi();
    const [selected, setSelected] = useState("");
    const [loading, setLoiding] = useState(false);
    const [classes, setClasses] = useState([]);
    const [date, setDate] = useState(new Date());
    const[time ,setTime] = useState(new Date());


    useEffect(  () => {
        async function fetchClasses(){
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
            const headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };
            setLoiding(true)
            fetch("http://192.168.69.238:1212/api/classes", {headers})
                .then((response) => response.json())
                .then((responseJson) => {
                    setClasses(responseJson);
                })
                .catch((error) => {
                    console.log('error message');
                    console.warn(error)
                }).finally(() => {
                setLoiding(false)
            })
        }
        fetchClasses();
    },[]);

    const handlePointage = async () => {
        if (date === "" || time === "" || selected === " ") {
            Alert.alert("input is required ");
        } else {
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

            const timeValue = moment(time).format('h:mm A')
            const axiosfetch = async ()=> {
                axios.post('http://192.168.69.238:1212/api/createPointage',

                    {
                        date: date,
                        time: timeValue,
                        classe: selected
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                ).then(function (response) {
                    navigation.navigate('ListEleve', {classeId: selected ,pointageid:response.data.pointage.id ,dates:date ,heure:timeValue})
                }).catch(function (error) {
                    console.log(error.response.data);
                    console.warn(error.response.data);
                    // console.log(date);
                    // console.log(time);
                    // console.log(selected)
                });
            }
            axiosfetch();

        }

    }
    if(loading)
        return <LoaderScreen message={'loading classes'} color={Colors.grey40}/>

    return(
        <>

            <View style={styles.main}>

                <Card style={styles.pointage}>
                    <View >
                        <Text style={{marginBottom:10}}>Classe</Text>
                        <Picker style={styles.pickerStyle}
                                placeholder="selectionner"
                                value={selected}
                                showSearch
                                onChange={value => setSelected(value)}
                        >
                            {
                                classes.map(classe=>(
                                    <Picker.Item key={classe.id} value={classe.id} label={classe.libelle_fr}/>

                                ))
                            }



                        </Picker>
                        <Text style={{marginTop:20}}> date</Text>
                        <DateTimePicker style={styles.pickerStyle} value={date}   mode={'date'} onChange={(value)=>setDate(value)}/>
                        <Text style={{marginTop:20}}>heure</Text>
                        <DateTimePicker style={styles.pickerStyle} dateFormat="h:mm A" mode={'time'} value={time} onChange={(value)=>
                            setTime(value)
                        } />

                        <Button   onPress={handlePointage}
                                  label={'ajouter'} style={{backgroundColor:'#00B9E8',marginTop:30}}/>
                    </View>
                </Card>
            </View>
            </>

    )
}
const styles = StyleSheet.create({
    main:{
        padding:25,
        backgroundColor:'#F2F3F4'
    },
    title:{
        marginTop:45
    },
    card_1:{
        padding:15
    },
    pointage:{
        paddingLeft:15,
        paddingRight:15,
        paddingTop:30,
        paddingBottom:30,
        marginTop:30
    },
    heading:{
        color:'black',
        fontSize:25,
        textAlign:'center',
        justifyContent:'center',
        fontWeight:300,
        letterSpacing:2

    },
    pickerStyle:{
        borderColor:'#BEBFC5' ,
        paddingTop:10 ,
        paddingBottom:10 ,
        borderWidth:1,
        paddingLeft:11,
        borderRadius:10
    }
})
export default AjoutePointageStack ;