import {Picker, DateTimePicker, View, Text, Colors} from "react-native-ui-lib";
import {Feather} from "@expo/vector-icons";


const PickerComponent = ({children, error, label, size, items, pickerType = 'picker', ...restPicker}) => {
    return (
        pickerType === 'picker' ?
            <View>
                <Picker
                    useSafeArea
                    {...restPicker}
                    enableModalBlur={false}
                    style={{fontSize: 18}}
                    showSearch

                    searchStyle={{color: Colors.blue30, placeholderTextColor: Colors.primary}}
                    trailingAccessory={
                        <Feather name="chevron-down" color={Colors.primary} size={25}/>
                    }
                    floatingPlaceholder
                    floatingPlaceholderColor={Colors.primary}
                    floatingPlaceholderStyle={{
                        fontSize: 14,
                    }}
                    grey20
                    containerStyle={{
                        backgroundColor: Colors.green80,
                        paddingHorizontal: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: Colors.grey50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        paddingVertical: 5,
                        paddingTop: 20,
                    }}
                    placeholderTextColor={Colors.primary}
                    migrateTextField
                >
                    {
                        children
                    }
                </Picker>
                {error && <Text text80 red10>{error}</Text>}
            </View>
            : <View>
                <Feather
                    containerStyle={{
                        position: 'absolute',
                        zIndex: 99,
                        top: 15,
                        right: 10,
                    }} name={"event"}/>
                <DateTimePicker
                    {...restPicker}
                    themeVariant={'light'}
                    placeholderTextColor={'#ccc'}
                    hideUnderline
                    style={{
                        borderWidth: 1,
                        borderColor: Colors.$outlineDisabled,
                        borderRadius: 10,
                        paddingHorizontal: 10,
                        paddingVertical: size === 'sm' ? 10 : 15,
                    }}
                />
                {error && <Text text80 red10>{error}</Text>}
            </View>
    );
}

export default PickerComponent;
