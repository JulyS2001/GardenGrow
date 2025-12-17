import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useCartContext } from "../context/CartContext";
import { BsCart } from "react-icons/bs";

function Navbar() {
  const { usuario, isAuthenticated, cerrarSesion } = useAuthContext();
  const { carrito, vaciarCarrito } = useCartContext();
  const navigate = useNavigate();

  const totalItemsCarrito = carrito.reduce(
    (total, item) => total + (item.cantidad || 1),
    0
  );

  const manejarCerrarSesion = () => {
    navigate("/productos");
    setTimeout(() => {
      vaciarCarrito();
      cerrarSesion();
    }, 200);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          GardenGrow 🌱
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Inicio
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/servicios">
                Servicios
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/productos">
                Productos
              </Link>
            </li>

            {isAuthenticated && usuario?.nombre === "admin" && (
              <li className="nav-item">
                <Link
                  className="nav-link text-warning fw-semibold"
                  to="/dashboard"
                >
                  Dashboard
                </Link>
              </li>
            )}
          </ul>

          {/* Zona derecha */}
          <div className="d-flex align-items-center gap-3">
            {/* CARRITO */}
            <button
              className="btn btn-dark position-relative"
              onClick={() => navigate("/pagar")}
            >
              <BsCart size={22} />

              {totalItemsCarrito > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalItemsCarrito}
                </span>
              )}
            </button>

            {/* USUARIO */}
            {isAuthenticated ? (
              <>
                <span className="text-light small">
                  Hola, <strong>{usuario.nombre}</strong>
                </span>

                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={manejarCerrarSesion}
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link
                  className="btn btn-outline-light btn-sm"
                  to="/iniciar-sesion"
                >
                  Iniciar sesión
                </Link>

                <Link
                  className="btn btn-success btn-sm"
                  to="/registrar-usuario"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
