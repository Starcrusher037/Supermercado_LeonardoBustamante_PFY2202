import { useState } from "react";
import { productCategories } from "../../data/initialProducts";
import { useInventory } from "../../hooks/useInventory";

export default function ProductForm({ onSuccess, onCancel, title = "Registrar Nuevo Articulo" }) {
  const { addProduct, showNotification } = useInventory();

  const [formData, setFormData] = useState({
    sku: "",
    name: "",
    brand: "",
    category: "Alimentos Secos",
    stock: "",
    minStock: "5",
    price: "",
    location: ""
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.sku.trim()) {
      newErrors.sku = "El codigo SKU es obligatorio.";
    }

    if (!formData.name.trim()) {
      newErrors.name = "El nombre del articulo es obligatorio.";
    }

    if (!formData.brand.trim()) {
      newErrors.brand = "La marca del articulo es obligatoria.";
    }

    const stockNum = parseInt(formData.stock, 10);
    if (isNaN(stockNum) || stockNum < 0) {
      newErrors.stock = "El stock debe ser un numero mayor o igual a 0.";
    }

    const priceNum = parseFloat(formData.price);
    if (isNaN(priceNum) || priceNum < 0) {
      newErrors.price = "El precio debe ser un numero mayor o igual a 0.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      showNotification("Por favor revise los campos obligatorios del formulario.", "error");
      return;
    }

    const result = addProduct({
      sku: formData.sku,
      name: formData.name,
      brand: formData.brand,
      category: formData.category,
      stock: parseInt(formData.stock, 10),
      minStock: parseInt(formData.minStock, 10) || 5,
      price: parseFloat(formData.price),
      location: formData.location.trim() || "Bodega Central"
    });

    if (result.success) {
      setFormData({
        sku: "",
        name: "",
        brand: "",
        category: "Alimentos Secos",
        stock: "",
        minStock: "5",
        price: "",
        location: ""
      });

      if (onSuccess) {
        onSuccess(result.product);
      }
    }
  };

  return (
    <section className="add-product-card shadow-sm mb-4">
      <div className="bg-blue-600 text-white px-4 py-3 rounded-t-[10px]">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>

      <div className="bg-white p-4 rounded-b-[10px]">
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-12 gap-3">
            {/* SKU */}
            <div className="col-span-12 md:col-span-4">
              <label htmlFor="sku" className="block text-sm font-medium text-slate-700 mb-1">
                Codigo SKU *
              </label>
              <input
                type="text"
                id="sku"
                name="sku"
                className={`form-input ${errors.sku ? "border-red-500 focus:border-red-500" : ""}`}
                placeholder="Ej: LAC-010"
                value={formData.sku}
                onChange={handleInputChange}
                required
              />
              {errors.sku && <p className="text-red-600 text-xs mt-1">{errors.sku}</p>}
            </div>

            {/* Nombre */}
            <div className="col-span-12 md:col-span-4">
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                Nombre del Articulo *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={`form-input ${errors.name ? "border-red-500 focus:border-red-500" : ""}`}
                placeholder="Ej: Yogur Batido Frutilla 125g"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Marca */}
            <div className="col-span-12 md:col-span-4">
              <label htmlFor="brand" className="block text-sm font-medium text-slate-700 mb-1">
                Marca *
              </label>
              <input
                type="text"
                id="brand"
                name="brand"
                className={`form-input ${errors.brand ? "border-red-500 focus:border-red-500" : ""}`}
                placeholder="Ej: Soprole, Nestle, Colun"
                value={formData.brand}
                onChange={handleInputChange}
                required
              />
              {errors.brand && <p className="text-red-600 text-xs mt-1">{errors.brand}</p>}
            </div>

            {/* Tipo de Producto / Categoria */}
            <div className="col-span-12 md:col-span-4">
              <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-1">
                Tipo de Producto / Categoria *
              </label>
              <select
                id="category"
                name="category"
                className="form-input"
                value={formData.category}
                onChange={handleInputChange}
              >
                {productCategories
                  .filter((c) => c !== "Todas")
                  .map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
              </select>
            </div>

            {/* Stock Inicial */}
            <div className="col-span-6 md:col-span-2">
              <label htmlFor="stock" className="block text-sm font-medium text-slate-700 mb-1">
                Stock Inicial *
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                className={`form-input ${errors.stock ? "border-red-500 focus:border-red-500" : ""}`}
                min="0"
                placeholder="0"
                value={formData.stock}
                onChange={handleInputChange}
                required
              />
              {errors.stock && <p className="text-red-600 text-xs mt-1">{errors.stock}</p>}
            </div>

            {/* Stock Minimo */}
            <div className="col-span-6 md:col-span-2">
              <label htmlFor="minStock" className="block text-sm font-medium text-slate-700 mb-1">
                Stock Minimo Alerta
              </label>
              <input
                type="number"
                id="minStock"
                name="minStock"
                className="form-input"
                min="0"
                placeholder="5"
                value={formData.minStock}
                onChange={handleInputChange}
              />
            </div>

            {/* Precio Unitario */}
            <div className="col-span-6 md:col-span-2">
              <label htmlFor="price" className="block text-sm font-medium text-slate-700 mb-1">
                Precio Unitario ($) *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                className={`form-input ${errors.price ? "border-red-500 focus:border-red-500" : ""}`}
                min="0"
                step="10"
                placeholder="1490"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
              {errors.price && <p className="text-red-600 text-xs mt-1">{errors.price}</p>}
            </div>

            {/* Ubicacion */}
            <div className="col-span-6 md:col-span-2">
              <label htmlFor="location" className="block text-sm font-medium text-slate-700 mb-1">
                Ubicacion en Tienda
              </label>
              <input
                type="text"
                id="location"
                name="location"
                className="form-input"
                placeholder="Ej: Pasillo 2 - Fila B"
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>

            {/* Botones de accion */}
            <div className="col-span-12 flex justify-end gap-2 mt-3 pt-3 border-t border-slate-100">
              {onCancel && (
                <button
                  type="button"
                  className="px-4 py-2 bg-slate-500 text-white font-medium rounded-md hover:bg-slate-600 transition-colors"
                  onClick={onCancel}
                >
                  Cancelar
                </button>
              )}
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors shadow-sm"
              >
                Guardar Articulo en Inventario
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
