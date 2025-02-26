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
import Categorias from './Routes/Categorias'
import Usuarios from './Routes/Usuarios'
import AgregarVehiculo from './Routes/AgregarVehiculo'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vehiculo/:id" element={<Vehiculo />} />
        <Route path="/vehiculo/:id/galeria" element={<Galeria />} />
        <Route path="/administracion" element={<Administracion/>} >
          <Route path="vehiculos" element={<Vehiculos />} />
          <Route path="agregarvehiculo" element={<AgregarVehiculo />} />
          <Route path="categorias" element={<Categorias />} />
          <Route path="usuarios" element={<Usuarios />} />
        </Route>
      </Routes>
      <Footer />
    </>
  )
}

export default App
