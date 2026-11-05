import { useState, useEffect, useMemo, useCallback } from "react";
import { initialProducts, generateId } from "../data/initialProducts";
import { InventoryContext } from "./inventoryContextDef";

const STORAGE_KEY = "smr_inventory_products_v2";
const CART_STORAGE_KEY = "smr_inventory_cart_v1";

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

  // Estado del carrito de compras sincronizado con localStorage
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart)) {
          return parsedCart;
        }
      }
    } catch {
      // En caso de error se inicializa como arreglo vacio
    }
    return [];
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

  // Sincronizacion del carrito en localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Manejo silencioso de cuota de almacenamiento local
    }
  }, [cart]);

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
        // Si el articulo estaba en el carrito, se limpia para mantener consistencia
        setCart((prev) => prev.filter((item) => item.id !== id));
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
      setCart([]);
      try {
        localStorage.removeItem(CART_STORAGE_KEY);
      } catch {
        // Manejo silencioso
      }
      showNotification(
        "Inventario restablecido con el catalogo original.",
        "info"
      );
    }
  }, [showNotification]);

  /**
   * Agrega un articulo al carrito y descuenta de inmediato su existencia del inventario general.
   * Maneja la sincronizacion atomica entre products y cart:
   * 1. Valida que el stock disponible en inventario sea suficiente para la cantidad solicitada.
   * 2. Si hay stock, resta 'quantity' del stock del producto en el inventario general.
   * 3. Si el producto ya existia en el carrito, incrementa su cantidad; de lo contrario, lo agrega como nuevo item.
   */
  const addToCart = useCallback(
    (productId, quantity = 1) => {
      const targetQty = Number(quantity) || 1;
      if (targetQty <= 0) {
        return { success: false, error: "La cantidad debe ser mayor a 0." };
      }

      // Verificacion previa sobre el estado actual
      const targetProduct = products.find((p) => p.id === productId);
      if (!targetProduct) {
        showNotification("El articulo no existe en el catalogo.", "error");
        return { success: false, error: "Producto no encontrado" };
      }

      if (targetProduct.stock < targetQty) {
        showNotification(
          `Stock insuficiente: solo quedan ${targetProduct.stock} unidad(es) de "${targetProduct.name}".`,
          "warning"
        );
        return { success: false, error: "Stock insuficiente" };
      }

      // 1. Restar la cantidad seleccionada del inventario general
      setProducts((prevProducts) =>
        prevProducts.map((item) =>
          item.id === productId
            ? { ...item, stock: Math.max(0, item.stock - targetQty) }
            : item
        )
      );

      // 2. Agregar o acumular la cantidad en el carrito de compras
      setCart((prevCart) => {
        const existingIndex = prevCart.findIndex((item) => item.id === productId);
        if (existingIndex >= 0) {
          const updated = [...prevCart];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + targetQty
          };
          return updated;
        }

        return [
          ...prevCart,
          {
            id: targetProduct.id,
            sku: targetProduct.sku,
            name: targetProduct.name,
            brand: targetProduct.brand,
            category: targetProduct.category,
            price: targetProduct.price,
            quantity: targetQty
          }
        ];
      });

      showNotification(
        `Se agregaron ${targetQty} unidad(es) de "${targetProduct.name}" al carrito.`,
        "success"
      );
      return { success: true };
    },
    [products, showNotification]
  );

  /**
   * Modifica dinamicamente la cantidad de un articulo dentro del carrito (+1 o -1),
   * actualizando en sentido inverso el inventario general para conservar la consistencia:
   * - Al aumentar (+1 en carrito): se verifica que haya stock en inventario y se descuenta 1 unidad del stock general.
   * - Al disminuir (-1 en carrito): se devuelve 1 unidad al inventario general. Si la cantidad en el carrito llega a 0,
   *   el articulo se remueve automaticamente del carrito.
   */
  const updateCartQuantity = useCallback(
    (productId, delta) => {
      // Caso 1: Aumentar cantidad en el carrito (requiere restar 1 del inventario general)
      if (delta > 0) {
        const productInInventory = products.find((p) => p.id === productId);
        if (!productInInventory || productInInventory.stock < delta) {
          showNotification(
            "No quedan mas existencias disponibles en el inventario para agregar este articulo.",
            "warning"
          );
          return false;
        }

        // Restar de inventario general
        setProducts((prev) =>
          prev.map((item) =>
            item.id === productId
              ? { ...item, stock: item.stock - delta }
              : item
          )
        );

        // Sumar al carrito
        setCart((prev) =>
          prev.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + delta }
              : item
          )
        );
        return true;
      }

      // Caso 2: Disminuir cantidad en el carrito (devuelve la unidad al inventario general)
      if (delta < 0) {
        const unitsToRestore = Math.abs(delta);
        let removed = false;

        setCart((prev) => {
          const target = prev.find((item) => item.id === productId);
          if (!target) return prev;

          if (target.quantity <= unitsToRestore) {
            removed = true;
            return prev.filter((item) => item.id !== productId);
          }

          return prev.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity - unitsToRestore }
              : item
          );
        });

        // Devolver las existencias al inventario general
        setProducts((prev) =>
          prev.map((item) =>
            item.id === productId
              ? { ...item, stock: item.stock + unitsToRestore }
              : item
          )
        );

        if (removed) {
          showNotification("Articulo removido del carrito de compras.", "info");
        }
        return true;
      }

      return false;
    },
    [products, showNotification]
  );

  /**
   * Remueve por completo un articulo del carrito y devuelve todas sus unidades
   * reservadas al inventario general.
   */
  const removeFromCart = useCallback(
    (productId) => {
      const cartItem = cart.find((item) => item.id === productId);
      if (!cartItem) return;

      const restoredQty = cartItem.quantity;

      // Retirar del carrito
      setCart((prev) => prev.filter((item) => item.id !== productId));

      // Restituir todas las unidades al inventario general
      setProducts((prev) =>
        prev.map((item) =>
          item.id === productId
            ? { ...item, stock: item.stock + restoredQty }
            : item
        )
      );

      showNotification(
        `"${cartItem.name}" fue retirado del carrito. Se restablecieron ${restoredQty} unidad(es) al inventario.`,
        "info"
      );
    },
    [cart, showNotification]
  );

  /**
   * Vacia el carrito.
   * Si restoreStock es verdadero, reintegra al inventario general las existencias de todos los articulos.
   * Si es falso (por ejemplo, al confirmar y finalizar la compra), mantiene el descuento en inventario.
   */
  const clearCart = useCallback(
    (restoreStock = true) => {
      if (cart.length === 0) return;

      if (restoreStock) {
        const restoreMap = cart.reduce((acc, item) => {
          acc[item.id] = (acc[item.id] || 0) + item.quantity;
          return acc;
        }, {});

        setProducts((prev) =>
          prev.map((item) =>
            restoreMap[item.id]
              ? { ...item, stock: item.stock + restoreMap[item.id] }
              : item
          )
        );
        showNotification(
          "Carrito vaciado. Se restablecieron todas las existencias al inventario.",
          "info"
        );
      }

      setCart([]);
    },
    [cart, showNotification]
  );

  /**
   * Finaliza la compra de los articulos del carrito:
   * Las existencias ya fueron descontadas del inventario al momento de agregarse al carrito,
   * por lo que simplemente se limpia el carrito confirmando la operacion exitosa.
   */
  const checkoutCart = useCallback(() => {
    if (cart.length === 0) {
      showNotification("El carrito esta vacio.", "warning");
      return;
    }

    setCart([]);
    showNotification(
      "Compra procesada exitosamente. Las existencias del inventario se han actualizado de forma definitiva.",
      "success"
    );
  }, [cart, showNotification]);

  // Metricas computadas del carrito de compras
  const cartCount = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0),
    [cart]
  );

  const cartTotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity * item.price, 0),
    [cart]
  );

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
      cart,
      cartCount,
      cartTotal,
      feedbackMessage,
      showNotification,
      addProduct,
      adjustStock,
      deleteProduct,
      resetInventory,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
      checkoutCart
    }),
    [
      products,
      metrics,
      cart,
      cartCount,
      cartTotal,
      feedbackMessage,
      showNotification,
      addProduct,
      adjustStock,
      deleteProduct,
      resetInventory,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
      checkoutCart
    ]
  );

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
}

export default InventoryProvider;
