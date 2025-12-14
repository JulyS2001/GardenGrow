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
import IniciarSesion from './paginas/IniciarSesion';
import { CartProvider } from './context/CartContext';
import Dashboard from './paginas/Dashboard'
import FormularioProducto from './componentes/FormularioProducto'
import EditarProductos from './componentes/EditarProductos';
import { AuthProvider } from './context/AuthContext';


function App() {  


    return (  
      <div>  
        <AuthProvider>
        <CartProvider>
          
          <Navbar/>
           <Routes>
              <Route path="/" element={<Inicio/>}/>
              <Route path="/servicios" element={<Servicios/>}/>
              <Route path="/productos" element={<Productos/>}/>
              <Route path="/productos/:id" element={<ProductoDetalle/>}/>
              <Route path="/productos/:categoria/:id" element={<ProductoDetalle />}/>
              <Route path="/iniciar-sesion" element={<IniciarSesion/>}/>
              <Route path="/pagar" element={ <RutaProtegida><Pagar/> </RutaProtegida>}/>
              <Route path="/dashboard" element={<RutaProtegida soloAdmin={true}><Dashboard /></RutaProtegida>}/>

            {/* RUTA PROTEGIDA - Admin */}
            <Route path="/agregar-producto" element={<RutaProtegida soloAdmin={true}><FormularioProducto /></RutaProtegida>}/>
            <Route path="/editar-productos" element={<RutaProtegida soloAdmin={true}><EditarProductos /></RutaProtegida>}/>
           </Routes>
           <Footer/>  
        </CartProvider>
        </AuthProvider>
        </div>
    );  
}  
export default App;  