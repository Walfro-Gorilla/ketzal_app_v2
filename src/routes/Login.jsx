// Importamos el useContext para obtener los Contextos
import { useContext } from "react"
// Importamos los Contextos necesarios
import { UserContext } from "../context/UserProvider"

import { Button } from "antd"
import { useNavigate } from "react-router-dom"

const Login = () => {

    // Obtenemos los contextos
    const {user, setUser} = useContext(UserContext)

    // Inicializamos el useNsavigate
    const navigate = useNavigate()

    // Actualizamos el estado USER y enviamos a la raiz del web
    const handleClickLogin = () => {
        setUser(true)
        navigate("/")
    }

    return (
        <>
            <h1>Login</h1>
            <h2>{ user ? "En Linea" : "Offline" }</h2>
            <Button type="primary" onClick={handleClickLogin} >Login</Button>
        </>
    )
}

export default Login