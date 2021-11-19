// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcJ114jLQHaUI7N-FbtNIRyRxRhwxePuE",
  authDomain: "tinder-clone-1cbfc.firebaseapp.com",
  projectId: "tinder-clone-1cbfc",
  storageBucket: "tinder-clone-1cbfc.appspot.com",
  messagingSenderId: "576992015814",
  appId: "1:576992015814:web:970a5e5cf0e0b26088eec7",
  measurementId: "G-Q1WCX280EK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };