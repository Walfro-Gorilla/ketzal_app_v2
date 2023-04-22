// Importacion de elementos de Routing
import { Routes, Route, useNavigate } from "react-router-dom"
import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "./context/UserProvider"
import { Drawer, Breadcrumb, Layout, Menu, theme, Input } from "antd"

// Importamos las rutas
import Login from "./routes/Login"
import Home from "./routes/Home"
import Clients from "./routes/Clients"
import Perfil from "./routes/Perfil"
import Proveedores from "./routes/Proveedores"
import Services from "./routes/Services"
import Expedient from "./routes/Expedient"
import RegisterUser from "./routes/RegisterUser"
import NotFound from "./routes/NotFound"

// Importamos los componentes
import Navbar from "./components/Navbar"
import MapView from "./components/Maps/MapView"
import LayoutRequireAuth from "./components/layouts/LayoutRequireAuth"
import LayoutContainerForm from "./components/layouts/LayoutContainerForm"

// Importamos los iconos
import { HomeOutlined, LaptopOutlined, NotificationOutlined, RadarChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';


//  Desctructuring el Layout
const { Header, Content, Sider } = Layout;

const items1 = [
  { key: 'Home', label: 'Home' }, { key: 'Proveedores', label: 'Proveedores' }
];


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
    // children: [
    //   {
    //     key: '2',
    //     label: "Services"
    //   },

    // ]
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

// Importamos hoja de estilos CSS
import "./App.css"


const App = () => {

  const navigate = useNavigate()


  useEffect(() => {
    // console.log("ITEMS3: ", items3)
  }, [])

  // Obtenemos el USER del contexto
  const { user } = useContext(UserContext)
  // State para abri/cerrar menu lateral
  const [openMenu, setOpenMenu] = useState(false)

  // LOADING para esperar la respuesta del backend de firebase
  if (user === false) {
    return <p>Loading...</p>
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
              <Routes>

                {/* Rutas protegidas */}
                <Route path="/" element={<LayoutRequireAuth />}>
                  <Route index element={<Home />} />
                  <Route path="/clientes" element={<Clients />}> </Route>
                  <Route path="/perfil" element={<Perfil />}> </Route>
                  <Route path="/proveedores" element={<Proveedores />}> </Route>
                  <Route path="/services" element={<Services />}> </Route>
                  <Route path="/expedient" element={<Expedient />}> </Route>
                  <Route path="/map" element={<MapView />}> </Route>
                </Route>

                {/* Rutas publicas */}
                <Route path="/" element={<LayoutContainerForm />} >
                  <Route path="/login" element={<Login />}> </Route>
                  <Route path="/signup" element={<RegisterUser />}> </Route>
                </Route>

                {/* 4040 error */}
                <Route path="*" element={<NotFound />} />

              </Routes >
            </Content>
          </Layout>
        </Layout>
      </Layout>

    </>
  )
}

export default App