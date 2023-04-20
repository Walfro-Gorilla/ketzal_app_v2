import { initializeApp } from "firebase/app";

// Importamos getAuth para la utentificacion de la app
import { getAuth } from 'firebase/auth'
// importamos firestore
import { getFirestore } from "firebase/firestore/lite"


const firebaseConfig = {
  apiKey: "AIzaSyCfhuCl28RqE3bSc4xRh4XZGQHBpW0NWss",
  authDomain: "huitziil-6a3e0.firebaseapp.com",
  databaseURL: "https://huitziil-6a3e0.firebaseio.com",
  projectId: "huitziil-6a3e0",
  storageBucket: "huitziil-6a3e0.appspot.com",
  messagingSenderId: "120958343360",
  appId: "1:120958343360:web:68e9d40583e44958de7525",
  measurementId: "G-N5E56HYM7D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// inicializamos el getAuth
const auth = getAuth(app)
// inicializamos firestore
const db = getFirestore(app)

// exportamos
export {auth, db}