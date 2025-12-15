import { Link, useParams, useLocation } from "react-router-dom";

const ProductoDetalle = () => {

  const { id } = useParams();
  const location = useLocation();
  const producto = location.state?.producto;

  if (!producto) {
    return (
      <div className="container my-5">
        <div className="alert alert-warning text-center">
          <p className="mb-3">No se pudo cargar el producto</p>
          <Link to="/productos" className="btn btn-outline-dark">
            Volver a productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">

        <div className="col-12 col-md-10 col-lg-8">
          <div className="card shadow">

            <div className="card-header bg-dark text-white">
              <h4 className="mb-0">
                Detalle del producto #{id}
              </h4>
            </div>

            <div className="card-body">

              {/* Imagen */}
              <div
                className="bg-light d-flex align-items-center justify-content-center mb-4"
                style={{ height: "300px" }}
              >
                <img
                  src={producto.avatar}
                  alt={producto.nombre}
                  className="img-fluid"
                  style={{
                    maxHeight: "280px",
                    objectFit: "contain"
                  }}
                />
              </div>

              {/* Info */}
              <h3 className="fw-bold">{producto.nombre}</h3>

              <p className="text-muted">
                <strong>Descripción:</strong> {producto.descripcion}
              </p>

              <p className="fs-4 fw-bold">
                Precio: ${Number(producto.precio).toFixed(3)}
              </p>

            </div>

            <div className="card-footer text-end">
              <Link to="/productos" className="btn btn-outline-primary">
                Volver a productos
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductoDetalle;
