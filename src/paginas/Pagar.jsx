import { useNavigate } from "react-router-dom";
import { useAuthContext } from '../context/AuthContext';
import { useCartContext } from '../context/CartContext';

export default function Pagar() {
  const { usuario, cerrarSesion } = useAuthContext();
  const { carrito, total, vaciarCarrito } = useCartContext();
  const navigate = useNavigate();

  const tokenActual = localStorage.getItem('authToken');

  const comprar = () => {
    alert("¡Compra realizada con éxito!");
    vaciarCarrito();
    navigate("/productos");
  };

  return (
    <div className="container my-5">

      {/* Card Usuario */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h4 className="card-title">Hola {usuario.nombre}</h4>
          <p className="card-text">Email: {usuario.email}</p>

          <div className="bg-light p-2 rounded small text-break mb-3">
            <strong>Token:</strong> {tokenActual}
          </div>

          <button className="btn btn-outline-danger" onClick={cerrarSesion}>
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Card Carrito */}
      <div className="card shadow">
        <div className="card-header bg-dark text-white">
          <h4 className="mb-0">Resumen de tu compra</h4>
        </div>

        <div className="card-body">
          {carrito.length > 0 ? (
            <>
              {carrito.map((producto) => {
                const cantidad = Number(producto.cantidad || 1);
                const precioUnitario = Number(producto.precio || 0);
                const subtotal = cantidad * precioUnitario;

                return (
                  <div
                    key={producto.id}
                    className="d-flex align-items-center border-bottom pb-3 mb-3"
                  >
                    <img
                      src={producto.avatar}
                      alt={producto.nombre}
                      className="img-thumbnail me-3"
                      style={{ width: "80px" }}
                    />

                    <div className="flex-grow-1">
                      <h5 className="mb-1">{producto.nombre}</h5>
                      <div>Precio unidad: ${precioUnitario.toFixed(3)}</div>
                      <div>Cantidad: {cantidad}</div>
                      <strong>Subtotal: ${subtotal.toFixed(3)}</strong>
                    </div>
                  </div>
                );
              })}

              <div className="alert alert-secondary text-end fw-bold fs-5">
                Total a pagar: ${Number(total).toFixed(3)}
              </div>
            </>
          ) : (
            <p className="text-center text-muted">
              No hay productos en el carrito
            </p>
          )}
        </div>

        {/* Footer Card */}
        <div className="card-footer d-flex flex-wrap gap-2 justify-content-between">
          <div>
            {carrito.length > 0 && (
              <button className="btn btn-danger me-2" onClick={vaciarCarrito}>
                Vaciar Carrito
              </button>
            )}
          </div>

          <div>
            {carrito.length > 0 && (
              <button className="btn btn-success me-2" onClick={comprar}>
                Confirmar y Pagar
              </button>
            )}

            <button
              className="btn btn-outline-primary"
              onClick={() => navigate("/productos")}
            >
              {carrito.length > 0 ? "Seguir Comprando" : "Volver a Productos"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
