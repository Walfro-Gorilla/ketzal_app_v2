// Importacion de elementos de Routing
import { Routes, Route, useNavigate } from "react-router-dom"
import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "./context/UserProvider"
import { Layout, Menu } from "antd"

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
import Dashboard from './routes/Dashboard'

// Importamos los componentes
import MapView from "./components/Maps/MapView"
import LayoutRequireAuth from "./components/layouts/LayoutRequireAuth"
import LayoutContainerForm from "./components/layouts/LayoutContainerForm"








// Importamos hoja de estilos CSS
import "./App.css"
import GiftCard from "./routes/GiftCard/GiftCard"
import GiftCardMaker from "./routes/GiftCard/GiftCardMaker"
import Home_v2 from "./routes/Home_v2"
import GitFinder from "./routes/GiftFinder"







const App = () => {



  useEffect(() => {
    // console.log("ITEMS3: ", items3)
  }, [])

  // Obtenemos el USER del contexto
  const { user } = useContext(UserContext)


  // LOADING para esperar la respuesta del backend de firebase
  if (user === false) {
    return <p>Loading...</p>
  }





  return (
    <>

      <Routes>

        {/* Rutas protegidas */}
        <Route path="/" element={<LayoutRequireAuth />}>

          <Route path="/dashboard" element={<Dashboard />}> </Route>
          <Route path="/clientes" element={<Clients />}> </Route>
          <Route path="/perfil" element={<Perfil />}> </Route>
          <Route path="/proveedores" element={<Proveedores />}> </Route>
          <Route path="/services" element={<Services />}> </Route>
          <Route path="/expedient" element={<Expedient />}> </Route>
          <Route path="/map" element={<MapView />}> </Route>

        </Route>

        {/* Rutas publicas */}
        <Route path="/" element={<LayoutContainerForm />} >
          <Route index element={<Home />} />

          <Route path="/home2" element={<Home_v2 />}> </Route>
          <Route path="/giftCard" element={<GitFinder />}> </Route>
          <Route path="/giftCardMaker" element={<GiftCardMaker />}> </Route>
          <Route path="/login" element={<Login />}> </Route>
          <Route path="/signup" element={<RegisterUser />}> </Route>
        </Route>

        {/* 4040 error */}
        <Route path="*" element={<NotFound />} />

      </Routes >
      


    </>
  )
}

export default App