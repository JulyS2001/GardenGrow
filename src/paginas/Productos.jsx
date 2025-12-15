import { Link, useNavigate } from "react-router-dom";
import CarritoCompras from "./Carrito";
import { useCartContext } from "../context/CartContext";
import { useAuthContext } from "../context/AuthContext";
import { useProducts } from "../context/ProductsContext";
import { useEffect, useState } from "react";

export default function Productos() {
  const { productos, cargando, error } = useProducts();
  const { agregarAlCarrito } = useCartContext();
  const { esAdmin } = useAuthContext();
  const navigate = useNavigate();

    const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);

    useEffect(() => {
    document.title = "GardenGrow";
   
    // Función para actualizar meta tags
    const updateMetaTag = (name, content, attribute = 'name') => {
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);

      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Meta tags básicos
    updateMetaTag('description', 'Explora el catálogo de jardinetia. Encuentra macetas, tierra, herramientas.');
    updateMetaTag('keywords', 'maceta, tierra, herramienta');
    updateMetaTag('author', '@webmaster');
    updateMetaTag('robots', 'index, follow');

    // Open Graph
    updateMetaTag('og:title', 'GardenGrow', 'property');
    updateMetaTag('og:description', 'Explora el catálogo jardineria.', 'property');
    updateMetaTag('og:type', 'website', 'property');
    updateMetaTag('og:image', 'https://tudominio.com/logo.jpg', 'property');
    updateMetaTag('og:url', window.location.href, 'property');
  }, []);

  const productosPorPagina = 6;

  const manejarEliminar = (producto) => {
    navigate('/eliminar-producto', { state: { producto } });
  };

  const manejarEditar = (producto) => {
    navigate('/formulario-producto', { state: { producto } });
  };

   const productosFiltrados = productos.filter(
    (producto) =>
      producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      (producto.categoria &&
        producto.categoria.toLowerCase().includes(busqueda.toLowerCase()))
  );

  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosActuales = productosFiltrados.slice(indicePrimerProducto, indiceUltimoProducto);
 
  // Cambiar de página
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
  const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);


  // Resetear a página 1 con búsquedas
  const manejarBusqueda = (e) => {
    setBusqueda(e.target.value);
    setPaginaActual(1);
  };

  if (cargando)
    return <p className="text-center my-5">Cargando productos...</p>;

  if (error)
    return <p className="text-center text-danger my-5">{error}</p>;

return (
  <div className="container my-5">

    <h2 className="mb-4 fw-bold text-center">
      Nuestros Productos 🌱
    </h2>

    {/* BUSCADOR */}
    <div className="row mb-4">
      <div className="col-12 col-md-6 mx-auto">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por nombre o categoría..."
          value={busqueda}
          onChange={manejarBusqueda}
        />
      </div>
    </div>

    {/* LISTADO DE PRODUCTOS */}
    <div className="row g-4">
      {productosActuales.length > 0 ? (
        productosActuales.map((producto) => (
          <div key={producto.id} className="col-12 col-md-6 col-lg-4">
            <ProductoItem
              producto={producto}
              esAdmin={esAdmin}
              onEditar={() => manejarEditar(producto)}
              onEliminar={() => manejarEliminar(producto)}
              onAgregarCarrito={() => agregarAlCarrito(producto)}
            />
          </div>
        ))
      ) : (
        <p className="text-center text-muted mt-4">
          No se encontraron productos 😕
        </p>
      )}
    </div>

    {/* PAGINACIÓN */}
    {totalPaginas > 1 && (
      <nav className="mt-5">
        <ul className="pagination justify-content-center">

          {Array.from({ length: totalPaginas }, (_, index) => (
            <li
              key={index}
              className={`page-item ${
                paginaActual === index + 1 ? "active" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => cambiarPagina(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}

        </ul>
      </nav>
    )}

  </div>
);
}

const ProductoItem = ({
  producto,
  esAdmin,
  onEditar,
  onEliminar,
  onAgregarCarrito
}) => (
  <div className="card h-100 shadow-sm">

    {/* CONTENEDOR DE IMAGEN */}
    <div
      className="bg-light d-flex align-items-center justify-content-center"
      style={{ height: "220px" }}
    >
      <img
        src={producto.avatar}
        alt={producto.nombre}
        className="img-fluid"
        style={{
          maxHeight: "200px",
          maxWidth: "100%",
          objectFit: "contain"
        }}
      />
    </div>

    <div className="card-body d-flex flex-column">
      <h5 className="card-title">{producto.nombre}</h5>

      <p className="card-text text-muted small">
        {producto.descripcion}
      </p>

      <p className="fw-bold fs-5 mb-3">
        ${Number(producto.precio).toFixed(3)}
      </p>

      <div className="mt-auto d-grid gap-2">
        <Link
          to={`/productos/${producto.id}`}
          state={{ producto }}
          className="btn btn-outline-dark btn-sm"
        >
          Más detalles
        </Link>

        <button
          className="btn btn-success btn-sm"
          onClick={onAgregarCarrito}
        >
          Comprar
        </button>
      </div>

      {/* BOTONES ADMIN */}
      {esAdmin && (
        <>
          <hr />
          <div className="d-flex gap-2">
            <button
              className="btn btn-warning btn-sm w-50"
              onClick={onEditar}
            >
              Editar
            </button>
            <button
              className="btn btn-danger btn-sm w-50"
              onClick={onEliminar}
            >
              Eliminar
            </button>
          </div>
        </>
      )}
    </div>
  </div>
);