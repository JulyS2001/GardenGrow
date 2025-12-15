import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useProducts } from '../context/ProductsContext';

function FormularioProducto() {
  const navigate = useNavigate();
  const location = useLocation();
  const { agregarProducto, editarProducto, validar } = useProducts();

  const productoRecibido = location.state?.producto;
  const modo = productoRecibido ? "editar" : "agregar";

  const [producto, setProducto] = useState({
    id: '',
    nombre: '',
    precio: '',
    descripcion: '',
    categoria: '',
    avatar: ''
  });

  const [errores, setErrores] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (modo === "editar" && productoRecibido) {
      setProducto({
        id: productoRecibido.id || '',
        nombre: productoRecibido.nombre || '',
        precio: productoRecibido.precio || '',
        descripcion: productoRecibido.descripcion || '',
        categoria: productoRecibido.categoria || '',
        avatar: productoRecibido.avatar || ''
      });
    }
  }, [modo, productoRecibido]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    if (name === 'descripcion' && value.length > 200) return;

    setProducto(prev => ({ ...prev, [name]: value }));

    if (errores[name]) {
      setErrores(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validarFormulario = () => {
    const resultado = validar(producto);
    setErrores(resultado.errores);
    return resultado.esValido;
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    setCargando(true);
    try {
      const productoEnviar = {
        ...producto,
        precio: producto.precio.toString().replace(',', '.')
      };

      if (modo === "agregar") {
        const nuevoProducto = await agregarProducto(productoEnviar);
        alert(`Producto "${nuevoProducto.nombre}" agregado correctamente`);
      } else {
        await editarProducto(productoEnviar);
        alert('Producto actualizado correctamente');
      }

      navigate('/productos');
      setErrores({});
    } catch (error) {
      alert(`Hubo un problema al ${modo === "editar" ? 'actualizar' : 'agregar'} el producto`);
    } finally {
      setCargando(false);
    }
  };

  const cancelarEdicion = () => {
    navigate('/productos');
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">

          <div className="card shadow">
            <div className="card-header bg-dark text-white">
              <h4 className="mb-0">
                {modo === "editar" ? 'Editar Producto' : 'Agregar Producto'}
              </h4>
            </div>

            <div className="card-body">
              {modo === "editar" && productoRecibido && (
                <p className="text-muted fst-italic">
                  Editando: {productoRecibido.nombre} (ID: {productoRecibido.id})
                </p>
              )}

              <form onSubmit={manejarEnvio}>

                {/* Nombre */}
                <div className="mb-3">
                  <label className="form-label fw-bold">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={producto.nombre}
                    onChange={manejarCambio}
                    disabled={cargando}
                    className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
                    placeholder="Ingrese el nombre del producto"
                  />
                  {errores.nombre && (
                    <div className="invalid-feedback">
                      {errores.nombre}
                    </div>
                  )}
                </div>

                {/* Precio */}
                <div className="mb-3">
                  <label className="form-label fw-bold">
                    Precio *
                  </label>
                  <input
                    type="text"
                    name="precio"
                    value={producto.precio}
                    onChange={manejarCambio}
                    disabled={cargando}
                    className={`form-control ${errores.precio ? 'is-invalid' : ''}`}
                    placeholder="Ej: 40.000"
                  />
                  <div className="form-text">
                    Formato argentino: punto para miles, sin decimales.
                  </div>
                  {errores.precio && (
                    <div className="invalid-feedback">
                      {errores.precio}
                    </div>
                  )}
                </div>

                {/* Categoría */}
                <div className="mb-3">
                  <label className="form-label fw-bold">
                    Categoría
                  </label>
                  <input
                    type="text"
                    name="categoria"
                    value={producto.categoria}
                    onChange={manejarCambio}
                    disabled={cargando}
                    className="form-control"
                    placeholder="Electrónica, Ropa, Hogar..."
                  />
                </div>

                {/* Imagen */}
                <div className="mb-3">
                  <label className="form-label fw-bold">
                    Imagen (URL)
                  </label>
                  <input
                    type="text"
                    name="avatar"
                    value={producto.avatar}
                    onChange={manejarCambio}
                    disabled={cargando}
                    className="form-control"
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                </div>

                {/* Descripción */}
                <div className="mb-4">
                  <label className="form-label fw-bold">
                    Descripción *
                  </label>
                  <textarea
                    name="descripcion"
                    value={producto.descripcion}
                    onChange={manejarCambio}
                    rows="4"
                    disabled={cargando}
                    className={`form-control ${errores.descripcion ? 'is-invalid' : ''}`}
                    maxLength="200"
                  />
                  <div className="form-text">
                    {producto.descripcion.length}/200 caracteres
                  </div>
                  {errores.descripcion && (
                    <div className="invalid-feedback">
                      {errores.descripcion}
                    </div>
                  )}
                </div>

                {/* Botones */}
                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    disabled={cargando}
                    className="btn btn-success w-100"
                  >
                    {cargando
                      ? (modo === "editar" ? 'Actualizando...' : 'Agregando...')
                      : (modo === "editar" ? 'Confirmar Cambios' : 'Agregar Producto')
                    }
                  </button>

                  {modo === "editar" && (
                    <button
                      type="button"
                      className="btn btn-secondary w-100"
                      onClick={cancelarEdicion}
                    >
                      Cancelar
                    </button>
                  )}
                </div>

              </form>
            </div>

            <div className="card-footer text-muted small">
              (*) Campos obligatorios
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default FormularioProducto;
