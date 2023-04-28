import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase.config";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import { useTranslation } from 'react-i18next';
import { useState, useEffect} from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import LogoLista from "../public/assets/logoLista.svg";

import { toast, Toaster } from "react-hot-toast";
import dynamic from 'next/dynamic';

const OtpInput = dynamic(
  () => import('otp-input-react'),
  { ssr: false }
);

export default function Register({ lang }) {
    const [otp, setOtp] = useState("");

    const [loading, setLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [user, setUser] = useState(null);
    const [isClient, setIsClient] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

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

        const formatPh = "+" + phone;
    
        signInWithPhoneNumber(auth, formatPh, appVerifier)
          .then((confirmationResult) => {
          
            window.confirmationResult = confirmationResult;
            setLoading(false);
            setShowOTP(true);
            toast.success("OTP sended successfully!");
     
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      }
    
      function onOTPVerify() {
        setLoading(true);
        
        window.confirmationResult
          .confirm(otp)
          .then(async (res) => {
            console.log(res);
            setUser(res.user);
            setLoading(false);
              })
      
          .catch((err) => {
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
                👍Login Success    {user.value}
              </h2>
            ) : (
                <div   className="bg-gradient-to-b from-violet-100 to-violet-500 flex flex-col justify-center items-center h-screen"
                id="languageSelector">
                  <div className="items-center">
                        <LogoLista className="w-70 h-40" />
                      </div>
                {isClient && showOTP ? (
                  <>
                    <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                      <BsFillShieldLockFill size={30} />
                    </div>
                    <label
                      htmlFor="otp"
                      className="font-bold text-xl text-white text-center"
                    >
                    <span>{t('verificationCode')} </span>
                    </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="opt-container "
                ></OtpInput>
                    <button
                      onClick={onOTPVerify}
                      className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                    >
                      {loading && (
                        <CgSpinner size={20} className="mt-1 animate-spin" />
                      )}
                      <span>{t('verificationCode')} </span>
                    </button>
                  </>
                ) : (
                  <>
               
                   <label htmlFor="lang-select" className="font-medium text-white-500">{t('signup')}</label>
                  <div>
           
                <input type="text" className="rounded-lg" placeholder={t('name')} value={name} onChange={(e) => setName(e.target.value)} />
        
                    <PhoneInput onlyCountries={['ma','fr']} country={"ma"} value={phone} placeholder='phone' onChange={setPhone} />
                    <button
                      onClick={onSignup}
                      className="bg-violet-100 text-white-500 text-sm leading-6 font-medium py-2 px-3 rounded-lg"
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
    