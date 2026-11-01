import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useInventory } from "../hooks/useInventory";
import InventoryMetrics from "../components/inventory/InventoryMetrics";
import InventoryFilters from "../components/inventory/InventoryFilters";
import ProductForm from "../components/inventory/ProductForm";
import ProductTable from "../components/inventory/ProductTable";

export default function HomeInventory() {
  const { products, feedbackMessage, resetInventory } = useInventory();
  const [showAddForm, setShowAddForm] = useState(false);
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
    <div className="inventory-page max-w-7xl mx-auto px-4 py-4">
      {/* Encabezado del panel de inventario */}
      <div className="page-header flex flex-wrap justify-between items-center mb-4 pb-3 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold mb-1 text-slate-900">
            Panel de Control de Inventario
          </h1>
          <p className="text-slate-500 mb-0 text-sm">
            Supervision integral de existencias, catalogacion y estado del supermercado
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mt-3 md:mt-0">
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors shadow-sm text-sm"
            onClick={() => setShowAddForm((prev) => !prev)}
          >
            {showAddForm ? "Cerrar Formulario" : "+ Nuevo Articulo Rapido"}
          </button>
          <Link
            to="/nuevo-articulo"
            className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors shadow-sm text-sm"
          >
            Pagina de Ingreso
          </Link>
          <Link
            to="/articulos"
            className="px-4 py-2 border border-slate-300 text-slate-700 font-medium rounded-md hover:bg-slate-100 transition-colors text-sm"
          >
            Ver Solo Tabla
          </Link>
          <button
            type="button"
            className="px-4 py-2 border border-slate-300 text-slate-600 font-medium rounded-md hover:bg-slate-100 transition-colors text-sm"
            onClick={resetInventory}
            title="Restaurar catalogo inicial de prueba"
          >
            Restaurar Datos
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

      {/* Metricas de inventario (subcomponente) */}
      <InventoryMetrics />

      {/* Formulario para agregar producto desplegable (subcomponente) */}
      {showAddForm && (
        <ProductForm
          title="Registro Rapido de Articulo"
          onSuccess={() => setShowAddForm(false)}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {/* Barra de busqueda y filtros (subcomponente) */}
      <InventoryFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        filteredCount={filteredProducts.length}
        totalCount={products.length}
      />

      {/* Tabla modular de productos (subcomponente) */}
      <ProductTable items={filteredProducts} showActions={true} />
    </div>
  );
}
