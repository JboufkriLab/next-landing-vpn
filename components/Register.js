import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useRouter } from 'next/router';
import { auth } from "../firebase.config";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import { useTranslation } from 'react-i18next';
import { useState, useEffect} from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import LogoLista from "../public/assets/logoLista.svg";
import Cookies from 'js-cookie';

import { toast, Toaster } from "react-hot-toast";
import dynamic from 'next/dynamic';

const OtpInput = dynamic(
  () => import('otp-input-react'),
  { ssr: false }
);

export default function Register({ lang }) {
    const [otp, setOtp] = useState('');

    const [loading, setLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [user, setUser] = useState(null);
    const [isClient, setIsClient] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const [invalidCode, setInvalidCode] = useState(false);
    const router = useRouter();

    const onInputChange = (otp) => {
        setOtp(otp);
      
        // Check if the OTP code has 6 digits
        if (otp.length === 6) {
            setOtp(otp);
          onOTPVerify(otp);
          alert(otp);
        }
      };

    const { t, i18n } = useTranslation();

    useEffect(() => {
      setIsClient(true);
    }, []);
  

    function onCaptchVerify() {
    
        if (!window.recaptchaVerifier) {
          window.recaptchaVerifier = new RecaptchaVerifier(
            "recaptcha-container",
            {
              size: "invisible",
              callback: (response) => {
                onSignup();
              },
              "expired-callback": () => {},
            },
            auth
          );
        }

      }
    
      function onSignup() {
        setLoading(true);
        onCaptchVerify();

        const appVerifier = window.recaptchaVerifier;
   //TODO phone patern 
        const formatPh = "+33634692789";
       // const formatPh = "+33634692789" + phone;
    
        signInWithPhoneNumber(auth, formatPh, appVerifier)
          .then((confirmationResult) => {
          
            window.confirmationResult = confirmationResult;
            setLoading(false);
            setShowOTP(true);
            toast.success("OTP sended successfully!");
     
          })
          .catch((error) => {
            setErrorMessage("error"+ error.message);
            console.log(error);
            setLoading(false);
          });
      }
    
      function onOTPVerify(optIn) {
        setLoading(true);
        
        window.confirmationResult
          .confirm(otp)
          .then(async (res) => {
            console.log(res);
            setUser(res.user);
            
            setLoading(false);
            Cookies.set('loggedIn', true, { expires: 1 });
            router.push('/', undefined, { shallow: true });

              })
      
          .catch((err) => {
            setErrorMessage("error"+ err.message);
            console.log(err);
            setLoading(false);
            
          });
      }
    
      return (
        <section className="bg-gradient-to-b from-violet-100 to-violet-500 flex flex-col justify-center items-center h-screen">
          <div>
            <Toaster toastOptions={{ duration: 4000 }} />
            <div id="recaptcha-container"></div>
            {user ? (
              <h2 className="text-center text-white font-medium text-2xl">
                👍Login Success  
              </h2>
            ) : (
                <div   className="bg-gradient-to-b from-violet-100 to-violet-500 flex flex-col justify-center items-center h-screen"
                id="languageSelector">
                <div className="items-center">
                        <LogoLista className="w-70 h-40" />
                </div>
                {isClient && showOTP ? (
                    /** Show OPT cverification */
                  <>
                   
                    <div className="text-white-500 text-center">
                    <span>{t('verificationCode')} </span>
                    </div>
            
                         <OtpInput
                            value={otp}
                            onChange={onInputChange}
                            isInputNum={true}
                            inputStyle="otp-input"
                            hasErrored={invalidCode}
                            OTPLength={6}
                            otpType="number"
                            disabled={false}
                            shouldAutoFocus
                            className="mt-4 opt-container"

                                 />
                    
                      {loading && (
                        <CgSpinner size={20} className="mt-1 animate-spin" />
                      )}
                   
                    {errorMessage && <p className="text-white-500">{errorMessage}</p>}
                  </>
                ) : (
                /** Phone input namre  */    
                  <>
               
                <label htmlFor="lang-select" className="font-medium text-white-500">{t('signup')}</label>
                
                <div className="flex flex-col ">   
           
                <input type="text" className="w-full mb-2bg-white rounded-2xl mt-4" placeholder={t('name')} value={name} onChange={(e) => setName(e.target.value)} />
        
                <PhoneInput onlyCountries={['ma','fr']} 
                    country={"ma"} 
                    value={phone} 
                    placeholder='phone' 
                    onChange={setPhone} 
                    className="w-full mb-2 rounded-3xl" />
                   <button
                      onClick={onSignup}
                      className="w-full mb-2 bg-violet-100 text-white-500 text-sm leading-6 font-medium rounded-3xl"
                    >
                      {loading && (
                        <CgSpinner size={20} className="mt-1 animate-spin" />
                      )}
                     {t('submit')}
                    </button>
                  
                      </div>
                  </>
                )}
              </div>
            )}
          </div>
        </section>
      );
    };
    