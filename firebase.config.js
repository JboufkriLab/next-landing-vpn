// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
 
    apiKey: "AIzaSyAILkyg9eiQP2c-8qYU1BKJX5-46kSxOWs",
    authDomain: "listamarket-9e9a1.firebaseapp.com",
    projectId: "listamarket-9e9a1",
    storageBucket: "listamarket-9e9a1.appspot.com",
    messagingSenderId: "770265334403",
    appId: "1:770265334403:web:f36894c7d37e3a3fadd1b6",
    measurementId: "G-R27KLSK1Q6"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
