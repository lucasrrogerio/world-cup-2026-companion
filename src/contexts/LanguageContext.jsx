import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '../locales/en.json';
import pt from '../locales/pt.json';
import es from '../locales/es.json';
import ja from '../locales/ja.json';
import fr from '../locales/fr.json';

const translations = { en, pt, es, ja, fr };

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('app-language') || 'pt';
  });

  useEffect(() => {
    localStorage.setItem('app-language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      if (value[k] === undefined) {
        // Fallback to PT if key is missing in current language
        let fallback = translations['pt'];
        for (const fk of keys) {
            if (fallback[fk] === undefined) return null;
            fallback = fallback[fk];
        }
        return fallback;
      }
      value = value[k];
    }
    
    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
