import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const API_USUARIOS =
  "https://68f69bb06b852b1d6f173af8.mockapi.io/api/usuarios";

export default function IniciarSesion() {
  const { iniciarSesion } = useAuthContext();
  const navigate = useNavigate();
  const ubicacion = useLocation();

  const [formulario, setFormulario] = useState({
    nombre: "",
    email: "",
  });

  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);

    try {
      // ===============================
      // 1️⃣ ADMIN (hardcodeado)
      // ===============================
      if (
        formulario.nombre === "admin" &&
        formulario.email === "1234@admin"
      ) {
        iniciarSesion("admin", formulario.email);
        navigate("/dashboard");
        return;
      }

      // ===============================
      // 2️⃣ USUARIO NORMAL → API
      // ===============================
      const response = await fetch(
        `${API_USUARIOS}?email=${formulario.email}`
      );

      if (!response.ok) {
        throw new Error("Error al consultar usuarios");
      }

      const usuarios = await response.json();

      // ❌ Usuario no existe
      if (usuarios.length === 0) {
        setError("Usuario no registrado. Creá una cuenta primero.");
        return;
      }

      const usuario = usuarios[0];

      // ❌ Nombre incorrecto
      if (usuario.nombre !== formulario.nombre) {
        setError("Datos incorrectos");
        return;
      }

      // ✅ Login correcto
      iniciarSesion(usuario.nombre, usuario.email);

      if (ubicacion.state?.carrito) {
        navigate("/pagar", {
          state: { carrito: ubicacion.state.carrito },
        });
      } else {
        navigate("/productos");
      }

    } catch (err) {
      console.error(err);
      setError("Error al iniciar sesión");
    } finally {
      setCargando(false);
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

              {error && (
                <div className="alert alert-danger small">
                  {error}
                </div>
              )}

              <form onSubmit={manejarEnvio}>

                {/* Nombre */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="form-control"
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
                    disabled={cargando}
                  >
                    {cargando ? "Ingresando..." : "Iniciar sesión"}
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

              {/* Registro */}
              <div className="text-center mt-4 small">
                ¿No tenés cuenta?{" "}
                <span
                  className="text-success fw-semibold"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/registrar-usuario")}
                >
                  Registrate
                </span>
              </div>

              {/* Info Admin */}
              <div className="alert alert-light mt-4 small">
                <strong>Admin (prueba)</strong><br />
                Usuario: <code>admin</code><br />
                Email: <code>1234@admin</code>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
