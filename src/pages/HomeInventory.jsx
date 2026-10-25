import { useState, useEffect, useMemo } from "react";
import { initialProducts, productCategories } from "../data/initialProducts";

const STORAGE_KEY = "smr_inventory_products_v1";

export default function HomeInventory() {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignorar error de parsing y usar lista por defecto
    }
    return initialProducts;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [showAddForm, setShowAddForm] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "Alimentos Secos",
    stock: "",
    minStock: "",
    price: "",
    location: ""
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch {
      // Manejar posibles errores de cuota de localStorage
    }
  }, [products]);

  const showNotification = (msg) => {
    setFeedbackMessage(msg);
    setTimeout(() => {
      setFeedbackMessage("");
    }, 3500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.sku.trim()) {
      showNotification("Por favor ingrese el nombre y el codigo SKU del producto.");
      return;
    }

    const newStock = parseInt(formData.stock, 10);
    const newMinStock = parseInt(formData.minStock, 10);
    const newPrice = parseFloat(formData.price);

    if (isNaN(newStock) || newStock < 0) {
      showNotification("El stock debe ser un numero mayor o igual a 0.");
      return;
    }

    if (isNaN(newPrice) || newPrice < 0) {
      showNotification("El precio debe ser un numero mayor o igual a 0.");
      return;
    }

    const skuExists = products.some(
      (p) => p.sku.toLowerCase() === formData.sku.trim().toLowerCase()
    );

    if (skuExists) {
      showNotification("Ya existe un producto con el codigo SKU ingresado.");
      return;
    }

    const newProduct = {
      id: Date.now(),
      sku: formData.sku.trim().toUpperCase(),
      name: formData.name.trim(),
      category: formData.category,
      stock: newStock,
      minStock: isNaN(newMinStock) || newMinStock < 0 ? 5 : newMinStock,
      price: newPrice,
      location: formData.location.trim() || "Bodega Central"
    };

    setProducts((prev) => [newProduct, ...prev]);
    setFormData({
      name: "",
      sku: "",
      category: "Alimentos Secos",
      stock: "",
      minStock: "",
      price: "",
      location: ""
    });
    setShowAddForm(false);
    showNotification(`Producto "${newProduct.name}" registrado correctamente.`);
  };

  const handleAdjustStock = (id, delta) => {
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updatedStock = Math.max(0, item.stock + delta);
          return { ...item, stock: updatedStock };
        }
        return item;
      })
    );
  };

  const handleDeleteProduct = (id, name) => {
    const confirmDelete = window.confirm(
      `Confirma que desea eliminar el producto "${name}" del inventario?`
    );
    if (confirmDelete) {
      setProducts((prev) => prev.filter((item) => item.id !== id));
      showNotification(`Producto "${name}" eliminado del inventario.`);
    }
  };

  const handleResetDefaults = () => {
    const confirmReset = window.confirm(
      "Desea restablecer el inventario a los valores originales de prueba?"
    );
    if (confirmReset) {
      setProducts(initialProducts);
      showNotification("Inventario restablecido con el catalogo original.");
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "Todas" || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const metrics = useMemo(() => {
    const totalItems = products.length;
    const totalStock = products.reduce((acc, curr) => acc + curr.stock, 0);
    const lowStockCount = products.filter(
      (item) => item.stock > 0 && item.stock <= item.minStock
    ).length;
    const outOfStockCount = products.filter((item) => item.stock === 0).length;
    const totalValuation = products.reduce(
      (acc, curr) => acc + curr.stock * curr.price,
      0
    );

    return {
      totalItems,
      totalStock,
      lowStockCount,
      outOfStockCount,
      totalValuation
    };
  }, [products]);

  const getStockStatus = (stock, minStock) => {
    if (stock === 0) {
      return { label: "Agotado", className: "badge-status-danger" };
    }
    if (stock <= minStock) {
      return { label: "Stock Critico", className: "badge-status-warning" };
    }
    return { label: "Disponible", className: "badge-status-success" };
  };

  return (
    <div className="inventory-page container py-4">
      <div className="page-header d-flex flex-wrap justify-content-between align-items-center mb-4 pb-3 border-bottom">
        <div>
          <h1 className="h2 mb-1">Gestion de Inventario</h1>
          <p className="text-muted mb-0">
            Control de existencias, catalogacion y abastecimiento del supermercado
          </p>
        </div>
        <div className="d-flex gap-2 mt-3 mt-md-0">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setShowAddForm((prev) => !prev)}
          >
            {showAddForm ? "Cerrar Formulario" : "+ Nuevo Producto"}
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={handleResetDefaults}
            title="Restaurar catalogo inicial de prueba"
          >
            Restaurar Datos
          </button>
        </div>
      </div>

      {feedbackMessage && (
        <div className="alert alert-info alert-dismissible fade show" role="alert">
          <strong>Notificacion:</strong> {feedbackMessage}
        </div>
      )}

      {/* Tarjetas de metricas */}
      <section className="row g-3 mb-4" aria-label="Metricas de inventario">
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="stat-card">
            <span className="stat-label">Total Referencias</span>
            <span className="stat-value">{metrics.totalItems}</span>
            <span className="stat-sub">Productos en sistema</span>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="stat-card">
            <span className="stat-label">Unidades Totales</span>
            <span className="stat-value">{metrics.totalStock}</span>
            <span className="stat-sub">Existencias en piso y bodega</span>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="stat-card">
            <span className="stat-label">Alertas de Stock</span>
            <span className="stat-value text-danger">
              {metrics.lowStockCount + metrics.outOfStockCount}
            </span>
            <span className="stat-sub">
              {metrics.lowStockCount} criticos / {metrics.outOfStockCount} agotados
            </span>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="stat-card">
            <span className="stat-label">Valor del Inventario</span>
            <span className="stat-value">
              ${metrics.totalValuation.toLocaleString("es-CL")}
            </span>
            <span className="stat-sub">Calculado al precio unitario</span>
          </div>
        </div>
      </section>

      {/* Formulario para agregar producto */}
      {showAddForm && (
        <section className="card mb-4 add-product-card shadow-sm">
          <div className="card-header bg-primary text-white">
            <h2 className="h5 mb-0">Registrar Nuevo Producto en Inventario</h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleAddProduct}>
              <div className="row g-3">
                <div className="col-12 col-md-4">
                  <label htmlFor="sku" className="form-label">
                    Codigo SKU *
                  </label>
                  <input
                    type="text"
                    id="sku"
                    name="sku"
                    className="form-control"
                    placeholder="Ej: BEB-101"
                    value={formData.sku}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="col-12 col-md-5">
                  <label htmlFor="name" className="form-label">
                    Nombre del Producto *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder="Ej: Aceite de Oliva 1L"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="col-12 col-md-3">
                  <label htmlFor="category" className="form-label">
                    Categoria *
                  </label>
                  <select
                    id="category"
                    name="category"
                    className="form-select"
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

                <div className="col-6 col-md-3">
                  <label htmlFor="stock" className="form-label">
                    Stock Inicial *
                  </label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    className="form-control"
                    min="0"
                    placeholder="0"
                    value={formData.stock}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="col-6 col-md-3">
                  <label htmlFor="minStock" className="form-label">
                    Stock Minimo Alerta
                  </label>
                  <input
                    type="number"
                    id="minStock"
                    name="minStock"
                    className="form-control"
                    min="0"
                    placeholder="5"
                    value={formData.minStock}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-6 col-md-3">
                  <label htmlFor="price" className="form-label">
                    Precio Unitario ($) *
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    className="form-control"
                    min="0"
                    step="10"
                    placeholder="1990"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="col-6 col-md-3">
                  <label htmlFor="location" className="form-label">
                    Ubicacion en Tienda
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    className="form-control"
                    placeholder="Ej: Pasillo 3 - Estante B"
                    value={formData.location}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="col-12 d-flex justify-content-end gap-2 mt-3">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-success">
                    Guardar Producto
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      )}

      {/* Filtros y busqueda */}
      <section className="card p-3 mb-4 filter-card shadow-sm">
        <div className="row g-3 align-items-center">
          <div className="col-12 col-md-6">
            <label htmlFor="search" className="form-label small text-muted mb-1">
              Buscar por nombre, SKU o pasillo:
            </label>
            <input
              type="text"
              id="search"
              className="form-control"
              placeholder="Escriba para filtrar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="col-12 col-md-4">
            <label htmlFor="filterCategory" className="form-label small text-muted mb-1">
              Filtrar por Categoria:
            </label>
            <select
              id="filterCategory"
              className="form-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {productCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="col-12 col-md-2 text-md-end">
            <span className="badge bg-light text-dark border p-2 w-100 d-block mt-3 mt-md-0">
              Mostrando: {filteredProducts.length} de {products.length}
            </span>
          </div>
        </div>
      </section>

      {/* Tabla de Inventario */}
      <section className="card shadow-sm overflow-hidden mb-5">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0 inventory-table">
            <thead className="table-light">
              <tr>
                <th scope="col">SKU</th>
                <th scope="col">Producto</th>
                <th scope="col">Categoria</th>
                <th scope="col">Ubicacion</th>
                <th scope="col" className="text-end">Precio</th>
                <th scope="col" className="text-center">Stock</th>
                <th scope="col" className="text-center">Estado</th>
                <th scope="col" className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-muted">
                    No se encontraron productos que coincidan con la busqueda o filtro seleccionado.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((item) => {
                  const status = getStockStatus(item.stock, item.minStock);
                  return (
                    <tr key={item.id}>
                      <td className="fw-semibold text-monospace">{item.sku}</td>
                      <td>
                        <div className="fw-bold">{item.name}</div>
                        <small className="text-muted">Minimo sugerido: {item.minStock} un.</small>
                      </td>
                      <td>
                        <span className="category-pill">{item.category}</span>
                      </td>
                      <td>
                        <small className="text-secondary">{item.location}</small>
                      </td>
                      <td className="text-end fw-semibold">
                        ${item.price.toLocaleString("es-CL")}
                      </td>
                      <td className="text-center">
                        <span className="fs-6 fw-bold">{item.stock}</span>
                      </td>
                      <td className="text-center">
                        <span className={`status-badge ${status.className}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="text-center">
                        <div className="btn-group btn-group-sm" role="group">
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => handleAdjustStock(item.id, -1)}
                            disabled={item.stock <= 0}
                            title="Disminuir 1 unidad"
                          >
                            -1
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => handleAdjustStock(item.id, 1)}
                            title="Aumentar 1 unidad"
                          >
                            +1
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={() => handleDeleteProduct(item.id, item.name)}
                            title="Eliminar producto"
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
