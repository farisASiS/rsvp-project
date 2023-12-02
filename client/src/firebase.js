// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "rsvp-project-75c75.firebaseapp.com",
  projectId: "rsvp-project-75c75",
  storageBucket: "rsvp-project-75c75.appspot.com",
  messagingSenderId: "263431669343",
  appId: "1:263431669343:web:1d4bc6899908a74e76bdea"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);