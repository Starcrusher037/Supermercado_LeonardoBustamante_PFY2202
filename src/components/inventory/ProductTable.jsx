import { useInventory } from "../../hooks/useInventory";

export default function ProductTable({ items, showActions = true }) {
  const { adjustStock, deleteProduct } = useInventory();

  const getStockStatus = (stock, minStock) => {
    if (stock === 0) {
      return { label: "Agotado", className: "badge-status-danger" };
    }
    if (stock <= minStock) {
      return { label: "Stock Critico", className: "badge-status-warning" };
    }
    return { label: "Disponible", className: "badge-status-success" };
  };

  if (!items || items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-slate-200">
        <p className="text-slate-500 mb-0 font-medium">
          No se encontraron articulos que coincidan con la busqueda o el filtro seleccionado.
        </p>
      </div>
    );
  }

  return (
    <section className="bg-white rounded-lg shadow-sm overflow-hidden mb-5 border border-slate-200">
      <div className="overflow-x-auto">
        <table className="w-full inventory-table">
          <thead>
            <tr>
              <th scope="col">SKU</th>
              <th scope="col">Articulo</th>
              <th scope="col">Marca</th>
              <th scope="col">Tipo de Producto</th>
              <th scope="col">Ubicacion</th>
              <th scope="col" className="text-right">Precio</th>
              <th scope="col" className="text-center">Stock</th>
              <th scope="col" className="text-center">Estado</th>
              {showActions && <th scope="col" className="text-center">Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const status = getStockStatus(item.stock, item.minStock);
              return (
                <tr
                  key={item.id}
                  className="border-t border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <td className="font-semibold text-monospace">{item.sku}</td>
                  <td>
                    <div className="font-bold text-slate-800">{item.name}</div>
                    <small className="text-slate-500">
                      Minimo sugerido: {item.minStock} un.
                    </small>
                  </td>
                  <td>
                    <span className="font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-xs">
                      {item.brand || "Sin marca"}
                    </span>
                  </td>
                  <td>
                    <span className="category-pill">{item.category}</span>
                  </td>
                  <td>
                    <small className="text-slate-500">{item.location}</small>
                  </td>
                  <td className="text-right font-semibold text-slate-800">
                    ${Number(item.price).toLocaleString("es-CL")}
                  </td>
                  <td className="text-center">
                    <span className="text-base font-bold text-slate-900">
                      {item.stock}
                    </span>
                  </td>
                  <td className="text-center">
                    <span className={`status-badge ${status.className}`}>
                      {status.label}
                    </span>
                  </td>
                  {showActions && (
                    <td className="text-center">
                      <div className="inline-flex rounded-md shadow-sm" role="group">
                        <button
                          type="button"
                          className="px-2 py-1 text-sm border border-slate-300 text-slate-600 rounded-l-md hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={() => adjustStock(item.id, -1)}
                          disabled={item.stock <= 0}
                          title="Disminuir 1 unidad"
                          aria-label={`Disminuir stock de ${item.name}`}
                        >
                          -1
                        </button>
                        <button
                          type="button"
                          className="px-2 py-1 text-sm border-t border-b border-slate-300 text-slate-600 hover:bg-slate-100 transition-colors"
                          onClick={() => adjustStock(item.id, 1)}
                          title="Aumentar 1 unidad"
                          aria-label={`Aumentar stock de ${item.name}`}
                        >
                          +1
                        </button>
                        <button
                          type="button"
                          className="px-2 py-1 text-sm border border-red-300 text-red-600 rounded-r-md hover:bg-red-50 transition-colors"
                          onClick={() => deleteProduct(item.id, item.name)}
                          title="Eliminar producto"
                          aria-label={`Eliminar articulo ${item.name}`}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
