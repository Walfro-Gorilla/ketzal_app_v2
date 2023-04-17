// Importamos LINK para la navegacion del navbar
import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { UserContext } from "../context/UserProvider"
import { Button } from "antd"

const Navbar = () => {

    const { user, setUser } = useContext(UserContext)

    return (
        <>
            {
                user ? (
                    <>
                        <NavLink to='/'> Inicio |</NavLink>
                        <NavLink to='/clients'> Clients |</NavLink>
                        <NavLink to='/proveedores'> Proveedores |</NavLink>
                        <NavLink to='/perfil'> Perfil |</NavLink>
                        <Button type="primary" danger onClick={() => setUser(false)} >Logout</Button>
                    </>
                )
                    : (

                        <NavLink to='/login'> Login |</NavLink>
                    )
            }
        </>
    )
}

export default Navbar