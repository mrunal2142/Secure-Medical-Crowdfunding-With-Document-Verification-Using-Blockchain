// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApYOuwHbHOTidBrWp45RkmJYOByQloUzY",
  authDomain: "final-year-project-01-b05fb.firebaseapp.com",
  projectId: "final-year-project-01-b05fb",
  storageBucket: "final-year-project-01-b05fb.appspot.com",
  messagingSenderId: "619091058146",
  appId: "1:619091058146:web:eb7c1b918d41ca07122dbb",
  measurementId: "G-HC8E2H3JGW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app)
// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
