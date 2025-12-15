import React from "react";
import { Link } from "react-router-dom";

function Servicios() {
  return (
    <>
      {/* HERO */}
      <section className="bg-dark text-light py-5">
        <div className="container text-center">
          <h1 className="fw-bold mb-3">Nuestros Servicios</h1>
          <p className="text-light opacity-75">
            Acompañándote en cada paso para que tu jardín crezca fuerte y sano 🌿
          </p>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">

            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0 text-center">
                <div className="card-body">
                  <h5 className="fw-bold mb-3">🛒 Venta online segura</h5>
                  <p className="text-muted">
                    Comprá de forma simple y segura con distintos
                    medios de pago protegidos.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0 text-center">
                <div className="card-body">
                  <h5 className="fw-bold mb-3">🚚 Envíos a todo el país</h5>
                  <p className="text-muted">
                    Llegamos a cada rincón de Argentina con
                    entregas rápidas y confiables.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0 text-center">
                <div className="card-body">
                  <h5 className="fw-bold mb-3">🌱 Productos de calidad</h5>
                  <p className="text-muted">
                    Seleccionamos productos durables y efectivos
                    para el cuidado de tu jardín.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MARCAS */}
      <section className="bg-light py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-4">Trabajamos con marcas confiables</h2>

          <div className="row justify-content-center g-3">
            <div className="col-6 col-md-2">
              <div className="border rounded py-3 fw-semibold bg-white shadow-sm">
                GreenLeaf
              </div>
            </div>

            <div className="col-6 col-md-2">
              <div className="border rounded py-3 fw-semibold bg-white shadow-sm">
                EcoGrow
              </div>
            </div>

            <div className="col-6 col-md-2">
              <div className="border rounded py-3 fw-semibold bg-white shadow-sm">
                GardenPro
              </div>
            </div>

            <div className="col-6 col-md-2">
              <div className="border rounded py-3 fw-semibold bg-white shadow-sm">
                VerdePlus
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-3">
            Todo lo que tu jardín necesita, en un solo lugar
          </h2>
          <p className="text-muted mb-4">
            Descubrí nuestra línea completa de productos
          </p>

          <Link to="/productos" className="btn btn-success btn-lg me-3">
            Ver productos
          </Link>

          <Link to="/" className="btn btn-outline-secondary btn-lg">
            Volver al inicio
          </Link>
        </div>
      </section>
    </>
  );
}

export default Servicios;
