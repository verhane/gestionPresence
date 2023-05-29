import {Colors, Incubator, Text, Typography} from "react-native-ui-lib";

const {TextField} = Incubator;
const InputComponent = ({error, ...rest}) => {
    return (
        <>
            <TextField
                {...rest}
                text60L
                showCharCounter
                floatingLabel={true}
                floatingPlaceholderColor={Colors.primary}
                floatingPlaceholderStyle={{
                    fontSize: Typography.text60.fontSize,
                }}
                style={{paddingVertical: 10}}
                fieldStyle={{
                    borderBottomWidth: 1,
                    borderBottomColor: '#ccc',
                    paddingVertical: 15,
                }}
                placeholderTextColor={'#ccc'}
            />
            {error && <Text text80 red10 style={{
                marginTop: -10,
            }}>{error}</Text>}
        </>
    );
}

export default InputComponent;
