import {Button, Card, Picker, Text, TextField, View, Image, Toast, Colors} from "react-native-ui-lib";
import {Alert, StyleSheet} from 'react-native'
import {useEffect, useState} from "react";
import axios from "axios";
import * as SecureStore from 'expo-secure-store'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ErrorMessage, Formik} from "formik";
import * as Yup from 'yup';
import {useStore} from "../zustand/store";
const Login = ({navigation})=> {
    const [email ,setEmail ] =useState('') ;
    const [password , setPassword] = useState('');
    const [Token ,setToken]=useState([]);
    // const [User ,setUser]=useState([]);
    const [toastVisible , setToastVisible] = useState(false);
    const [msgError ,setMsgError]= useState(null);
    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email est obligatoire'),
        password: Yup.string().required('Password est obligatoire'),
    });
    const globalVariable = useStore((state) => state.globalVariable);
    const setGlobalVariable = useStore((state) => state.setGlobalVariable);
    const setUser = useStore((state)=> state.setUser)
    const user = useStore((state)=> state.user);


    return(
       <>

           <Toast
            visible={msgError!=null}
            position={'top'}
            message={msgError}
            autoDismiss={3500}
            onDismiss={()=>{
                setMsgError(null)
            }}
            backgroundColor={'#FB607F'}
        />

           <Formik
               initialValues={{ email: '', password: '' }}
               validationSchema={validationSchema}
               onSubmit={(values,{ setSubmitting }) => {
                   axios.post('http://192.168.100.68:1212/api/login', {
                       email: values.email,
                       password: values.password ,
                       device_name:'gestionAbsent'
                   }).then(function (response) {
                       AsyncStorage.setItem('AccesToken',response.data.token);
                       setUser(response.data.user);
                       console.warn(response.data.user);
                       console.warn(user);
                       setGlobalVariable(false)

                   }).catch(function (error) {
                       setToastVisible(true);
                       setMsgError(error.response.data.msg)
                   });
               }}
           >

               {({
                     values,
                     errors,
                     touched,
                     handleChange,
                     handleBlur,
                     handleSubmit,
                     isSubmitting,

                 }) => (<View style={{padding:10,backgroundColor:'whitesmoke',flex:1,justifyContent:'center'}}>

            <Card style={styles.card_login}>
                <View style={{alignItems:'center',marginBottom:25}}>
                <Image source={ require('../assets/eljo.png')} style={{width:150,height:150}} />
                </View>
               <View style={styles.input}>
                   {/*<Text style={styles.title}>Pointage</Text>*/}
                   <View style={styles.inputContainerFirst}>
                   <TextField
                       style={styles.firstInput}
                       onChangeText={handleChange('email')}
                       onBlur={handleBlur('email')}
                       value={values.email}
                       placeholder={'email'}
                       required email
                       enableErrors

                   />
                   <Text style={{color:'red',position:'absolute',top:'80%'}}><ErrorMessage name="email"/></Text>
                   </View>
                   <View style={styles.inputContainerLast}>
                   <TextField
                       style={styles.firstInput}
                       placeholder={'password'}
                       onChangeText={handleChange('password')}
                       onBlur={handleBlur('password')}
                       value={values.password}
                       secureTextEntry={true}
                       // onChangeText={(value)=>{setPassword(value)}}
                       enableErrors

                   />
                   <Text style={{color:'red',position:'absolute',top:'80%'}}><ErrorMessage name="password"/></Text>
                   </View>
                   {/*{errors.password && touched.password && <Text>{errors.password}</Text>}*/}
                   <Button label='se connecter'
                           style={{backgroundColor:'#00B9E8',marginTop:30}}
                           // onPress={VerifyEmail}
                           onPress={handleSubmit}
                   />
               </View>
            </Card>
        </View>)}

           </Formik>

           </>
    )
}
const styles = StyleSheet.create({
    title:{
      fontSize:20 ,
      textAlign:'center',
        fontWeight:300,
        marginBottom:30,
        letterSpacing:2
    },
    card_login:{
        backgroundColor:'white',
        padding:20
    },
    input:{
        flexDirection:'column',
        justifyContent:'space-between'
    },
    firstInput:{
        borderWidth:1,
        paddingTop:10,
        paddingBottom:15,
        paddingLeft:10,
        paddingRight:10,
        borderRadius:15,
        borderColor:'#E5E4E2',
        fontSize:15
    },
    inputContainerFirst:{
        marginBottom:25,
    },
    inputContainerLast:{
        marginBottom:20,
    }



})
export default Login