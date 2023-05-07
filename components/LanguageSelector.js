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
          <div className="flex flex-col "> 
          <div className='mb-4'>   
            
          <label className="font-medium text-white-500">Welcome</label>
          </div>
       
          
   
      <select id="lang-select" value={selectedLang} onChange={handleChange} className="w-full mb-2bg-white rounded-2xl">
      <option value="" defaultChecked>Choose your language</option>
        <option value="en">English</option>
        <option value="fr">Français</option>
        <option value="ar">العربية</option>
      </select> </div>
      <dev className="fixed bottom-0 left-0 right-0 mx-auto w-1/2"><label className="font-small text-gray-400 flex flex-col justify-center">
      Lista market 2023© <br/>School Supplies Marketplace </label></dev>
    </div>
  );
}

