import { Link, useNavigate } from "react-router-dom";
import CarritoCompras from "./Carrito";
import { useCartContext } from "../context/CartContext";
import { useAuthContext } from "../context/AuthContext";
import { useProducts } from "../context/ProductsContext";

export default function Productos() {
  const { productos, cargando, error } = useProducts();
  const { agregarAlCarrito } = useCartContext();
  const { esAdmin } = useAuthContext();
  const navigate = useNavigate();

  const manejarEliminar = (producto) => {
    navigate('/eliminar-producto', { state: { producto } });
  };

  const manejarEditar = (producto) => {
    navigate('/formulario-producto', { state: { producto } });
  };

  if (cargando)
    return <p className="text-center my-5">Cargando productos...</p>;

  if (error)
    return <p className="text-center text-danger my-5">{error}</p>;

  return (
    <div className="container my-5">

      <h2 className="mb-4 fw-bold">Nuestros Productos</h2>

      <div className="row g-4">
        {productos.map((producto) => (
          <div key={producto.id} className="col-12 col-md-6 col-lg-4">
            <ProductoItem
              producto={producto}
              esAdmin={esAdmin}
              onEditar={() => manejarEditar(producto)}
              onEliminar={() => manejarEliminar(producto)}
              onAgregarCarrito={() => agregarAlCarrito(producto)}
            />
          </div>
        ))}
      </div>

      <CarritoCompras />
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