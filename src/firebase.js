import { initializeApp } from "firebase/app";

// Importamos getAuth para la utentificacion de la app
import { getAuth } from 'firebase/auth'
// importamos firestore
import { getFirestore } from "firebase/firestore/lite"
// importamos STORAGE y metodos
import { getStorage, ref } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBoUA9UzPaoXTKNXcU4rNsuUybcTRA9MjA",
  authDomain: "mx-ketzal-app.firebaseapp.com",
  projectId: "mx-ketzal-app",
  storageBucket: "mx-ketzal-app.appspot.com",
  messagingSenderId: "709820211009",
  appId: "1:709820211009:web:5d6535c44369cc44d64bc0",
  measurementId: "G-VYS7ZJ7D9D",

  databaseURL: "https://mx-ketzal-app.firebaseio.com",

 
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