import { initializeApp } from "firebase/app";

// Importamos getAuth para la utentificacion de la app
import { getAuth } from 'firebase/auth'
// importamos firestore
import { getFirestore } from "firebase/firestore/lite"
// importamos STORAGE y metodos
import { getStorage, ref } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyA6iGJEGPBehQw1u4TUcL3oSTXoaDr75W8",
  authDomain: "huitziil-6a3e0.firebaseapp.com",
  databaseURL: "https://huitziil-6a3e0.firebaseio.com",
  projectId: "huitziil-6a3e0",
  storageBucket: "huitziil-6a3e0.appspot.com",
  messagingSenderId: "120958343360",
  appId: "1:120958343360:web:9f48e505703f3066de7525",
  measurementId: "G-51CV63CE38"
 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Create a root reference
const storage = getStorage(app);
// inicializamos el getAuth
const auth = getAuth(app)
// inicializamos firestore
const db = getFirestore(app)

// exportamos
export { auth, db, storage }