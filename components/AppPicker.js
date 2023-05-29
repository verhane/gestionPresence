import React from 'react';
import {Picker} from "react-native-ui-lib";

const AppPicker = ({...props}) => (
    <Picker {...props}
    >
        {props.children}
    </Picker>
);

export default AppPicker;