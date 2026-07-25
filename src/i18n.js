import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Traducciones empaquetadas en el bundle en vez de pedirlas por HTTP:
// evita dos peticiones extra y el parpadeo de texto sin traducir al cargar.
import es from './Locales/es/translation.json';
import en from './Locales/en/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: es },
      en: { translation: en },
    },
    fallbackLng: 'es',
    supportedLngs: ['es', 'en'],
    // El detector devuelve variantes regionales ('es-CO', 'en-US'). Sin esto,
    // i18n.language quedaba en 'es-CO' y las comparaciones === 'es' fallaban:
    // un visitante en Colombia veia la bandera de EE.UU. con el sitio en español.
    load: 'languageOnly',
    nonExplicitSupportedLngs: true,
    debug: import.meta.env.DEV,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
