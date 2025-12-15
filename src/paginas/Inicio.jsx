import React from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";

function Inicio() {

  const { productos, cargando } = useProducts();

  // Tomamos solo 3 productos destacados
  const productosDestacados = productos?.slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="bg-dark text-light py-5">
        <div className="container text-center">
          <h1 className="display-4 fw-bold mb-3">
            GardenGrow
          </h1>
          <p className="lead mb-4">
            Todo lo que necesitás para hacer crecer tu jardín 
          </p>

          <Link to="/productos" className="btn btn-success btn-lg">
            Ver productos
          </Link>
        </div>
      </section>

      {/* SECCIÓN INFO */}
      <section className="py-5">
        <div className="container">
          <div className="row text-center g-4">

            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title fw-bold">🌿 Productos de calidad</h5>
                  <p className="card-text text-muted">
                    Herramientas, macetas, semillas y todo lo necesario
                    para tu jardín o huerta.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title fw-bold">🚚 Envíos rápidos</h5>
                  <p className="card-text text-muted">
                    Entregamos tus productos de forma segura
                    y rápida a todo el país.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title fw-bold">💳 Compra segura</h5>
                  <p className="card-text text-muted">
                    Pagá de manera simple y segura con
                    distintos medios de pago.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section className="bg-light py-5">
        <div className="container">

          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3">
              Empezá hoy a cuidar tu jardín
            </h2>
            <p className="text-muted">
              Algunos de nuestros productos más elegidos 
            </p>
          </div>

          {cargando ? (
            <p className="text-center">Cargando productos...</p>
          ) : (
            <div className="row g-4">

              {productosDestacados.map(producto => (
                <div className="col-12 col-md-4" key={producto.id}>
                  <div className="card h-100 shadow-sm">

                    <img
                      src={producto.avatar}
                      className="card-img-top"
                      alt={producto.nombre}
                      style={{
                        height: "200px",
                        objectFit: "contain"
                      }}
                    />

                    <div className="card-body text-center">
                      <h5 className="card-title">{producto.nombre}</h5>
                      <p className="card-text text-muted small">
                        {producto.descripcion}
                      </p>
                      <p className="fw-bold text-success">
                        ${producto.precio}
                      </p>
                    </div>

                    <div className="card-footer bg-white border-0 text-center">
                      <Link
                        to={`/productos/${producto.id}`}
                        state={{ producto }}
                        className="btn btn-outline-success btn-sm"
                      >
                        Ver detalle
                      </Link>
                    </div>

                  </div>
                </div>
              ))}

            </div>
          )}

          {/* BOTÓN CATÁLOGO */}
          <div className="text-center mt-5">
            <Link to="/productos" className="btn btn-outline-success btn-lg">
              Explorar catálogo completo
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}

export default Inicio;
