import { initializeApp } from "firebase/app";

// Optionally import the services that you want to use
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// import {...} from "firebase/database";
// import {...} from "firebase/functions";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDRJIqn64mRbFQzJmM93EIWbu-JA4MxhWU",
  authDomain: "treasure-7c50a.firebaseapp.com",
  projectId: "treasure-7c50a",
  storageBucket: "treasure-7c50a.appspot.com",
  messagingSenderId: "466377491076",
  appId: "1:466377491076:web:0a8a9cfde920453a1cf8d1",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
