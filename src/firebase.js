// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { collection, getDocs, getFirestore, query, where, addDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAK8qKidymT2dYuSbjwUItKOy5CkEO3oOY",
  authDomain: "chat-test-e4e4d.firebaseapp.com",
  projectId: "chat-test-e4e4d",
  storageBucket: "chat-test-e4e4d.appspot.com",
  messagingSenderId: "711298239995",
  appId: "1:711298239995:web:330b723f3c8562d50acf5e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(); 
export const storage = getStorage();
export const db = getFirestore();
