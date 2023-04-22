import { useContext } from "react"
import { UserContext } from "../context/UserProvider"
import LayoutStructure from "../components/layouts/LayoutStructre"

const Home = () => {

    // Obtenemos el context de USER
    const {user} = useContext(UserContext)

    return (
        <>
            <h1>Home</h1>
            <h3>Hola {user.email} </h3>
            
        </>
    )
}

export default Home