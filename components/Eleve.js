import React, {useEffect, useState} from 'react';
import {Checkbox, Colors, Picker, RadioButton, Text, View, Modal, RadioGroup} from "react-native-ui-lib";
import PickerItem from "react-native-ui-lib/src/components/picker/PickerItem";
import {Pressable, StyleSheet} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Eleve = (props) => {
    const [etats ,setEtats] =useState([]);
    const [etat ,setEtat] = useState(1);
    const [checkedEleve , setCheckedEleve] =useState(props.checkedStatus);
    const [modalVisible, setModalVisible] = useState(false);
   const [status ,setStatus]=useState('')

    useEffect(()=>{
        setCheckedEleve(props.checkedStatus)
    },[props.checkedStatus])

    const handleCheck = ()=>{
        setCheckedEleve(!checkedEleve)
        if(checkedEleve ===  true){
            // alert(props.matricule);
            setModalVisible(true);
        }else{
            setStatus('');
            const createdetailPointagePresent= async ()=> {
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
                fetch("http://192.168.69.238:1212/api/detaislPointagePresent/"+props.matricule+'/'+props.pointageId, {headers})
                    .then((response) => response.json())
                    .then((responseJson) => {
                        // console.warn(responseJson.detailsPointage);

                    })
                    .catch((error) => {
                        console.warn(error)
                    })
            }
            createdetailPointagePresent();
        }

    }

    const handleButtoGroup =(value)=>{
         if (value===2){
             const createdetailPointageAbs= async ()=> {
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
                 fetch("http://192.168.69.238:1212/api/detaislPointageAbsent/"+props.matricule+'/'+props.pointageId, {headers})
                     .then((response) => response.json())
                     .then((responseJson) => {
                         // console.warn(responseJson.detailsPointage);

                     })
                     .catch((error) => {
                         console.warn(error)
                     })
             }
             createdetailPointageAbs();
             setStatus('Abs');
             setModalVisible(false);
         }else if (value ===3){
             const createdetailPointageAbsJust= async ()=>{
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
                 fetch("http://192.168.69.238:1212/api/detaislPointageAbsentJust/"+props.matricule+'/'+props.pointageId, {headers})
                     .then((response) => response.json())
                     .then((responseJson) => {
                         // console.warn(responseJson.detailsPointage);

                     })
                     .catch((error) => {
                         console.warn(error)
                     })
             }
             createdetailPointageAbsJust();
               setStatus('Jus');
             setModalVisible(false);

         }
    }

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <RadioGroup
                            style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:5}}
                            initialValue={true} onValueChange={handleButtoGroup}>
                            <View style={{padding:20}}>
                            <RadioButton value={2} label={'Absent'}/>
                            </View>
                            <View>
                            <RadioButton value={3} label={'absent justifier'}/>
                            </View>
                        </RadioGroup>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() =>{
                                setCheckedEleve(true)
                                setModalVisible(!modalVisible)}
                        }>
                            <Text style={styles.textStyle}>Annuler</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

        <View style={styles.list_eleves}>

            <View style={{display:'flex',flex:1,justifyContent:'space-between',flexDirection:"row"}}>
                <View>
                    <View style={{marginBottom:10}}>
                        <Text style={{fontWeight:300,fontSize:15}}>{props.nom}</Text>

                    </View>
                    <View>
                        <Text style={{fontWeight:'bold'}}>{props.matricule}</Text>
                    </View>
                </View>
                <View>
                <Checkbox value={checkedEleve} onValueChange={handleCheck}/>
                <Text>{status}</Text>
                </View>
            </View>


        </View>

        </>
    );
};

const styles = StyleSheet.create({

    list_eleves:{
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row',
        marginBottom:20
    },
    centeredView: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalView: {
        justifyContent: 'center',
        width:'70%',
        height:'25%',
        margin: 5,
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,

    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 3,
        textAlign: 'center',
    },
})
export default Eleve;