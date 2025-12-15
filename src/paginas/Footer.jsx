import React from "react";

function Footer() {
  return (
    <footer className="bg-dark text-light mt-5">
      <div className="container py-4">

        <div className="row align-items-center text-center text-md-start">

          {/* BRAND */}
          <div className="col-md-4 mb-3 mb-md-0">
            <h5 className="fw-bold text-success mb-1">
              GardenGrow 🌱
            </h5>
            <p className="small text-light opacity-75 mb-0">
              Hacemos crecer tu jardín, todos los días.
            </p>
          </div>

          {/* CONTACTO */}
          <div className="col-md-4 mb-3 mb-md-0">
            <p className="small mb-1">
              📧 contacto@gardengrow.com
            </p>
            <p className="small mb-0">
              📞 +54 11 1234 5678
            </p>
          </div>

          {/* DERECHOS */}
          <div className="col-md-4 text-md-end">
            <p className="small text-light opacity-75 mb-0">
              © {new Date().getFullYear()} GardenGrow
            </p>
            <p className="small text-light opacity-75 mb-0">
              Todos los derechos reservados
            </p>
          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;
