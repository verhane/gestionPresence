import { I18nManager } from 'react-native';
import * as Localization from 'expo-localization';
import ar from './assets/lang/ar';
import fr from './assets/lang/fr';
import { I18n } from 'i18n-js';
import AsyncStorage from "@react-native-async-storage/async-storage";

// Set the fallback language

// Define the translations
const i18n = new I18n({
    fr,
    ar,
});
i18n.translations = {
    fr,
    ar,
};
i18n.fallbacks = true;
i18n.defaultLocale = 'fr';
const languagePreference = async () => {
    try {
        const value = await AsyncStorage.getItem('@language');
        if (value !== null) {
            i18n.locale = value  ;
            return value;

        }
    } catch (error) {
        console.log('Error loading language preference:', error);
    }
    // Default language if preference not set
    return 'fr';
    i18n.locale = 'fr';
};
languagePreference();
// Set the language based on the preference


// Set the text direction based on the language
const locale = Localization.locale;
if (locale.startsWith('ar')) {
    I18nManager.forceRTL(true);
} else {
    I18nManager.forceRTL(false);
}
I18nManager.forceRTL(i18n.locale.startsWith('ar'));

export default i18n;