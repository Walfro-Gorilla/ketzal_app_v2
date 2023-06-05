import React, { useContext } from "react"
import { UserContext } from "../../context/UserProvider"
import { Navigate, Outlet, useNavigate } from "react-router-dom"
import { Layout, Menu } from "antd"


//  Desctructuring el Layout
const { Header, Content, Sider } = Layout;

const items1 = [
    { key: 'Home', label: 'Home' }, { key: 'Proveedores', label: 'Proveedores' }
];


// options del menu lateral
const items3 = [
    {
        key: 'Home',
        icon: React.createElement(HomeOutlined),
        label: "Home",
    },
    {
        key: 'Clientes',
        icon: React.createElement(TeamOutlined),
        label: "Clientes",
    },

    {
        key: 'Proveedores',
        icon: React.createElement(RadarChartOutlined),
        label: "Suppliers",
    },
    {
        key: 'Servicios',
        icon: React.createElement(RadarChartOutlined),
        label: "Services",
    },
    {
        key: '6',
        icon: React.createElement(NotificationOutlined),
        label: "Avisos",
        children: [
            {
                key: '7',
                label: "option1"
            },
        ]
    },

]

// Importamos los iconos
import {
    HomeOutlined, NotificationOutlined, RadarChartOutlined,
    TeamOutlined
} from '@ant-design/icons';




const LayoutRequireAuth = () => {

    const navigate = useNavigate()


    // Obtenemos el cotexto del user
    const { user } = useContext(UserContext)

    // Evaluamos si USER no existe, devuelve al login
    if (!user) {
        return <Navigate to='/login' />
    }

    // Navegador de rutas
    const handleClickMenu = async (value) => {
        console.log("VALUE: ", value.key)
        switch (value.key) {
            case 'Home':
                navigate('/')
                return
            case 'Clientes':
                navigate('/clientes')
                return
            case 'Proveedores':
                navigate('/proveedores')
                return
            case 'Servicios':
                navigate('/services')
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



    // De lo contrario, si existe, accedemos a los childrens
    return (
        <div className="contanier mx-auto">
            <Layout>
                <Header className="header">
                    <div className="logo" />
                    <Menu onClick={handleClickMenu} theme="dark" mode="horizontal" defaultSelectedKeys={['1']} items={items1} />
                </Header>
                <Layout>
                    <Sider
                        width={200}
                        style={{
                            background: 'white',
                        }}
                    >
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{
                                height: '100%',
                                borderRight: 0,
                            }}
                            items={items3}
                            onClick={handleClickMenu}

                        />
                    </Sider>
                    <Layout
                        style={{
                            padding: '0 24px 24px',
                        }}
                    >
                        {/* <Breadcrumb
              style={{
                margin: '16px 0',
              }}
            >
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb> */}
                        <Content
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                                background: 'white',
                            }}
                        >

                            <Outlet />

                        </Content>
                    </Layout>
                </Layout>
            </Layout>


        </div>
    )

}

export default LayoutRequireAuth