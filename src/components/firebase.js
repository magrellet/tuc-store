// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfJk6EOvJjBfbh-G4dVhfwf64i9NMkwPY",
  authDomain: "tuc-store.firebaseapp.com",
  projectId: "tuc-store",
  storageBucket: "tuc-store.appspot.com",
  messagingSenderId: "572090289609",
  appId: "1:572090289609:web:b79d72a727aa5b3c4dec18"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);