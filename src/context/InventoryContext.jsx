import { useReducer, useEffect, useMemo, useCallback } from "react";
import { initialProducts, generateId } from "../data/initialProducts";
import { InventoryContext } from "./inventoryContextDef";

const STORAGE_KEY = "smr_inventory_products_v2";
const CART_STORAGE_KEY = "smr_inventory_cart_v1";

/**
 * Acciones soportadas por el reducer para el manejo centralizado y atomico
 * del inventario y del carrito de compras.
 */
const INVENTORY_ACTIONS = {
  SET_NOTIFICATION: "SET_NOTIFICATION",
  CLEAR_NOTIFICATION: "CLEAR_NOTIFICATION",
  ADD_PRODUCT: "ADD_PRODUCT",
  ADJUST_STOCK: "ADJUST_STOCK",
  DELETE_PRODUCT: "DELETE_PRODUCT",
  RESET_INVENTORY: "RESET_INVENTORY",
  ADD_TO_CART: "ADD_TO_CART",
  UPDATE_CART_QUANTITY: "UPDATE_CART_QUANTITY",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  CLEAR_CART: "CLEAR_CART",
  CHECKOUT_CART: "CHECKOUT_CART"
};

/**
 * Inicializador perezoso (lazy initializer) para useReducer.
 * Carga de forma segura el inventario y el carrito desde localStorage,
 * o recurre a los datos semilla iniciales si el almacenamiento esta vacio.
 *
 * @returns {Object} Estado inicial { products, cart, feedbackMessage }
 */
const initInventoryState = () => {
  let products = initialProducts;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        products = parsed.map((item) => ({
          ...item,
          brand: item.brand || "Sin marca especificada"
        }));
      }
    }
  } catch {
    // Lectura de respaldo en caso de datos corruptos
  }

  let cart = [];
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      if (Array.isArray(parsedCart)) {
        cart = parsedCart;
      }
    }
  } catch {
    // Lectura de respaldo en caso de datos corruptos
  }

  return {
    products,
    cart,
    feedbackMessage: null
  };
};

/**
 * Reducer puro que gestiona las transiciones del estado global.
 * Al unificar 'products' y 'cart' bajo un solo reducer, garantizamos
 * que las operaciones sean atomicas: la deduccion o reposicion en bodega
 * se produce de manera sincronizada con la adicion o retiro del carrito.
 *
 * @param {Object} state - Estado actual { products, cart, feedbackMessage }
 * @param {Object} action - Objeto de accion { type, payload }
 * @returns {Object} Nuevo estado inmutable
 */
function inventoryReducer(state, action) {
  switch (action.type) {
    case INVENTORY_ACTIONS.SET_NOTIFICATION:
      return {
        ...state,
        feedbackMessage: action.payload
      };

    case INVENTORY_ACTIONS.CLEAR_NOTIFICATION:
      return {
        ...state,
        feedbackMessage: null
      };

    case INVENTORY_ACTIONS.ADD_PRODUCT:
      return {
        ...state,
        products: [action.payload, ...state.products],
        feedbackMessage: {
          message: `Producto "${action.payload.name}" registrado correctamente en el inventario.`,
          type: "success"
        }
      };

    case INVENTORY_ACTIONS.ADJUST_STOCK: {
      const { id, delta } = action.payload;
      return {
        ...state,
        products: state.products.map((item) => {
          if (item.id === id) {
            const nextStock = Math.max(0, item.stock + delta);
            return { ...item, stock: nextStock };
          }
          return item;
        })
      };
    }

    case INVENTORY_ACTIONS.DELETE_PRODUCT: {
      const { id, name } = action.payload;
      return {
        ...state,
        products: state.products.filter((item) => item.id !== id),
        cart: state.cart.filter((item) => item.id !== id),
        feedbackMessage: {
          message: `Articulo "${name}" eliminado del inventario.`,
          type: "warning"
        }
      };
    }

    case INVENTORY_ACTIONS.RESET_INVENTORY:
      return {
        ...state,
        products: initialProducts,
        cart: [],
        feedbackMessage: {
          message: "Inventario restablecido con el catalogo original.",
          type: "info"
        }
      };

    case INVENTORY_ACTIONS.ADD_TO_CART: {
      const { productId, quantity } = action.payload;
      const targetProduct = state.products.find((p) => p.id === productId);

      if (!targetProduct || targetProduct.stock < quantity) {
        return {
          ...state,
          feedbackMessage: {
            message: targetProduct
              ? `Stock insuficiente: solo quedan ${targetProduct.stock} unidad(es) de "${targetProduct.name}".`
              : "El articulo no existe en el catalogo.",
            type: "warning"
          }
        };
      }

      // Descuento atomico de existencias en el inventario
      const updatedProducts = state.products.map((item) =>
        item.id === productId
          ? { ...item, stock: Math.max(0, item.stock - quantity) }
          : item
      );

      // Insercion o acumulacion en el carrito de compras
      const existingCartIndex = state.cart.findIndex((item) => item.id === productId);
      let updatedCart;

      if (existingCartIndex >= 0) {
        updatedCart = [...state.cart];
        updatedCart[existingCartIndex] = {
          ...updatedCart[existingCartIndex],
          quantity: updatedCart[existingCartIndex].quantity + quantity
        };
      } else {
        updatedCart = [
          ...state.cart,
          {
            id: targetProduct.id,
            sku: targetProduct.sku,
            name: targetProduct.name,
            brand: targetProduct.brand,
            category: targetProduct.category,
            price: targetProduct.price,
            quantity
          }
        ];
      }

      return {
        ...state,
        products: updatedProducts,
        cart: updatedCart,
        feedbackMessage: {
          message: `Se agregaron ${quantity} unidad(es) de "${targetProduct.name}" al carrito.`,
          type: "success"
        }
      };
    }

    case INVENTORY_ACTIONS.UPDATE_CART_QUANTITY: {
      const { productId, delta } = action.payload;

      // Caso A: Aumentar cantidad en el carrito (+1)
      if (delta > 0) {
        const productInInventory = state.products.find((p) => p.id === productId);
        if (!productInInventory || productInInventory.stock < delta) {
          return {
            ...state,
            feedbackMessage: {
              message: "No quedan mas existencias disponibles en el inventario para agregar este articulo.",
              type: "warning"
            }
          };
        }

        return {
          ...state,
          products: state.products.map((item) =>
            item.id === productId
              ? { ...item, stock: item.stock - delta }
              : item
          ),
          cart: state.cart.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + delta }
              : item
          )
        };
      }

      // Caso B: Disminuir cantidad en el carrito (-1)
      if (delta < 0) {
        const unitsToRestore = Math.abs(delta);
        const targetCartItem = state.cart.find((item) => item.id === productId);

        if (!targetCartItem) return state;

        const willRemove = targetCartItem.quantity <= unitsToRestore;
        const updatedCart = willRemove
          ? state.cart.filter((item) => item.id !== productId)
          : state.cart.map((item) =>
              item.id === productId
                ? { ...item, quantity: item.quantity - unitsToRestore }
                : item
            );

        return {
          ...state,
          products: state.products.map((item) =>
            item.id === productId
              ? { ...item, stock: item.stock + unitsToRestore }
              : item
          ),
          cart: updatedCart,
          feedbackMessage: willRemove
            ? { message: "Articulo removido del carrito de compras.", type: "info" }
            : state.feedbackMessage
        };
      }

      return state;
    }

    case INVENTORY_ACTIONS.REMOVE_FROM_CART: {
      const { productId } = action.payload;
      const cartItem = state.cart.find((item) => item.id === productId);
      if (!cartItem) return state;

      const restoredQty = cartItem.quantity;
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== productId),
        products: state.products.map((item) =>
          item.id === productId
            ? { ...item, stock: item.stock + restoredQty }
            : item
        ),
        feedbackMessage: {
          message: `"${cartItem.name}" fue retirado del carrito. Se restablecieron ${restoredQty} unidad(es) al inventario.`,
          type: "info"
        }
      };
    }

    case INVENTORY_ACTIONS.CLEAR_CART: {
      const { restoreStock } = action.payload;
      if (state.cart.length === 0) return state;

      if (restoreStock) {
        const restoreMap = state.cart.reduce((acc, item) => {
          acc[item.id] = (acc[item.id] || 0) + item.quantity;
          return acc;
        }, {});

        return {
          ...state,
          cart: [],
          products: state.products.map((item) =>
            restoreMap[item.id]
              ? { ...item, stock: item.stock + restoreMap[item.id] }
              : item
          ),
          feedbackMessage: {
            message: "Carrito vaciado. Se restablecieron todas las existencias al inventario.",
            type: "info"
          }
        };
      }

      return {
        ...state,
        cart: []
      };
    }

    case INVENTORY_ACTIONS.CHECKOUT_CART:
      if (state.cart.length === 0) {
        return {
          ...state,
          feedbackMessage: {
            message: "El carrito esta vacio.",
            type: "warning"
          }
        };
      }

      return {
        ...state,
        cart: [],
        feedbackMessage: {
          message: "Compra procesada exitosamente. Las existencias del inventario se han actualizado de forma definitiva.",
          type: "success"
        }
      };

    default:
      return state;
  }
}

export function InventoryProvider({ children }) {
  const [state, dispatch] = useReducer(inventoryReducer, undefined, initInventoryState);

  // Sincronizacion del inventario en localStorage ante cualquier cambio
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.products));
    } catch {
      // Manejo silencioso de cuota de almacenamiento local si aplica
    }
  }, [state.products]);

  // Sincronizacion del carrito en localStorage ante cualquier cambio
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cart));
    } catch {
      // Manejo silencioso de cuota de almacenamiento local si aplica
    }
  }, [state.cart]);

  // Manejador temporizado de notificaciones
  const showNotification = useCallback((message, type = "info") => {
    dispatch({
      type: INVENTORY_ACTIONS.SET_NOTIFICATION,
      payload: { message, type }
    });
    const timer = setTimeout(() => {
      dispatch({ type: INVENTORY_ACTIONS.CLEAR_NOTIFICATION });
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // Agregar nuevo producto validando unicidad de SKU
  const addProduct = useCallback(
    (productData) => {
      const normalizedSku = productData.sku.trim().toUpperCase();
      const skuExists = state.products.some(
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

      dispatch({
        type: INVENTORY_ACTIONS.ADD_PRODUCT,
        payload: newProduct
      });

      return { success: true, product: newProduct };
    },
    [state.products, showNotification]
  );

  const adjustStock = useCallback((id, delta) => {
    dispatch({
      type: INVENTORY_ACTIONS.ADJUST_STOCK,
      payload: { id, delta }
    });
  }, []);

  const deleteProduct = useCallback((id, name) => {
    const confirmed = window.confirm(
      `Confirma que desea eliminar el articulo "${name}" del inventario?`
    );
    if (confirmed) {
      dispatch({
        type: INVENTORY_ACTIONS.DELETE_PRODUCT,
        payload: { id, name }
      });
    }
  }, []);

  const resetInventory = useCallback(() => {
    const confirmed = window.confirm(
      "Desea restablecer el inventario al catalogo original de prueba?"
    );
    if (confirmed) {
      try {
        localStorage.removeItem(CART_STORAGE_KEY);
      } catch {
        // Manejo silencioso
      }
      dispatch({ type: INVENTORY_ACTIONS.RESET_INVENTORY });
    }
  }, []);

  const addToCart = useCallback(
    (productId, quantity = 1) => {
      const targetQty = Number(quantity) || 1;
      if (targetQty <= 0) {
        return { success: false, error: "La cantidad debe ser mayor a 0." };
      }

      const targetProduct = state.products.find((p) => p.id === productId);
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

      dispatch({
        type: INVENTORY_ACTIONS.ADD_TO_CART,
        payload: { productId, quantity: targetQty }
      });

      return { success: true };
    },
    [state.products, showNotification]
  );

  const updateCartQuantity = useCallback(
    (productId, delta) => {
      if (delta > 0) {
        const productInInventory = state.products.find((p) => p.id === productId);
        if (!productInInventory || productInInventory.stock < delta) {
          showNotification(
            "No quedan mas existencias disponibles en el inventario para agregar este articulo.",
            "warning"
          );
          return false;
        }
      }

      dispatch({
        type: INVENTORY_ACTIONS.UPDATE_CART_QUANTITY,
        payload: { productId, delta }
      });
      return true;
    },
    [state.products, showNotification]
  );

  const removeFromCart = useCallback((productId) => {
    dispatch({
      type: INVENTORY_ACTIONS.REMOVE_FROM_CART,
      payload: { productId }
    });
  }, []);

  const clearCart = useCallback((restoreStock = true) => {
    dispatch({
      type: INVENTORY_ACTIONS.CLEAR_CART,
      payload: { restoreStock }
    });
  }, []);

  const checkoutCart = useCallback(() => {
    dispatch({ type: INVENTORY_ACTIONS.CHECKOUT_CART });
  }, []);

  // Metricas computadas del carrito de compras
  const cartCount = useMemo(
    () => state.cart.reduce((acc, item) => acc + item.quantity, 0),
    [state.cart]
  );

  const cartTotal = useMemo(
    () => state.cart.reduce((acc, item) => acc + item.quantity * item.price, 0),
    [state.cart]
  );

  // Metricas computadas del inventario general
  const metrics = useMemo(() => {
    const totalItems = state.products.length;
    const totalStock = state.products.reduce((acc, curr) => acc + curr.stock, 0);
    const lowStockCount = state.products.filter(
      (item) => item.stock > 0 && item.stock <= item.minStock
    ).length;
    const outOfStockCount = state.products.filter((item) => item.stock === 0).length;
    const totalValuation = state.products.reduce(
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
  }, [state.products]);

  const value = useMemo(
    () => ({
      products: state.products,
      metrics,
      cart: state.cart,
      cartCount,
      cartTotal,
      feedbackMessage: state.feedbackMessage,
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
      state.products,
      metrics,
      state.cart,
      cartCount,
      cartTotal,
      state.feedbackMessage,
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
