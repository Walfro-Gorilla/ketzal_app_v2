// importamos el createContext y metodos de react
import { createContext, useState } from "react";

// exportamos la constante SupplierContext que inicia el contexto
export const ClientContext = createContext();

const ClientProvider = (props) => {

    // inicializamos los states requeridos
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState('')
    const [telephone, setTelephone] = useState("")
    const [password, setPassword] = useState("")
    const [lastLogin, setLastLogin] = useState("")
    const [birthdate, setBirthdate] = useState("")
    const [status, setStatus] = useState("")
    const [rate, setRate] = useState(null)
    const [photoURL, setPhotoURL] = useState('')
    const [history, setHistory] = useState('')
    const [wishList, setWishList] = useState('')
    const [comments, setComments] = useState('')
    const [type, setType] = useState('')



    return (
        // cargamos el contexto
        <ClientContext.Provider
            value={{
                firstName, setFirstName,
                lastName, setLastName,
                email, setEmail,
                telephone, setTelephone,
                password, setPassword,
                lastLogin, setLastLogin,
                birthdate, setBirthdate,
                status, setStatus,
                rate, setRate,
                photoURL, setPhotoURL,
                history, setHistory,
                wishList, setWishList,
                comments, setComments,
                type, setType,
            }}
        >
            {props.children}
        </ClientContext.Provider>
    )

}

export default ClientProvider