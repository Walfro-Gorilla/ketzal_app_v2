import { useContext } from "react"
import { UserContext } from "../../context/UserProvider"
import { Navigate, Outlet } from "react-router-dom"

const LayoutRequireAuth = () => {

    // Obtenemos el cotexto del user
    const { user } = useContext(UserContext)

    // Evaluamos si USER no existe, devuelve al login
    if (!user) {
        return <Navigate to='/login' />
    }

    // De lo contrario, si existe, accedemos a los childrens
    return (
        <div className="contanier mx-auto">
            <Outlet />
        </div>
    )

}

export default LayoutRequireAuth