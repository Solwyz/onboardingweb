// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCompdhnpqcUNZoCLWSDFpBIzTYIDIuM18",
  authDomain: "onboardingweb-c36c3.firebaseapp.com",
  projectId: "onboardingweb-c36c3",
  storageBucket: "onboardingweb-c36c3.firebasestorage.app",
  messagingSenderId: "1083573181976",
  appId: "1:1083573181976:web:717938c867928a3cbfad6d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);