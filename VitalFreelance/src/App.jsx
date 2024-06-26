import { useState } from 'react'
import './App.css'
import Inicio from './paginas/inicio'
import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
  useLocation
} from "react-router-dom";

import Registro from './widgets/registro'
import Login from './widgets/login';
import FRTD from './widgets/freelance_tienda_R';
import AreaCliente from './paginas/areaCliente';
import RegistroImagen from './widgets/OfertaCrear';
import Buscador from './paginas/buscador';
import Local from './widgets/LocalCrear';
import Box_entrenamiento  from './paginas/Box_entrenamiento';

function AppContent() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path='/Registro' element={<Registro />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Registro/freelance' element={<FRTD />} />
        <Route path='/areaCliente' element={<AreaCliente />} />
        <Route path='/RegistroOferta' element={<RegistroImagen />} />
        <Route path='/RegistroLocal' element={<Local />} />
        <Route path='/buscador' element={<Buscador />} />
        <Route exact path="/Box_entrenamiento/:id" element={< Box_entrenamiento />}/>
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App
