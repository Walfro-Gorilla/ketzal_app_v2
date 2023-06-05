import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Importamos BrowserRouter para tener la navegacion.
import { BrowserRouter } from 'react-router-dom'

// Importamos los contextos a utilizar
import UserProvider from './context/UserProvider'
import SupplierProvider from './context/SupplierProvider'
import ClientProvider from './context/ClientsProvider'
import ServiceProvider from './context/ServicesProvider'


if (!navigator.geolocation) {
  alert('Tu navegador no tiene opcion de Geolocalizacion')
  throw new Error('Tu navegador no tiene opcion de Geolocalizacion')
}

ReactDOM.createRoot(document.getElementById('root')).render(
  //contexto del UserProvider
  <UserProvider >
    {/* contexto SupplierProvider */}
    <SupplierProvider>
      {/* contexto ClientProvider */}
      <ClientProvider>
        {/*  context ServicesProvider */}
        <ServiceProvider>
          {/* Envolvemos la <App /> en el Browser Router para crear la navegacion de la web */}
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ServiceProvider>
      </ClientProvider>
    </SupplierProvider>
  </UserProvider>
)
