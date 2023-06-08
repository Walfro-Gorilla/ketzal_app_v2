// Importacion de elementos de Routing
import { Routes, Route } from "react-router-dom"
import { useContext, useState } from "react"
import { UserContext } from "./context/UserProvider"
import { Drawer } from "antd"

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
import { MenuOutlined } from "@ant-design/icons"

// Importamos hoja de estilos CSS
import "./App.css"


const App = () => {

  // Obtenemos el USER del contexto
  const { user } = useContext(UserContext)
  // State para abri/cerrar menu lateral
  const [openMenu, setOpenMenu] = useState(false)

  // LOADING para esperar la respuesta del backend de firebase
  if (user === false) {
    return <p>Loading...</p>
  }


  return (
    <>
      <div
        style={{
          background: 'darkslategrey',
          height: 60,
          paddingLeft: 12,
          paddingTop: 12
        }}
        className="menuIcon"
      >
        <MenuOutlined
          style={{
            color: 'white',
            fontSize: 15
          }}
          onClick={() => {
            setOpenMenu(true)
          }}
        />
      </div>

      <span className="headerMenu" >
        <Navbar />
      </span>

      <Drawer
        placement="left"
        open={openMenu}
        onClose={() => {
          setOpenMenu(false)
        }}
        closable={false}
        bodyStyle={{  backgroundColor: "darkslategrey" }}
      >
        <Navbar isInLine />
      </Drawer>

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
        <Route path="*" element={ <NotFound /> } />

      </Routes >
    </>
  )
}

export default App