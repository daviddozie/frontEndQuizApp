import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyB1f4UrPkYipWGfqM_TgAaAttFGzNCqLVA",
  authDomain: "techquizapp-fa466.firebaseapp.com",
  projectId: "techquizapp-fa466",
  storageBucket: "techquizapp-fa466.appspot.com",
  messagingSenderId: "635236483836",
  appId: "1:635236483836:web:29d6d3b5a6018567dc8d79"
};

const app = initializeApp(firebaseConfig);
export const database = getAuth(app);