import { useContext } from "react"
import { UserContext } from "../context/UserProvider"
import { Navigate } from "react-router-dom"

const RequireAuth = ({ children }) => {

    // Obtenemos el cotexto del user
    const { user } = useContext(UserContext)

    // Evaluamos si USER no existe, devuelve al login
    if (!user){
        return <Navigate to ='/login' />
    }

    // De lo contrario, si existe, accedemos a los childrens
    return children

}

export default RequireAuth