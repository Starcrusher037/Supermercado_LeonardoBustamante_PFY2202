import { productCategories } from "../../data/initialProducts";

export default function InventoryFilters({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  filteredCount,
  totalCount
}) {
  return (
    <section className="filter-card p-3 mb-4 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        <div className="md:col-span-6">
          <label htmlFor="search" className="block text-sm text-slate-500 mb-1">
            Buscar por nombre, marca, SKU o pasillo:
          </label>
          <input
            type="text"
            id="search"
            className="form-input"
            placeholder="Escriba para filtrar productos..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="md:col-span-4">
          <label
            htmlFor="filterCategory"
            className="block text-sm text-slate-500 mb-1"
          >
            Tipo de Producto / Categoria:
          </label>
          <select
            id="filterCategory"
            className="form-input"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            {productCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2 md:text-right">
          <span className="inline-block bg-slate-100 text-slate-700 border border-slate-200 text-sm font-medium rounded-md p-2 w-full text-center mt-3 md:mt-0">
            Mostrando: {filteredCount} de {totalCount}
          </span>
        </div>
      </div>
    </section>
  );
}
