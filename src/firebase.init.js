// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvgSP1p4N8nV3NES0OCq_a9wl1f7KmIZU",
  authDomain: "e-function-75d6d.firebaseapp.com",
  projectId: "e-function-75d6d",
  storageBucket: "e-function-75d6d.appspot.com",
  messagingSenderId: "426674710169",
  appId: "1:426674710169:web:48009e8eb3c40dbc80fa08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;