// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLMnpexmJ_3OQX1sXkusFozTOlddY9p8k",
  authDomain: "command-b7c44.firebaseapp.com",
  projectId: "command-b7c44",
  storageBucket: "command-b7c44.appspot.com",
  messagingSenderId: "431038559118",
  appId: "1:431038559118:web:615d0c4d24d027fddb2adf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)