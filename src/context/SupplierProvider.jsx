// importamos el createContext y metodos de react
import { createContext, useEffect, useState } from "react";

// exportamos la constante SupplierContext que inicia el contexto
export const SupplierContext = createContext();

const SupplierProvider = (props) => {

    // inicializamos los states requeridos
    const [logoURL, setLogoURL] = useState()

    return (
        // cargamos el contexto
        <SupplierContext.Provider
        value={{
            logoURL, setLogoURL
        }}
        >
            {props.children}
        </SupplierContext.Provider>
    )

}

export default SupplierProvider