// Importacion de elementos de Routing
import { Routes, Route } from "react-router-dom"

// Importamos las rutas
import Login from "./routes/Login"
import Home from "./routes/Home"
import Clients from "./routes/Clients"
import Perfil from "./routes/Perfil"
import Proveedores from "./routes/Proveedores"
import Services from "./routes/Services"
import Expedient from "./routes/Expedient"

// Importamos los componentes
import Navbar from "./components/Navbar"
import RequireAuth from "./components/RequireAuth"


const App = () => {
  return (
    <>
      <h1>Ketzal app</h1>
      <Navbar />
      <Routes>
        {/* Rutas protegidas */}
        <Route path="/" element={<RequireAuth> <Home /> </RequireAuth>}> </Route>
        <Route path="/clients" element={<RequireAuth> <Clients /> </RequireAuth>}> </Route>
        <Route path="/perfil" element={<RequireAuth> <Perfil /> </RequireAuth>}> </Route>
        <Route path="/proveedores" element={<RequireAuth> <Proveedores /> </RequireAuth>}> </Route>
        <Route path="/services" element={<RequireAuth> <Services /> </RequireAuth>}> </Route>
        <Route path="/expedient" element={<RequireAuth> <Expedient /> </RequireAuth>}> </Route>

        {/* Rutas publicas */}
        <Route path="/login" element={<Login />}> </Route>
      </Routes>
    </>
  )
}

export default App