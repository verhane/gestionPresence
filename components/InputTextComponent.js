import React from 'react';
import Styles from "../../../consts/Styles";
import {Text, TextInput, View} from "react-native";
import {colors} from "../../../consts/colors";

export const InputBlock = ({onChange, value, errorValidation,label, placeholder}) => {
    return (
        <View style={Styles.formGroup}>
            <Text style={Styles.label}>{label}</Text>
            <View style={Styles.inputView}>
                <TextInput
                    style={Styles.inputControl}
                    onChangeText={onChange}
                    value={value}
                    placeholder={placeholder}
                />
            </View>
            {errorValidation && (
                <Text style={{color: colors.orange, marginLeft: 5}}>{errorValidation}</Text>)}
        </View>
    );
};


export const InputInline = ({onChange, value, errorValidation,label, placeholder}) => {
    return (
        <Text>Hello</Text>
    );
};

