// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6MkWryliFzNMdEulC19PTCvKNixOPixI",
  authDomain: "sifabnab-35a61.firebaseapp.com",
  projectId: "sifabnab-35a61",
  storageBucket: "sifabnab-35a61.firebasestorage.app",
  messagingSenderId: "57111557068",
  appId: "1:57111557068:web:3d32bb29ec51c95bd1e369"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();