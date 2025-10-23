import React from 'react';  
import { Routes, Route } from 'react-router-dom';
import Inicio from './paginas/Inicio';
import Servicios from './paginas/Servicios';
import Navbar from './paginas/Navbar';
import Productos from './paginas/Productos';
import ProductoDetalle from './paginas/DetalleProductos';
import Footer from './componentes/Footer'


function App() {  

    return (  
        <>
        <div>  
          <Navbar/>
           <Routes>
              <Route path="/" element={<Inicio/>}/>
              <Route path="/servicios" element={<Servicios/>}/>
              <Route path="/productos" element={<Productos/>}/>
              <Route path="/productos/:id" element={<ProductoDetalle/>}/>
           </Routes>
           <Footer/>
        </div>  
        </>
    );  
}  
export default App;  