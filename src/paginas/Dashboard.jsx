import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { usuario, cerrarSesion } = useAuthContext();
  const navigate = useNavigate();

  const tokenActual = localStorage.getItem('authToken');

  const manejarAgregarProducto = () => {
    navigate('/formulario-producto');
  };

  return (
    <div className="container my-5">

      <h1 className="mb-4 fw-bold">Dashboard Administrativo</h1>

      <div className="card shadow">

        <div className="card-header bg-dark text-white">
          <h5 className="mb-0">Panel de Administración</h5>
        </div>

        <div className="card-body">

          <p className="mb-3">
            <strong>Sesión iniciada como:</strong> {usuario.nombre}
          </p>

          {/* TOKEN */}
          <div className="bg-light p-3 rounded mb-4">
            <strong>Token de autenticación:</strong>
            <div className="mt-2">
              <code className="text-break">{tokenActual}</code>
            </div>
          </div>

          {/* ACCIONES ADMIN */}
          <h5 className="mb-3">Acciones</h5>

          <div className="d-flex gap-2 flex-wrap mb-4">
            <button
              onClick={manejarAgregarProducto}
              className="btn btn-success"
            >
              Agregar Producto
            </button>

            <Link to="/productos" className="btn btn-info text-white">
              Ver / Editar / Eliminar Productos
            </Link>
          </div>

          <hr />

          {/* CERRAR SESIÓN */}
          <button
            onClick={cerrarSesion}
            className="btn btn-outline-danger"
          >
            Cerrar sesión
          </button>

        </div>
      </div>
    </div>
  );
}
