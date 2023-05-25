// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZ1tpCVczOnWju3XXMP_I4_Stx17MCcwc",
  authDomain: "rc4nnect.firebaseapp.com",
  projectId: "rc4nnect",
  storageBucket: "rc4nnect.appspot.com",
  messagingSenderId: "319139139388",
  appId: "1:319139139388:web:17110d9cb95577de1d5839"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)