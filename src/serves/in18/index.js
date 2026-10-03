// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resource } from './resource';
import { resolveInitialLanguage } from '../locale';

i18n
    .use(initReactI18next)
    .init({
        resources: resource,
        lng: resolveInitialLanguage(), // from the URL prefix (/ru, /uz); English otherwise
        interpolation: {
            escapeValue: false, // React already safely handles escaping
        },
        react: {
            useSuspense: false, // Set to true if using Suspense
        },
    });

export default i18n;
