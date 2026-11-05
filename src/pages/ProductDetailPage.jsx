import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useInventory } from "../hooks/useInventory";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, cart, addToCart, feedbackMessage, cartCount } = useInventory();

  // Cantidad que el usuario desea agregar al carrito
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  // Busqueda reactiva del articulo en la lista del inventario
  const product = products.find((item) => item.id === id);

  // Revision de si el producto ya cuenta con unidades agregadas previamente en el carrito
  const currentCartItem = cart.find((item) => item.id === id);

  // Determina el estado del inventario para aplicar estilos visuales
  const getStatusBadge = (stock, minStock) => {
    if (stock === 0) {
      return {
        label: "Agotado",
        badgeClass: "bg-red-100 text-red-800 border-red-200"
      };
    }
    if (stock <= minStock) {
      return {
        label: "Stock Critico",
        badgeClass: "bg-amber-100 text-amber-800 border-amber-200"
      };
    }
    return {
      label: "Disponible",
      badgeClass: "bg-green-100 text-green-800 border-green-200"
    };
  };

  /**
   * Manejador para agregar el articulo al carrito de compras.
   * Ejecuta la funcion addToCart del contexto global, la cual:
   * 1. Valida que la cantidad solicitada no supere el stock disponible.
   * 2. Descuenta inmediatamente la cantidad del stock en el inventario general.
   * 3. Registra o incrementa las unidades del articulo dentro del carrito.
   * Finalmente reinicia el selector de cantidad a 1 para futuras operaciones.
   */
  const handleAddToCart = () => {
    if (!product || product.stock <= 0) return;

    const qtyNumber = Math.max(1, Math.min(Number(selectedQuantity), product.stock));
    const result = addToCart(product.id, qtyNumber);

    if (result.success) {
      setSelectedQuantity(1);
    }
  };

  // Manejo de caso en que el identificador no exista en el catalogo
  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white border border-slate-200 rounded-lg p-8 text-center shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            Articulo no encontrado
          </h2>
          <p className="text-slate-600 mb-6 text-sm">
            El articulo solicitado no existe o fue retirado del inventario general.
          </p>
          <Link
            to="/articulos"
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Volver a la Lista de Articulos
          </Link>
        </div>
      </div>
    );
  }

  const status = getStatusBadge(product.stock, product.minStock);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Navegacion breadcrumb */}
      <nav aria-label="Ruta de navegacion" className="mb-4">
        <ol className="flex items-center gap-2 text-sm text-slate-500">
          <li>
            <Link to="/" className="hover:text-blue-600 transition-colors">
              Inicio
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link to="/articulos" className="hover:text-blue-600 transition-colors">
              Tabla de Articulos
            </Link>
          </li>
          <li>/</li>
          <li className="text-slate-800 font-medium">Detalle del Articulo</li>
        </ol>
      </nav>

      {/* Alerta de notificacion global */}
      {feedbackMessage && (
        <div
          className={`p-4 rounded-md mb-4 text-sm font-medium border ${
            feedbackMessage.type === "error"
              ? "bg-red-50 text-red-800 border-red-200"
              : feedbackMessage.type === "success"
              ? "bg-green-50 text-green-800 border-green-200"
              : "bg-blue-50 text-blue-800 border-blue-200"
          }`}
          role="alert"
        >
          {feedbackMessage.message}
        </div>
      )}

      {/* Tarjeta principal con detalle del producto */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-6">
        {/* Cabecera del detalle */}
        <div className="bg-slate-900 text-white p-6 flex flex-wrap justify-between items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-blue-600 text-white text-xs font-semibold px-2.5 py-0.5 rounded">
                SKU: {product.sku}
              </span>
              <span className="bg-slate-700 text-slate-200 text-xs font-semibold px-2.5 py-0.5 rounded">
                {product.category}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
            <p className="text-slate-400 text-sm mt-1">Marca: {product.brand}</p>
          </div>

          <div className="text-right">
            <span className="text-xs uppercase text-slate-400 tracking-wider block">
              Precio Unitario
            </span>
            <span className="text-3xl font-extrabold text-white">
              ${Number(product.price).toLocaleString("es-CL")}
            </span>
          </div>
        </div>

        {/* Informacion de inventario y compra */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Ficha tecnica del articulo */}
          <div className="md:col-span-7 space-y-4">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
              Especificaciones de Inventario
            </h2>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <dt className="text-slate-500 font-medium">Ubicacion en Tienda</dt>
                <dd className="text-slate-900 font-semibold mt-1">
                  {product.location || "Bodega Central"}
                </dd>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <dt className="text-slate-500 font-medium">Estado de Disponibilidad</dt>
                <dd className="mt-1">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border ${status.badgeClass}`}
                  >
                    {status.label}
                  </span>
                </dd>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <dt className="text-slate-500 font-medium">Stock Disponible Actual</dt>
                <dd className="text-2xl font-bold text-slate-900 mt-1">
                  {product.stock} <span className="text-sm font-normal text-slate-500">unidades</span>
                </dd>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <dt className="text-slate-500 font-medium">Umbral Stock Critico</dt>
                <dd className="text-2xl font-bold text-slate-700 mt-1">
                  {product.minStock} <span className="text-sm font-normal text-slate-500">unidades</span>
                </dd>
              </div>
            </dl>

            {currentCartItem && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-900">
                Actualmente tienes <strong>{currentCartItem.quantity}</strong> unidad(es) de este articulo agregadas al carrito.
              </div>
            )}
          </div>

          {/* Panel para agregar al carrito */}
          <div className="md:col-span-5 bg-slate-50 border border-slate-200 rounded-lg p-5 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-slate-900 mb-1">
                Agregar al Carrito de Compras
              </h3>
              <p className="text-slate-500 text-xs mb-4">
                Cada unidad incorporada resta de inmediato su disponibilidad del inventario general.
              </p>

              {product.stock > 0 ? (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="productQuantity" className="block text-xs font-semibold text-slate-700 mb-1">
                      Cantidad a agregar (Maximo disponible: {product.stock}):
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="w-10 h-10 border border-slate-300 bg-white rounded-md font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40"
                        onClick={() => setSelectedQuantity((q) => Math.max(1, q - 1))}
                        disabled={selectedQuantity <= 1}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        id="productQuantity"
                        min="1"
                        max={product.stock}
                        value={selectedQuantity}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10);
                          if (isNaN(val) || val < 1) setSelectedQuantity(1);
                          else if (val > product.stock) setSelectedQuantity(product.stock);
                          else setSelectedQuantity(val);
                        }}
                        className="w-20 text-center font-bold text-slate-800 form-input"
                      />
                      <button
                        type="button"
                        className="w-10 h-10 border border-slate-300 bg-white rounded-md font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40"
                        onClick={() => setSelectedQuantity((q) => Math.min(product.stock, q + 1))}
                        disabled={selectedQuantity >= product.stock}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200">
                    <div className="flex justify-between items-center text-sm mb-1">
                      <span className="text-slate-600">Subtotal calculado:</span>
                      <span className="font-bold text-slate-900">
                        ${(product.price * selectedQuantity).toLocaleString("es-CL")}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-md shadow-sm transition-colors text-sm"
                  >
                    Agregar al Carrito
                  </button>
                </div>
              ) : (
                <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm">
                  <p className="font-semibold mb-1">Articulo agotado</p>
                  <p className="text-xs">
                    No hay unidades disponibles en inventario para agregar este articulo al carrito de compras.
                  </p>
                </div>
              )}
            </div>

            {/* Accesos rapidos */}
            <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col gap-2">
              <Link
                to="/carrito"
                className="w-full py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white text-center text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Ver Carrito de Compras</span>
                {cartCount > 0 && (
                  <span className="bg-emerald-500 text-white px-1.5 py-0.5 rounded-full font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button
                type="button"
                onClick={() => navigate("/articulos")}
                className="w-full py-1.5 px-3 border border-slate-300 text-slate-700 text-center text-xs font-medium rounded-md hover:bg-slate-100 transition-colors"
              >
                Volver al Listado de Articulos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
