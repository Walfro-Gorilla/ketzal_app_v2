// Importamos createContext
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { createContext, useEffect, useState } from "react"
import { auth } from "../firebase"

// exportamos la constante UserContext que inicia el contexto
export const UserContext = createContext();

const UserProvider = (props) => {

    // Creamos los states requeridos
    const [user, setUser] = useState(false);
    
    const [currentPosition, setCurrentPosition] = useState({
        lng: 0,
        lat: 0,
    })

    // Verificamos si el usuario esta actualmente logeado
    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { email, photoURL, displayName, uid } = user
                setUser({ email, photoURL, displayName, uid })
                // console.log(user)
            } else {
                setUser(null)
            }
        })
        return () => unsuscribe();
    }, [])



    // Metodo para REGISTRAR un usuario
    const registerUser = (email, password) =>
        createUserWithEmailAndPassword(auth, email, password);

    // Metodo para  LOGEAR un usuario
    const loginUser = (email, password) =>
        signInWithEmailAndPassword(auth, email, password)

    // Metodo para hacer SIGNOUT el usuario
    const signOutUser = () => signOut(auth)



    return (
        // Cargamos el Cntexto
        <UserContext.Provider
            value={{
                user, setUser, registerUser, loginUser, signOutUser,
                currentPosition, setCurrentPosition
            }}
        >
            {props.children}
        </UserContext.Provider>
    )

}

export default UserProvider