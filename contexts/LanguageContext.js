import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { AVAILABLE_LANGUAGES, translations } from '../constants/i18n';

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState('ro');

  useEffect(() => {
    const load = async () => {
      try {
        const saved = await AsyncStorage.getItem('appLanguage');
        if (saved && translations[saved]) setLangState(saved);
      } catch (e) {
        console.warn('LanguageContext: eroare încărcare', e);
      }
    };
    load();
  }, []);

  const changeLang = async (code) => {
    try {
      setLangState(code);
      await AsyncStorage.setItem('appLanguage', code);
    } catch (e) {
      console.warn('LanguageContext: eroare salvare', e);
    }
  };

  const t = translations[lang] || translations['ro'];

  return (
    <LanguageContext.Provider value={{ lang, changeLang, t, AVAILABLE_LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}