import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useInventory } from "../hooks/useInventory";
import ProductTable from "../components/inventory/ProductTable";
import InventoryFilters from "../components/inventory/InventoryFilters";
import InventoryMetrics from "../components/inventory/InventoryMetrics";

export default function InventoryTablePage() {
  const { products, feedbackMessage, resetInventory } = useInventory();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        item.name.toLowerCase().includes(term) ||
        (item.brand && item.brand.toLowerCase().includes(term)) ||
        item.sku.toLowerCase().includes(term) ||
        (item.location && item.location.toLowerCase().includes(term));

      const matchesCategory =
        selectedCategory === "Todas" || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

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

        <div className="flex gap-2">
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

      {/* Filtros de busqueda y categoria */}
      <InventoryFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        filteredCount={filteredProducts.length}
        totalCount={products.length}
      />

      {/* Tabla modular de articulos */}
      <ProductTable items={filteredProducts} showActions={true} />
    </div>
  );
}
