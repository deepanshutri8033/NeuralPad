// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "neauralpad.firebaseapp.com",
  projectId: "neauralpad",
  storageBucket: "neauralpad.firebasestorage.app",
  messagingSenderId: "151323592573",
  appId: "1:151323592573:web:b24595c4fbbdb0ad18ee14",
  measurementId: "G-ZDDK4NWYME"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth= getAuth(app);
export const googleProvider = new GoogleAuthProvider();