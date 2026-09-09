import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/react/shallow';
import { changeAppLocale, type AppLocale } from '../i18n';
import { usePreferencesStore } from '../store/usePreferencesStore';

export const useLocale = () => {
  const { locale, setLocale } = usePreferencesStore(
    useShallow((state) => ({
      locale: state.locale,
      setLocale: state.setLocale,
    })),
  );
  const { i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language !== locale) {
      void changeAppLocale(locale);
    }
  }, [i18n.language, locale]);

  const handleLocaleChange = (nextLocale: AppLocale) => {
    setLocale(nextLocale);
    void changeAppLocale(nextLocale);
  };

  return { locale, setLocale: handleLocaleChange };
};
