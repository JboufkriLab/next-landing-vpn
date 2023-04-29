import Feature from "../components/Feature";
import Pricing from "../components/Pricing";
import Hero from "../components/Hero";
import LanguageSelector from "../components/LanguageSelector";
import Layout from "../components/Layout/Layout";
import SeoHead from "../components/SeoHead";
import { useEffect, useState } from "react";
import "react-phone-input-2/lib/style.css";
import Register from "../components/Register";
import Cookies from 'js-cookie';




export default function Home() {

  const [user, setUser] = useState(null);
  const [lang, setLang] = useState(null);
  const isLoggedIn = Cookies.get('loggedIn');




  
  function handleLangChange(lang) {
    setLang(lang);
  }
  return (
    <>
      <SeoHead title='Lista market Landing Page' />
     
      {isLoggedIn ? (
        <>
        <Layout>
        <Hero /><Feature /><Pricing /> </Layout>
        </>
        ) : (
          <>
          { lang ? (
            <Register lang={lang} />
          ) : (
            <LanguageSelector onLangChange={handleLangChange}/>
          )}
  </>
         
        )}

    </>
  );
}
