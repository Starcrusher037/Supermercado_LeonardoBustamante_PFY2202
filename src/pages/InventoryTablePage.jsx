import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useInventory } from "../hooks/useInventory";
import ProductTable from "../components/inventory/ProductTable";
import InventoryFilters from "../components/inventory/InventoryFilters";
import InventoryMetrics from "../components/inventory/InventoryMetrics";

export default function InventoryTablePage() {
  const { products, feedbackMessage, resetInventory, cartCount } = useInventory();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  /**
   * Funcion que actualiza dinamicamente el estado de la categoria seleccionada.
   * El filtro actualiza el estado local (selectedCategory), lo que desencadena
   * el recalculo de la lista visible a traves de 'filterProductsByCategory' sin
   * mutar ni alterar la coleccion original 'products' almacenada en el contexto.
   *
   * @param {string} category - Categoria seleccionada ("Todas" o categoria especifica)
   */
  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  /**
   * Funcion que filtra los articulos del inventario segun la categoria seleccionada
   * y el termino de busqueda ingresado.
   * Opera de forma inmutable: recibe los articulos base y retorna una nueva lista filtrada,
   * garantizando que los datos originales del inventario permanezcan intactos.
   *
   * @param {Array} items - Coleccion original de articulos en inventario
   * @param {string} category - Categoria actual por la cual filtrar
   * @param {string} term - Cadena de texto para busqueda por nombre, marca o SKU
   * @returns {Array} Lista filtrada resultante
   */
  const filterProductsByCategory = (items, category, term) => {
    const normalizedTerm = term.toLowerCase().trim();
    return items.filter((item) => {
      // Coincidencia con la categoria elegida (o todas si corresponde)
      const matchesCategory =
        category === "Todas" || item.category === category;

      // Coincidencia con el termino de busqueda general
      const matchesSearch =
        normalizedTerm === "" ||
        item.name.toLowerCase().includes(normalizedTerm) ||
        (item.brand && item.brand.toLowerCase().includes(normalizedTerm)) ||
        item.sku.toLowerCase().includes(normalizedTerm) ||
        (item.location && item.location.toLowerCase().includes(normalizedTerm));

      return matchesCategory && matchesSearch;
    });
  };

  // Memorizacion de la lista filtrada: se recalcula de forma reactiva
  // cada vez que el usuario selecciona otra categoria o modifica el inventario.
  const filteredProducts = useMemo(() => {
    return filterProductsByCategory(products, selectedCategory, searchTerm);
  }, [products, selectedCategory, searchTerm]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Encabezado y acciones principales */}
      <div className="flex flex-wrap justify-between items-center mb-5 pb-3 border-b border-slate-200 gap-3">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
            <Link to="/" className="hover:text-blue-600 transition-colors">
              Inicio
            </Link>
            <span>/</span>
            <span className="text-slate-800 font-medium">Tabla de Articulos</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Listado General de Articulos en Inventario
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Consulte, filtre y gestione las existencias de todos los articulos registrados en el sistema.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            to="/carrito"
            className="px-4 py-2 bg-emerald-600 text-white font-medium rounded-md hover:bg-emerald-700 transition-colors shadow-sm text-sm flex items-center gap-1.5"
          >
            <span>Ver Carrito</span>
            {cartCount > 0 && (
              <span className="bg-white text-emerald-800 text-xs font-bold px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          <Link
            to="/nuevo-articulo"
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors shadow-sm text-sm"
          >
            + Ingresar Nuevo Articulo
          </Link>
          <button
            type="button"
            className="px-4 py-2 border border-slate-300 text-slate-700 font-medium rounded-md hover:bg-slate-100 transition-colors text-sm"
            onClick={resetInventory}
            title="Restablecer catalogo original de prueba"
          >
            Restaurar Catalogo
          </button>
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

      {/* Metricas resumidas */}
      <InventoryMetrics />

      {/* Filtros de busqueda y categoria dinamica */}
      <InventoryFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryFilter}
        filteredCount={filteredProducts.length}
        totalCount={products.length}
      />

      {/* Tabla modular de articulos */}
      <ProductTable items={filteredProducts} showActions={true} />
    </div>
  );
}
