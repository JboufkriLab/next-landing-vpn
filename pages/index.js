import Feature from "../components/Feature";
import Pricing from "../components/Pricing";
import Hero from "../components/Hero";
import LanguageSelector from "../components/LanguageSelector";
import Layout from "../components/Layout/Layout";
import SeoHead from "../components/SeoHead";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster }from "react-hot-toast";
import Register from "../components/Register";




export default function Home() {

  const [user, setUser] = useState(null);
  const [lang, setLang] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  function handleLangChange(lang) {
    setLang(lang);
  }
  return (
    <>
      <SeoHead title='Lista market Landing Page' />
     
      {user ? (
        <>
        <Layout>
        <Hero /><Feature /><Pricing /> </Layout>
        </>
        ) : (
          <>
          {isClient && lang ? (
            <Register lang={lang} />
          ) : (
            <LanguageSelector onLangChange={handleLangChange}/>
          )}
  </>
         
        )}


    

         
           {/*  */}

     
        
        
     
    </>
  );
}
