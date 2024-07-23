// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-authentication-aa6f5.firebaseapp.com",
  projectId: "mern-authentication-aa6f5",
  storageBucket: "mern-authentication-aa6f5.appspot.com",
  messagingSenderId: "393277569958",
  appId: "1:393277569958:web:eb99c927896e79b18aad67"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);