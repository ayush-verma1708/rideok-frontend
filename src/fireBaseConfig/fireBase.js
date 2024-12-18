import { initializeApp } from 'firebase/app';
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDIiCIJYff0LwE9xbba2ZQUpCHkbqs-ew8',
  authDomain: 'rideok-12298.firebaseapp.com',
  projectId: 'rideok-12298',
  storageBucket: 'rideok-12298.appspot.com', // Corrected storage bucket URL
  messagingSenderId: '927826249876',
  appId: '1:927826249876:web:3eb9dd189aac0b4047cc81',
  measurementId: 'G-L7C6B555CT',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Get the authentication instance

export {
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  GoogleAuthProvider,
  signInWithPopup,
};
