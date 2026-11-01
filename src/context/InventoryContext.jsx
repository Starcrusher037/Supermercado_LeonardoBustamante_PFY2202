import { useState, useEffect, useMemo, useCallback } from "react";
import { initialProducts, generateId } from "../data/initialProducts";
import { InventoryContext } from "./inventoryContextDef";

const STORAGE_KEY = "smr_inventory_products_v2";

export function InventoryProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Asegura compatibilidad con versiones previas agregando marca si no existe
          return parsed.map((item) => ({
            ...item,
            brand: item.brand || "Sin marca especificada"
          }));
        }
      }
    } catch {
      // Si ocurre un error de lectura, se recurre a la lista inicial
    }
    return initialProducts;
  });

  const [feedbackMessage, setFeedbackMessage] = useState(null);

  // Sincronizacion con localStorage ante cualquier mutacion del inventario
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch {
      // Manejo de error de cuota de almacenamiento local si aplica
    }
  }, [products]);

  const showNotification = useCallback((message, type = "info") => {
    setFeedbackMessage({ message, type });
    const timer = setTimeout(() => {
      setFeedbackMessage(null);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const addProduct = useCallback(
    (productData) => {
      const normalizedSku = productData.sku.trim().toUpperCase();
      const skuExists = products.some(
        (p) => p.sku.trim().toUpperCase() === normalizedSku
      );

      if (skuExists) {
        showNotification(
          `Ya existe un producto registrado con el SKU "${normalizedSku}".`,
          "error"
        );
        return { success: false, error: "SKU duplicado" };
      }

      const newProduct = {
        id: generateId(),
        sku: normalizedSku,
        name: productData.name.trim(),
        brand: productData.brand?.trim() || "Generico",
        category: productData.category || "Alimentos Secos",
        stock: Number(productData.stock) || 0,
        minStock: Number(productData.minStock) >= 0 ? Number(productData.minStock) : 5,
        price: Number(productData.price) || 0,
        location: productData.location?.trim() || "Bodega Central"
      };

      setProducts((prev) => [newProduct, ...prev]);
      showNotification(
        `Producto "${newProduct.name}" registrado correctamente en el inventario.`,
        "success"
      );
      return { success: true, product: newProduct };
    },
    [products, showNotification]
  );

  const adjustStock = useCallback(
    (id, delta) => {
      setProducts((prev) =>
        prev.map((item) => {
          if (item.id === id) {
            const nextStock = Math.max(0, item.stock + delta);
            return { ...item, stock: nextStock };
          }
          return item;
        })
      );
    },
    []
  );

  const deleteProduct = useCallback(
    (id, name) => {
      const confirmed = window.confirm(
        `Confirma que desea eliminar el articulo "${name}" del inventario?`
      );
      if (confirmed) {
        setProducts((prev) => prev.filter((item) => item.id !== id));
        showNotification(
          `Articulo "${name}" eliminado del inventario.`,
          "warning"
        );
      }
    },
    [showNotification]
  );

  const resetInventory = useCallback(() => {
    const confirmed = window.confirm(
      "Desea restablecer el inventario al catalogo original de prueba?"
    );
    if (confirmed) {
      setProducts(initialProducts);
      showNotification(
        "Inventario restablecido con el catalogo original.",
        "info"
      );
    }
  }, [showNotification]);

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

  const value = useMemo(
    () => ({
      products,
      metrics,
      feedbackMessage,
      showNotification,
      addProduct,
      adjustStock,
      deleteProduct,
      resetInventory
    }),
    [
      products,
      metrics,
      feedbackMessage,
      showNotification,
      addProduct,
      adjustStock,
      deleteProduct,
      resetInventory
    ]
  );

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
}

export default InventoryProvider;
