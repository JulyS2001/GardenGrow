import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function IniciarSesion() {
  const { iniciarSesion } = useAuthContext();
  const navigate = useNavigate();
  const ubicacion = useLocation();

  const [formulario, setFormulario] = useState({
    nombre: "",
    email: "",
  });

  const manejarEnvio = (e) => {
    e.preventDefault();

    // Verificar credenciales admin
    if (formulario.nombre === "admin" && formulario.email === "1234@admin") {
      localStorage.setItem("authEmail", formulario.email);
      iniciarSesion("admin", formulario.email);
      navigate("/dashboard");
    }
    // Usuario normal
    else if (
      formulario.nombre &&
      formulario.email &&
      formulario.nombre !== "admin"
    ) {
      localStorage.setItem("authEmail", formulario.email);
      iniciarSesion(formulario.nombre, formulario.email);

      if (ubicacion.state?.carrito) {
        navigate("/pagar", { state: { carrito: ubicacion.state.carrito } });
      } else {
        navigate("/productos");
      }
    } else {
      alert(
        "Credenciales de administrador incorrectas. Usa: admin / 1234@admin"
      );
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-5">

          <div className="card shadow-sm border-0">
            <div className="card-body p-4">

              <h2 className="text-center fw-bold mb-3">
                Iniciar sesión
              </h2>

              <p className="text-center text-muted mb-4">
                Accedé para continuar con tu compra 🌱
              </p>

              <form onSubmit={manejarEnvio}>

                {/* Nombre */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre de usuario"
                    value={formulario.nombre}
                    onChange={(e) =>
                      setFormulario({
                        ...formulario,
                        nombre: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="tu@email.com"
                    value={formulario.email}
                    onChange={(e) =>
                      setFormulario({
                        ...formulario,
                        email: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                {/* Botones */}
                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-success"
                  >
                    Iniciar sesión
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/productos")}
                  >
                    Cancelar
                  </button>
                </div>

              </form>

              {/* INFO ADMIN */}
              <div className="alert alert-light mt-4 small">
                <strong>Credenciales de prueba (Admin)</strong>
                <br />
                Usuario: <code>admin</code>
                <br />
                Email: <code>1234@admin</code>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
