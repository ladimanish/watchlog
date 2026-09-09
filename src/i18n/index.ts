import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import enCommon from '../locales/en/common.json';
import enViews from '../locales/en/views.json';
import esCommon from '../locales/es/common.json';
import esViews from '../locales/es/views.json';

export const supportedLocales = ['en', 'es'] as const;
export type AppLocale = (typeof supportedLocales)[number];

export const isAppLocale = (value: string): value is AppLocale =>
  supportedLocales.includes(value as AppLocale);

const resources = {
  en: { common: enCommon, views: enViews },
  es: { common: esCommon, views: esViews },
} as const;

if (!i18next.isInitialized) {
  i18next.use(initReactI18next).init({
    fallbackLng: 'en',
    lng: 'en',
    resources,
    defaultNS: 'views',
    ns: ['common', 'views'],
    interpolation: {
      escapeValue: false,
    },
  });
}

export const changeAppLocale = async (locale: AppLocale): Promise<void> => {
  await i18next.changeLanguage(locale);
};

export default i18next;
