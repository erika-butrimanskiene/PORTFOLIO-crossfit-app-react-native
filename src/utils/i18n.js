import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';

import enJson from '../assets/locale/en.json';
import ltJson from '../assets/locale/lt.json';

i18next.use(initReactI18next).init({
  // we init with resources
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: enJson,
    lt: ltJson,
  },
  react: {
    useSuspense: true,
  },
});

export default i18next;
