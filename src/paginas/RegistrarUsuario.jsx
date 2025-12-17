import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import bcrypt from "bcryptjs";

export default function RegistrarUsuario() {
  const { registrarUsuario, iniciarSesion } = useAuthContext();
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    nombre: "",
    email: "",
    password: "",
  });

  const manejarEnvio = async (e) => {
  e.preventDefault();

  try {
    //  Cifrar contraseña
    const passwordCifrada = await bcrypt.hash(formulario.password, 10);

    const usuarioParaGuardar = {
      nombre: formulario.nombre,
      email: formulario.email,
      password: passwordCifrada
    };

    const usuarioCreado = await registrarUsuario(usuarioParaGuardar);

    iniciarSesion(usuarioCreado.nombre, usuarioCreado.email);
    navigate("/productos");

  } catch (error) {
    alert("Error al registrar usuario");
  }
};

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h2 className="text-center fw-bold mb-3">Crear cuenta</h2>

              <p className="text-center text-muted mb-4">
                Registrate para comenzar 🌱
              </p>

              <form onSubmit={manejarEnvio}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={formulario.nombre}
                    onChange={(e) =>
                      setFormulario({ ...formulario, nombre: e.target.value })
                    }
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    required
                    value={formulario.email}
                    onChange={(e) =>
                      setFormulario({ ...formulario, email: e.target.value })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label fw-semibold">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    required
                    value={formulario.password}
                    onChange={(e) =>
                      setFormulario({ ...formulario, password: e.target.value })
                    }
                  />
                </div>

                <div className="d-grid gap-2">
                  <button className="btn btn-success">Registrarme</button>

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/iniciar-sesion")}
                  >
                    Ya tengo cuenta
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
