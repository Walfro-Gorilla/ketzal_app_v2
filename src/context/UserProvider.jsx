// Importamos createContext
import { createContext, useState } from "react"

// exportamos la constante UserContext que inicia el contexto
export const UserContext = createContext()

const UserProvider = (props) => {

    // Creamos los states requeridos
    const [user, setUser] = useState(false)

    return (
        // Cargamos el Cntexto
        <UserContext.Provider value={{ user, setUser }}>
            {props.children}
        </UserContext.Provider>
    )

}

export default UserProvider