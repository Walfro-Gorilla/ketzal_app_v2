// Importamos LINK para la navegacion del navbar
import { NavLink, useNavigate } from "react-router-dom"
import { Button, Input, Menu, Space } from "antd"
import { Header } from "antd/es/layout/layout"

// Importamos los iconos de sntd
import {
    HomeTwoTone,
    UserAddOutlined,
    SisternodeOutlined,
    ContactsOutlined,
    LogoutOutlined,
    TeamOutlined,
    LoginOutlined
} from '@ant-design/icons';

// Importamos usecontext y UserContext
import { useContext } from "react"
import { UserContext } from "../context/UserProvider"




const Navbar = ({ isInLine = false }) => {

    // Importamos el contexto del USER
    const { user, signOutUser } = useContext(UserContext)
    const navigate = useNavigate()


    // CASE para navegacion d epaginas y logout
    const handleClickMenu = async (info) => {
        switch (info.key) {
            case 'inicio':
                navigate('/')
                return
            case 'clientes':
                navigate('/clientes')
                return
            case 'proveedores':
                navigate('/proveedores')
                return
            case 'perfil':
                navigate('/perfil')
                return
            case 'login':
                navigate('/login')
                return
            case 'signup':
                navigate('/signup')
                return

            case 'logout':
                console.log("Quierescerrar sesion")
                try {
                    await signOutUser()
                } catch (error) {
                    console.log(error)
                }
                return
        }
    }

    return (
        <>
            <Menu

                style={{
                    backgroundColor: "darkslategrey",
                    fontSize: 15,
                    color: "white",
                    border: "none"
                }}
                mode={isInLine ? "inline" : "horizontal"}
                onClick={(info) => {
                    handleClickMenu(info)
                }}
                items={
                    user ? (
                        [
                            {
                                label: <Input.Search
                                    placeholder="Busca aqui..."
                                />,
                                key: 'buscar'

                            },
                            {
                                label: "Inicio",
                                key: "inicio",
                                icon: <HomeTwoTone />
                            },
                            {
                                label: "Clientes",
                                key: "clientes",
                                icon: <TeamOutlined />
                            },
                            {
                                label: "Proveedores",
                                key: "proveedores",
                                icon: <SisternodeOutlined />
                            },
                            {
                                label: "Perfil",
                                key: "perfil",
                                icon: <ContactsOutlined />
                            },
                            {
                                key: "logout",
                                danger: true,
                                icon: <LogoutOutlined />
                            }


                        ]

                    ) : (
                        [

                            {
                                label: "Login",
                                key: "login",
                                icon: <LoginOutlined />
                            },
                            {
                                label: "Signup",
                                key: "signup",
                                icon: <UserAddOutlined />
                            }
                        ]
                    )

                }
            >

            </Menu>
        </>
    )
}

export default Navbar