// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAludB5yA27zJZJg57jbSnIDmBVoutOmI",
  authDomain: "united-university-9a20b.firebaseapp.com",
  projectId: "united-university-9a20b",
  storageBucket: "united-university-9a20b.appspot.com",
  messagingSenderId: "818771971529",
  appId: "1:818771971529:web:fedc449f1b3ff2bd272c18",
  measurementId: "G-WKX38JTNT5",
  databaseUrl: "https://united-university-9a20b-default-rtdb.firebaseio.com",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
