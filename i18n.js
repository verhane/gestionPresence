import { I18nManager } from 'react-native';
import * as Localization from 'expo-localization';
import ar from './assets/lang/ar';
import fr from './assets/lang/fr';
import { I18n } from 'i18n-js';

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

// Set the initial language based on the device's locale
i18n.locale = 'fr';

// Set the text direction based on the language
const locale = Localization.locale;
if (locale.startsWith('ar')) {
    I18nManager.forceRTL(true);
} else {
    I18nManager.forceRTL(false);
}
I18nManager.forceRTL(i18n.locale.startsWith('ar'));

export default i18n;