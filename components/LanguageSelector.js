import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LogoLista from "../public/assets/logoLista.svg";
import { useTranslation, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import Register from './Register';

// Import translations
import en from '../locales/en.json';
import ar from '../locales/ar.json';
import fr from '../locales/fr.json';

// Initialize i18n instance
i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  debug: process.env.NODE_ENV !== 'production',
  resources: {
    en: { translation: en },
    ar: { translation: ar },
    fr: { translation: fr },
  },
});



export default function LanguageSelector({ onLangChange }) {
  const { i18n } = useTranslation();
  const router = useRouter();
  const [selectedLang, setSelectedLang] = useState(i18n.language);

  useEffect(() => {
    setSelectedLang(i18n.language);
  }, [i18n.language]);

  function handleChange(event) {
    const lang = event.target.value;
    setSelectedLang(lang);
    i18n.changeLanguage(lang);
  
   onLangChange(lang);


    router.push('/', undefined, { shallow: true });
   // router.push(router.pathname, router.asPath, { locale: lang });
  }

  return (
    <div   className="bg-gradient-to-b from-violet-100 to-violet-500 flex flex-col justify-center items-center h-screen"
    id="languageSelector">
      <div className="items-center">
            <LogoLista className="w-70 h-40" />
          </div>
          <label htmlFor="lang-select" className="font-medium text-white-500">Welcome</label>

      <label htmlFor="lang-select">Language:</label>
      <select id="lang-select" value={selectedLang} onChange={handleChange}>
        <option value="en">English</option>
        <option value="fr">Français</option>
        <option value="ar">العربية</option>
      </select>
      <dev><label htmlFor="lang-select" className="font-small text-violet-100 flex flex-col justify-center">
      Lista market 2023© School Supplies Marketplace </label></dev>
    </div>
  );
}

