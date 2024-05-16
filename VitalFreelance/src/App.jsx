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

function AppContent() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path='/Registro' element={<Registro/>  }/>
        <Route path='/Login' element={<Login/>  }/>
        <Route path='/Registro/freelance' element={<FRTD/>  }/>
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
