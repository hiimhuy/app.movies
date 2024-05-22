// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZwqeOzGKswY_lMfe_s0n4sNwT30FmMxo",
  authDomain: "ofilm-resource.firebaseapp.com",
  projectId: "ofilm-resource",
  storageBucket: "ofilm-resource.appspot.com",
  messagingSenderId: "566967566492",
  appId: "1:566967566492:web:8cffca4ec1fd199e68ad59",
  measurementId: "G-WRK72NXE5W"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const auth = getAuth()
export const db = getFirestore(app)