import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAf1tjP6Z-jBJXxHjmZqUIceugUClGNjm0",
  authDomain: "zerotwo-sih.firebaseapp.com",
  projectId: "zerotwo-sih",
  storageBucket: "zerotwo-sih.appspot.com",
  messagingSenderId: "1020992742129",
  appId: "1:1020992742129:web:9151dcff875d3cea5a7f50",
  measurementId: "G-BH6NW8L85G"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);
