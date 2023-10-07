// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyALivHWq_STyzrNz4GEALpjpr2XRWXXvCc',
  authDomain: 'nasa-open-science.firebaseapp.com',
  projectId: 'nasa-open-science',
  storageBucket: 'nasa-open-science.appspot.com',
  messagingSenderId: '506072332552',
  appId: '1:506072332552:web:a2dbd11d371440f207d4bd',
  measurementId: 'G-YT9RVLCZ39',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const user = getAuth(app)