import React, {useEffect, useState} from "react";
import {Alert, BackHandler, FlatList, ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import {Button, Card, Colors, LoaderScreen, Modal, Picker, Text, View} from "react-native-ui-lib";
import PickerItem from "react-native-ui-lib/src/components/picker/PickerItem";
import {useNavigation} from "@react-navigation/native";
import Eleve from "../components/Eleve";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment/moment";
import {AntDesign} from "@expo/vector-icons";
import {Ionicons} from '@expo/vector-icons';
import axios from "../config/axios";


function Item(props) {
    return null;
}

const ListElevesScreen = ({route, navigation}) => {

    const [classe, setClasse] = useState({});
    const [eleves, setEleves] = useState([]);
    const [loading, setLoading] = useState(false);
    const [etat, setEtat] = useState('');
    // const [status ,setStatus]=useState('');
    const [checkedStatus, setCheckedStatus] = useState(true);
    const {classeId} = route.params;
    const {pointageid} = route.params;
    const {dates} = route.params;
    const {heure} = route.params;
    const etats = [
        {id: 0, libelle_fr: 'tous'},
        {id: 1, libelle_fr: 'Present'},
        {id: 2, libelle_fr: 'absent'},
        {id: 3, libelle_fr: 'absent justifier'}
    ]


    useEffect(() => {
        const fetchListEleves = async () => {
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
            setLoading(true)
            fetch("http://192.168.69.238:1212/api/listEleve/" + classeId, {headers})
                .then((response) => response.json())
                .then((responseJson) => {
                    setClasse(responseJson.classe);
                    setEleves(responseJson.eleves);

                })
                .catch((error) => {
                    console.log('error message');
                }).finally(() => {
                setLoading(false)
            })

            // fetch("http://192.168.100.4:1212/api/refPresent", {
            // })
            //     .then((response) => response.json())
            //     .then((responseJson) => {
            //         setEtats(responseJson.etats);
            //
            //     })
            //     .catch((error) => {
            //         console.log('error message');
            //     })
        }
        fetchListEleves();


    }, []);

    // useEffect(()=>{
    //     navigation.addListener('beforeRemove', (e) => {
    //         const action = e.data.action;
    //         e.preventDefault();
    //         Alert.alert(
    //             'pointage changes?',
    //             ' Are you sure to leave the screen?',
    //             [
    //                 { text: "Don't leave", style: 'cancel', onPress: () => {} },
    //                 {
    //                     text: 'leave',
    //                     style: 'destructive',
    //                     onPress: () => navigation.dispatch(action),
    //                 },
    //             ]
    //         );
    //     }),
    //         [navigation]
    // },[])

    const handlePickerItem = (value) => {
        setEtat(value);
        AsyncStorage.getItem('AccesToken').then(token => {
            const headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };
            axios.get('getdetailPointageTous/' + pointageid + "/" + value, {
                headers
            }).then(res => {
                // setEleves(res.data);
                let combineData = res.data.map((eleve) => {
                    return {
                        id: eleve.id,
                        nom: eleve.nom,
                        prenom: eleve.prenom,
                        status: eleve.details_pointages[0].ref_etats_presence_id
                    }
                });
                // console.warn(combineData);
                setEleves(combineData);
            }).finally(() => {
                setLoading(false)
            });
        });


        // if (value === 2) {
        //     const getdetailPointageAbsent = async () => {
        //         const getToken = async () => {
        //             try {
        //                 const value = await AsyncStorage.getItem('AccesToken');
        //                 if (value !== null) {
        //                     return value;
        //                 }
        //             } catch (error) {
        //                 console.log(error);
        //             }
        //         };
        //         const token = await getToken();
        //         const headers = {
        //             Accept: 'application/json',
        //             'Content-Type': 'application/json',
        //             Authorization: `Bearer ${token}`,
        //         };
        //         fetch("http://192.168.69.238:1212/api/getdetailPointageAbsent/" + pointageid, {headers})
        //             .then((response) => response.json())
        //             .then((responseJson) => {
        //                 // console.warn(responseJson.eleves);
        //                 // setEleves(responseJson.eleves);
        //                 const eleeves = responseJson.eleves;
        //                 let combineData = eleeves.map((eleve) => {
        //                     return {
        //                         id: eleve.id,
        //                         nom: eleve.nom,
        //                         prenom: eleve.prenom,
        //                         status: 2
        //                     }
        //                 });
        //                 // console.warn(combineData);
        //                 setEleves(combineData);
        //                 // setCheckedStatus(true);
        //             })
        //             .catch((error) => {
        //                 console.warn(error)
        //             })
        //     }
        //     getdetailPointageAbsent();
        // } else if (value === 1) {
        //     const getdetailPointagePresent = async () => {
        //         const getToken = async () => {
        //             try {
        //                 const value = await AsyncStorage.getItem('AccesToken');
        //                 if (value !== null) {
        //                     return value;
        //                 }
        //             } catch (error) {
        //                 console.log(error);
        //             }
        //         };
        //         const token = await getToken();
        //         const headers = {
        //             Accept: 'application/json',
        //             'Content-Type': 'application/json',
        //             Authorization: `Bearer ${token}`,
        //         };
        //         setLoading(true)
        //         fetch("http://192.168.69.238:1212/api/getdetailPointagePresent/" + pointageid, {headers})
        //             .then((response) => response.json())
        //             .then((responseJson) => {
        //                 // console.warn(responseJson.eleves);
        //                 // setEleves(responseJson.eleves);
        //                 const eleeves = responseJson.eleves;
        //                 let combineData = eleeves.map((eleve) => {
        //                     return {
        //                         id: eleve.id,
        //                         nom: eleve.nom,
        //                         prenom: eleve.prenom,
        //                         status: 1
        //                     }
        //                 });
        //                 // console.warn(combineData);
        //                 setEleves(combineData);
        //             })
        //             .catch((error) => {
        //                 console.warn(error)
        //             }).finally(() => {
        //             setLoading(false)
        //         })
        //     }
        //     getdetailPointagePresent();
        // } else if (value === 3) {
        //     const getdetailPointageAbsJus = async () => {
        //         const getToken = async () => {
        //             try {
        //                 const value = await AsyncStorage.getItem('AccesToken');
        //                 if (value !== null) {
        //                     return value;
        //                 }
        //             } catch (error) {
        //                 console.log(error);
        //             }
        //         };
        //         const token = await getToken();
        //         const headers = {
        //             Accept: 'application/json',
        //             'Content-Type': 'application/json',
        //             Authorization: `Bearer ${token}`,
        //         };
        //         fetch("http://192.168.69.238:1212/api/getdetailPointageAbsJus/" + pointageid, {headers})
        //             .then((response) => response.json())
        //             .then((responseJson) => {
        //                 const eleeves = responseJson.eleves;
        //                 let combineData = eleeves.map((eleve) => {
        //                     return {
        //                         id: eleve.id,
        //                         nom: eleve.nom,
        //                         prenom: eleve.prenom,
        //                         status: 3
        //                     }
        //                 });
        //                 // console.warn(combineData);
        //                 setEleves(combineData);
        //             })
        //             .catch((error) => {
        //                 console.warn(error)
        //             })
        //     }
        //     getdetailPointageAbsJus();
        // } else if (value === 0) {
            // const getdetailPointageTous = async () => {
            //     const getToken = async () => {
            //         try {
            //             const value = await AsyncStorage.getItem('AccesToken');
            //             if (value !== null) {
            //                 return value;
            //             }
            //         } catch (error) {
            //             console.log(error);
            //         }
            //     };
            //     const token = await getToken();
            //     const headers = {
            //         Accept: 'application/json',
            //         'Content-Type': 'application/json',
            //         Authorization: `Bearer ${token}`,
            //     };
            //     fetch("http://192.168.100.4:1212/api/getdetailPointageTous/" + pointageid, {headers})
            //         .then((response) => response.json())
            //         .then((responseJson) => {
            //             const eleeves = responseJson.eleves;
            //             let combineData = eleeves.map((eleve) => {
            //                 return {
            //                     id: eleve.id,
            //                     nom: eleve.nom,
            //                     prenom: eleve.prenom,
            //                     status: eleve.details_pointages.ref_etats_presence_id
            //                 }
            //                 // console.warn(eleve.details_pointages);
            //             });
            //             // console.warn(combineData);
            //             setEleves(responseJson.eleves);
            //         })
            //         .catch((error) => {
            //             console.warn(error)
            //         })
            // }
            // getdetailPointageTous();
            // }


        // }
    }
    if (loading)
        return <LoaderScreen message={'loading'} color={Colors.grey40}/>

    return (
        <>
            <View style={styles.section_etudiant}>
                <Card style={{padding: 10}}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View>
                            <Text style={styles.pointage_heading}> classe: <Text text60BO>{classe.libelle_fr}</Text>
                            </Text>
                        </View>
                        <View>
                            <Picker
                                // containerStyle={{backgroundColor:"red",flexDirection:"row"}}
                                value={etat}
                                placeholderTextColor={Colors.red1}
                                placeholder={"etat"}
                                floatingPlaceholder
                                onChange={handlePickerItem}
                            >
                                {etats.map(e => (
                                    <PickerItem key={e.id} value={e.id} label={e.libelle_fr}/>
                                ))}


                            </Picker>
                        </View>
                    </View>
                    <View style={{marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View>
                            <Text style={{fontWeight: 'bold'}}>Date: {moment(dates).format('D-M-Y')}</Text>
                        </View>
                        <View>
                            <Text style={{fontWeight: 'bold'}}>Heure: {heure}</Text>
                        </View>
                    </View>


                    {/*{eleve.map(value => {*/}
                    {/*  return  <Eleve eleve={value} />*/}
                    {/*})}*/}
                    {/*<View style={{ height: 1500 }}>*/}
                    <FlatList
                        data={eleves}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={false}
                        renderItem={({item}) => {
                           /* if (item.details_pointage === undefined)*/
                            // console.warn(item.details_pointages)


                            if (item.status === 2 || item.status === 3) {
                                return (< Eleve
                                    nom={item.nom + ' ' + item.prenom}
                                    matricule={item.id}
                                    pointageId={pointageid}
                                    classId={classeId}
                                    checkedStatus={false}

                                />)
                            }
                            // else if (item.status === 3) {
                            //     return (< Eleve
                            //         nom={item.nom + ' ' + item.prenom}
                            //         matricule={item.id}
                            //         pointageId={pointageid}
                            //         classId={classeId}
                            //         checkedStatus={false}
                            //
                            //     />)
                            // }
                            else if (item.status === 1) {
                                return (< Eleve
                                    nom={item.nom + ' ' + item.prenom}
                                    matricule={item.id}
                                    pointageId={pointageid}
                                    classId={classeId}
                                    checkedStatus={true}
                                />)

                            }
                            /*else if(item.details_pointages[0].ref_etats_presence_id===2){
                                return (< Eleve
                                    nom={item.nom + ' ' + item.prenom}
                                    matricule={item.id}
                                    pointageId={pointageid}
                                    classId={classeId}
                                    checkedStatus={false}
                                />)
                            }*/

                            else {
                                return (< Eleve
                                    nom={item.nom + ' ' + item.prenom}
                                    matricule={item.id}
                                    pointageId={pointageid}
                                    classId={classeId}
                                    checkedStatus={true}
                                />)
                            }


                        }


                        }
                        keyExtractor={item => item.id}
                    />

                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View>
                            {/*<Button*/}
                            {/*    label={' pointage'.toUpperCase()}*/}
                            {/*    style={{backgroundColor:'#00B9E8',marginTop:30}}*/}
                            {/*    onPress={()=>navigation.push('ajoutePointage')}*/}
                            {/*/>*/}
                            <TouchableOpacity onPress={() => navigation.navigate('ajoutePointage')}>
                                <AntDesign name="plus" size={30} color="#8F00FF"
                                           style={{position: 'absolute', left: '10%', top: '55%'}}/>
                            </TouchableOpacity>

                        </View>
                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                                <Ionicons name="home" size={30} color="#8F00FF"/>
                            </TouchableOpacity>
                            {/*<Button*/}
                            {/*    label={'home'.toUpperCase()}*/}
                            {/*    style={{flex:2,backgroundColor:'#00B9E8',marginTop:30 ,padding:25}}*/}
                            {/*    onPress={()=>navigation.push('ajoutePointage')}*/}
                            {/*    icon={() => }*/}
                            {/*/>*/}
                            {/*<AntDesign name="home" size={25} color="white" style={{position:'absolute',left:'10%',top:'55%'}} />*/}
                        </View>
                    </View>
                    </ScrollView>
                </Card>
            </View></>


    );

}
const styles = StyleSheet.create({
    section_etudiant: {
        backgroundColor: '#F2F3F4',
        padding: 10
    },
    pointage_heading: {
        fontSize: 20,
        fontWeight: 300,
        letterSpacing: 1
    },
    list_eleves: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
})
export default ListElevesScreen;