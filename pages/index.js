import Feature from "../components/Feature";
import Pricing from "../components/Pricing";
import Hero from "../components/Hero";
import LanguageSelector from "../components/LanguageSelector";
import Layout from "../components/Layout/Layout";
import SeoHead from "../components/SeoHead";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster }from "react-hot-toast";

export default function Home() {

  const [user, setUser] = useState(null);
  return (
    <>
      <SeoHead title='Lista market Landing Page' />
      <Layout>
      {user ? (
         <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
         <LanguageSelector />
         </div>
       
        
        ) : (
         
          <><Hero /><Feature /><Pricing /></>
        )}


    

         
           {/*  */}

     
        
        
      </Layout>
    </>
  );
}
