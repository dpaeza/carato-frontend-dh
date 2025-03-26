import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Routes/Home'
import Footer from './Components/Footer'
import Vehiculo from './Routes/Vehiculo'
import Galeria from './Routes/Galeria'
import Administracion from './Routes/Administracion'
import Vehiculos from './Routes/Vehiculos'
import AgregarCategoria from './Routes/AgregarCategoria'
import Usuarios from './Routes/Usuarios'
import AgregarVehiculo from './Routes/AgregarVehiculo'
import PrivateRoute from './PrivateRoute/PrivateRoute'
import Cuenta from './Routes/Cuenta'
import Favoritos from './Routes/Favoritos'
import FloatButtonWpp from './Components/FloatButtonWpp'

function App() {

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vehiculo/:id" element={<Vehiculo />} />
          <Route path="/vehiculo/:id/galeria" element={<Galeria />} />
          {/* Ruta protegida para administración */}
          <Route
            path="/administracion"
            element={
              <PrivateRoute requiredRole="ADMIN">
                <Administracion />
              </PrivateRoute>
            }
          >
            <Route path="vehiculos" element={<Vehiculos />} />
            <Route path="agregarvehiculo" element={<AgregarVehiculo />} />
            <Route path="agregarcategoria" element={<AgregarCategoria />} />
            <Route path="usuarios" element={<Usuarios />} />
          </Route>
          {/* Ruta protegida para Cuenta */}
          <Route
            path="/cuenta"
            element={<PrivateRoute />} // No se requiere un rol específico
          >
            <Route index element={<Cuenta />} />
          </Route>
          {/* Ruta protegida para Favoritos */}
          <Route
            path="/favoritos"
            element={<PrivateRoute />} // No se requiere un rol específico
          >
            <Route index element={<Favoritos />} />
          </Route>
        </Routes>
      </main>
      <FloatButtonWpp />
      <Footer />
    </>
  )
}

export default App
