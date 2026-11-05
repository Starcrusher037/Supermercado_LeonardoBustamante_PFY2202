import { Link } from "react-router-dom";
import { useInventory } from "../hooks/useInventory";

export default function CartPage() {
  const {
    cart,
    products,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    checkoutCart,
    cartCount,
    cartTotal,
    feedbackMessage
  } = useInventory();

  /**
   * Obtiene la existencia disponible restante en el inventario general para un producto.
   * Esto permite saber en tiempo real si es posible seguir incrementando unidades
   * desde la pantalla del carrito sin exceder la disponibilidad fisica de bodega.
   */
  const getRemainingStock = (productId) => {
    const item = products.find((p) => p.id === productId);
    return item ? item.stock : 0;
  };

  /**
   * Incrementa en 1 unidad la cantidad del articulo en el carrito.
   * La funcion delegada 'updateCartQuantity' valida que exista stock en el inventario general,
   * y si es asi, descuenta 1 unidad del inventario y suma 1 unidad al carrito.
   */
  const handleIncreaseQuantity = (productId) => {
    updateCartQuantity(productId, 1);
  };

  /**
   * Disminuye en 1 unidad la cantidad del articulo en el carrito.
   * La funcion delegada 'updateCartQuantity' devuelve 1 unidad al inventario general.
   * Si la cantidad llega a 0, el articulo se remueve automaticamente del carrito.
   */
  const handleDecreaseQuantity = (productId) => {
    updateCartQuantity(productId, -1);
  };

  /**
   * Confirma y vacia la totalidad del carrito, restaurando todas las existencias
   * reservadas de vuelta al inventario general.
   */
  const handleClearCart = () => {
    const confirmed = window.confirm(
      "Desea vaciar el carrito? Todas las unidades seran devueltas al inventario general."
    );
    if (confirmed) {
      clearCart(true);
    }
  };

  /**
   * Simula y procesa la finalizacion de la compra:
   * Las existencias ya fueron descontadas del inventario al momento de agregarse al carrito,
   * por lo que se consolida la transaccion limpiando el carrito sin reintegrar stock.
   */
  const handleCheckout = () => {
    const confirmed = window.confirm(
      `Confirma la compra de ${cartCount} articulo(s) por un total de $${cartTotal.toLocaleString("es-CL")}?`
    );
    if (confirmed) {
      checkoutCart();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Encabezado de la pantalla */}
      <div className="flex flex-wrap justify-between items-center mb-5 pb-3 border-b border-slate-200 gap-3">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
            <Link to="/" className="hover:text-blue-600 transition-colors">
              Inicio
            </Link>
            <span>/</span>
            <Link to="/articulos" className="hover:text-blue-600 transition-colors">
              Tabla de Articulos
            </Link>
            <span>/</span>
            <span className="text-slate-800 font-medium">Carrito de Compras</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Carrito de Compras
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Gestione las cantidades de sus articulos. Cada aumento o disminucion actualiza en tiempo real el inventario general.
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            to="/articulos"
            className="px-4 py-2 border border-slate-300 text-slate-700 font-medium rounded-md hover:bg-slate-100 transition-colors text-sm"
          >
            Continuar Explorando Articulos
          </Link>
        </div>
      </div>

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

      {cart.length === 0 ? (
        /* Estado de carrito vacio */
        <div className="bg-white border border-slate-200 rounded-xl p-10 text-center shadow-sm max-w-xl mx-auto my-8">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            El carrito de compras esta vacio
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            Aun no has agregado ningun producto. Revisa el catalogo de inventario para seleccionar articulos disponibles.
          </p>
          <Link
            to="/articulos"
            className="inline-block px-5 py-2.5 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors shadow-sm text-sm"
          >
            Ir a la Lista de Articulos
          </Link>
        </div>
      ) : (
        /* Vista de carrito con articulos */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Listado de articulos */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
              <span className="font-bold text-slate-800 text-sm">
                Articulos en Carrito ({cartCount} unidades en total)
              </span>
              <button
                type="button"
                onClick={handleClearCart}
                className="text-xs text-red-600 hover:text-red-800 font-medium hover:underline"
              >
                Vaciar Carrito y Restaurar Stock
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {cart.map((item) => {
                const remainingStock = getRemainingStock(item.id);
                const subtotal = item.price * item.quantity;

                return (
                  <div
                    key={item.id}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                  >
                    {/* Informacion del articulo */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                          {item.sku}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          {item.category}
                        </span>
                      </div>
                      <Link
                        to={`/articulos/${item.id}`}
                        className="font-bold text-slate-900 hover:text-blue-600 hover:underline block truncate"
                        title="Ver detalle del articulo"
                      >
                        {item.name}
                      </Link>
                      <div className="text-xs text-slate-500 mt-1 flex flex-wrap gap-x-4 gap-y-1">
                        <span>Marca: {item.brand}</span>
                        <span>
                          Precio unitario: ${Number(item.price).toLocaleString("es-CL")}
                        </span>
                        <span className={remainingStock > 0 ? "text-emerald-700 font-medium" : "text-amber-700 font-medium"}>
                          Stock remanente en bodega: {remainingStock} un.
                        </span>
                      </div>
                    </div>

                    {/* Controles de incremento / decremento y subtotal */}
                    <div className="flex items-center justify-between sm:justify-end gap-5">
                      {/* Control de cantidad interactivo */}
                      <div className="flex flex-col items-center">
                        <div className="flex items-center border border-slate-300 rounded-md bg-white shadow-sm overflow-hidden">
                          <button
                            type="button"
                            className="w-8 h-8 flex items-center justify-center text-slate-700 hover:bg-slate-100 font-bold transition-colors disabled:opacity-40"
                            onClick={() => handleDecreaseQuantity(item.id)}
                            title="Disminuir cantidad (devuelve 1 unidad al inventario)"
                            aria-label={`Disminuir cantidad de ${item.name}`}
                          >
                            -
                          </button>
                          <span className="w-10 text-center font-bold text-sm text-slate-800">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            className="w-8 h-8 flex items-center justify-center text-slate-700 hover:bg-slate-100 font-bold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                            onClick={() => handleIncreaseQuantity(item.id)}
                            disabled={remainingStock <= 0}
                            title={
                              remainingStock <= 0
                                ? "No quedan mas existencias en inventario"
                                : "Aumentar cantidad (resta 1 unidad del inventario)"
                            }
                            aria-label={`Aumentar cantidad de ${item.name}`}
                          >
                            +
                          </button>
                        </div>
                        {remainingStock <= 0 && (
                          <span className="text-[10px] text-amber-700 font-medium mt-1">
                            Sin stock adicional
                          </span>
                        )}
                      </div>

                      {/* Subtotal del item */}
                      <div className="text-right min-w-[90px]">
                        <span className="block text-xs text-slate-400">Subtotal</span>
                        <span className="font-bold text-slate-900 text-sm">
                          ${subtotal.toLocaleString("es-CL")}
                        </span>
                      </div>

                      {/* Boton para remover articulo completo */}
                      <div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 transition-colors rounded hover:bg-red-50"
                          title="Quitar articulo del carrito y restablecer existencias"
                          aria-label={`Quitar ${item.name} del carrito`}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Resumen de la orden / Carrito */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-4">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
              Resumen del Pedido
            </h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Variedad de articulos:</span>
                <span className="font-semibold text-slate-800">{cart.length}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Unidades totales:</span>
                <span className="font-semibold text-slate-800">{cartCount}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Despacho:</span>
                <span className="text-emerald-700 font-semibold">Gratis</span>
              </div>
              <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
                <span className="text-base font-bold text-slate-900">Total a Pagar:</span>
                <span className="text-2xl font-extrabold text-blue-600">
                  ${cartTotal.toLocaleString("es-CL")}
                </span>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={handleCheckout}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-sm transition-colors text-sm"
              >
                Finalizar Compra
              </button>

              <Link
                to="/articulos"
                className="block text-center w-full py-2 px-4 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors text-sm"
              >
                Seguir Comprando
              </Link>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-500 border border-slate-200">
              <p className="font-semibold text-slate-700 mb-1">
                Informacion de Sincronizacion:
              </p>
              <p>
                Las unidades que tienes en el carrito descuentan en vivo las existencias del inventario general. Si disminuyes unidades o vacias el carrito, se reponen de inmediato.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
