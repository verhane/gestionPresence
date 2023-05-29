import {useEffect, useState} from "react";


const useClasseApi = ()=>{
    const {data , setData} = useState([]);
    useEffect(()=>{
        getClasses()
    },[]);
    const getClasses= ()=>{

        fetch("http://192.168.100.4:1212/api/classes", {
        })
            .then((response) => response.json())
            .then((responseJson) => {
                setData(responseJson);
            })
            .catch((error) => {
                console.log('erroc message');
            });
    }
    console.warn(data)

    return {data}
}
export default useClasseApi