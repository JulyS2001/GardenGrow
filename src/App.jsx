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
import Dashboard from './paginas/Dashboard'
import FormularioProducto from './componentes/FormularioProducto';
import EliminarProducto from './componentes/EliminarProducto';
import { AuthProvider } from './context/AuthContext';
import { ProductsProvider } from './context/ProductsContext';
import { CartProvider } from './context/CartContext';


function App() {  


    return (  
      <div>  
        <AuthProvider>
        <CartProvider>
          <ProductsProvider>
          
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
            <Route path='/formulario-producto' element={<RutaProtegida soloAdmin={true}><FormularioProducto/></RutaProtegida>}/>
            <Route path="/eliminar-producto" element={<RutaProtegida soloAdmin={true}><EliminarProducto /></RutaProtegida>}/>
           </Routes>
           <Footer/>  
           </ProductsProvider>
        </CartProvider>
        </AuthProvider>
        </div>
    );  
}  
export default App;  