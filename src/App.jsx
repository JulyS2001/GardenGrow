 import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Inicio from './paginas/Inicio';
import Servicios from './paginas/Servicios';
import Navbar from './paginas/Navbar';
import Productos from './paginas/Productos';
import ProductoDetalle from './paginas/DetalleProductos';
import Footer from './paginas/Footer'
import Pagar from "./paginas/Pagar";
import RutaProtegida from "./paginas/RutaProtegida";
import IniciarSesion from "./paginas/IniciarSesion";
import { AppProvider } from './context/AppContext';


function App() {  


    return (  
        <AppProvider>
        <div>  
          <Navbar/>
           <Routes>
              <Route path="/" element={<Inicio/>}/>
              <Route path="/servicios" element={<Servicios/>}/>
              <Route path="/productos" element={<Productos/>}/>
              <Route path="/productos/:id" element={<ProductoDetalle/>}/>
              <Route path="/productos/:categoria/:id" element={<ProductoDetalle />}/>
               <Route path="/iniciar-sesion" element={<IniciarSesion/>}/>
        <Route path="/pagar" element={ <RutaProtegida>
              <Pagar/>
            </RutaProtegida>
          }
        />
           </Routes>
           <Footer/>
        </div>  
        </AppProvider>
    );  
}  
export default App;  