# Actividad Individual Formativa: Implementando gestión de estado en componentes frontend con React

## Proyecto: Supermercado Requiem - Sistema de Gestión de Inventario y Carrito

Repositorio desarrollado para la gestión de inventario y compras de un supermercado, implementando gestión de estado global con **Context API** y Hooks personalizados, separación de responsabilidades en subcomponentes reutilizables, navegación multipantalla con **React Router**, catálogo interactivo con fichas técnicas, filtro dinámico inmutable, módulo de carrito con sincronización bidireccional de existencias en bodega y estilización responsiva mediante **Tailwind CSS**.

---

## 1. Actualizaciones y Mejoras Recientes

Se implementaron mejoras clave en la aplicación para enriquecer el flujo de usuario y la consistencia de los datos:

- **Filtro dinámico inmutable por categoría (`InventoryTablePage.jsx`)**: Incorporación de filtrado dinámico reactivo por categoría y término de búsqueda que mantiene inmutables los datos originales del catálogo global en el contexto.
- **Ficha técnica detallada (`ProductDetailPage.jsx`)**: Vista de detalle para cada artículo (`/articulos/:id`) con especificaciones completas (SKU, marca, categoría, ubicación en bodega, stock restante, precio) y selector de cantidades para agregar directamente al carrito.
- **Adición de artículos con control automático de stock (`ProductDetailPage.jsx` y `ProductTable.jsx`)**: Posibilidad de añadir artículos al carrito descontando automáticamente las unidades disponibles en bodega, bloqueando o deshabilitando los botones de acción cuando no hay existencias.
- **Módulo de Carrito de Compras (`CartPage.jsx`) con sincronización bidireccional**: Pantalla dedicada (`/carrito`) que permite:
  - Incrementar o disminuir cantidades por producto sincronizando el stock de bodega en tiempo real.
  - Eliminar artículos individuales o vaciar el carrito completo restituyendo automáticamente las unidades al inventario.
  - Finalizar la compra consolidando de forma definitiva la deducción de unidades en el stock.
- **Centralización y Persistencia en Context API (`InventoryContext.jsx`)**: Toda la lógica de negocio, tanto de productos como del carrito, se centralizó en el contexto global respaldado en `localStorage` (`smr_inventory_products_v2` y `smr_inventory_cart_v1`) y optimizado con valores derivados (`cartCount`, `cartTotal`, `metrics`).
- **Navegación extendida con insignias y contadores (`App.jsx`, `Navbar.jsx`, `BottomNav.jsx`)**: Integración de las nuevas rutas `/articulos/:id` y `/carrito`, incorporando insignias visuales (badges) y contadores dinámicos de artículos en el carrito en las barras de navegación móvil y de escritorio.

---

## 2. Características y Requerimientos Implementados

### A. Gestión de Estado Global y Custom Hook (`useInventory`)
- **Context API centralizada**: Ubicada en `src/context/InventoryContext.jsx` y `src/context/inventoryContextDef.js`.
- **Custom Hook `useInventory`**: Provee acceso desacoplado al estado global desde cualquier componente o página, exponiendo:
  - **Inventario**: `products`, `metrics` (`totalItems`, `totalStock`, `lowStockCount`, `outOfStockCount`, `totalValuation`), `addProduct`, `adjustStock`, `deleteProduct`, `resetInventory`.
  - **Carrito**: `cart`, `cartCount`, `cartTotal`, `addToCart(product, quantity)`, `updateCartQuantity(id, delta)`, `removeFromCart(id)`, `clearCart()`, `checkoutCart()`.
  - **Notificaciones**: `feedbackMessage` y `showNotification(msg, type)` para alertas contextuales de éxito, advertencia o error.
- **Inmutabilidad y Sincronización Bidireccional**: Al agregar productos al carrito o alterar cantidades, el stock del inventario se descuenta o restituye de inmediato sin mutaciones directas. Si se cancela o vacía la compra, las unidades regresan a bodega; si se procesa el checkout, la salida queda consolidada.
- **Doble Persistencia en LocalStorage**: Mantiene sincronizados tanto el inventario general como el carrito de compras ante recargas de página o navegación entre pestañas.

### B. Páginas y Navegación del Sitio

#### Módulo de Inventario y Ventas:
1. **Dashboard Principal (`/` - `HomeInventory.jsx`)**: Centro de control con métricas de KPI, acceso rápido a creación, filtros y tabla simplificada.
2. **Página de Ingreso de Artículos (`/nuevo-articulo` - `AddProductPage.jsx`)**: Formulario con validación en tiempo real de campos requeridos (nombre, marca, tipo de producto, precio, stock, stock mínimo, ubicación).
3. **Página de Tabla de Artículos (`/articulos` - `InventoryTablePage.jsx`)**: Vista de catálogo completo con filtro dinámico por categoría (inmutable), buscador reactivo, alertas de bajo stock y botones de adición directa al carrito.
4. **Ficha Técnica Detallada (`/articulos/:id` - `ProductDetailPage.jsx`)**: Detalle individual del artículo seleccionado, visualización de indicadores de disponibilidad, desglose de datos logísticos y formulario para añadir unidades al carrito con validación de tope de existencias.
5. **Carrito de Compras (`/carrito` - `CartPage.jsx`)**: Gestión integral de artículos reservados, cálculo automático de subtotal e impuestos/total, controles de incremento/decremento de unidades, opción para vaciar o confirmar la compra.

#### Páginas Institucionales y de Atención:
1. **Quiénes Somos (`/quienes-somos` - `AboutUs.jsx`)**: Misión, visión, valores institucionales y pilares logísticos.
2. **Nuestras Tiendas (`/nuestras-tiendas` - `OurStores.jsx`)**: Red de sucursales con dirección, horarios, teléfono, filtro por ciudad y departamentos disponibles.
3. **Contáctanos (`/contactanos` - `ContactUs.jsx`)**: Canales de atención oficial y formulario de contacto estructurado para clientes y proveedores.
4. **Cómo Comprar (`/como-comprar` - `HowToBuy.jsx`)**: Guía paso a paso de compra, medios de pago habilitados y políticas de devolución.
5. **Preguntas Frecuentes (`/preguntas-frecuentes` - `Faq.jsx`)**: Acordeón interactivo con respuestas a dudas habituales.

### C. Menú de Navegación
- **Navbar superior (`Navbar.jsx`)**: Barra superior con diseño responsivo, enlaces principales, enlace al carrito con indicador numérico dinámico de artículos acumulados y menú hamburguesa en dispositivos móviles.
- **BottomNav inferior (`BottomNav.jsx`)**: Menú fijo inferior con iconos SVG optimizados para dispositivos móviles con acceso a Inicio, Artículos, Carrito (con badge reactivo), Ingreso y Sucursales.
- **Footer institucional (`Footer.jsx`)**: Mapa de navegación completo dividido en columnas temáticas con enlaces informativos y legales.

### D. Descomposición Modular (Single Responsibility & DRY)
- `src/components/inventory/InventoryMetrics.jsx`: Tarjetas de indicadores clave (KPIs y valoración total).
- `src/components/inventory/InventoryFilters.jsx`: Buscador general y selector de filtro por tipo de producto.
- `src/components/inventory/ProductForm.jsx`: Formulario controlado reutilizable con validación de campos y SKU.
- `src/components/inventory/ProductTable.jsx`: Tabla responsiva de inventario con alertas de existencias, acceso a ficha técnica y botón de agregado al carrito.

### E. Framework CSS
- **Tailwind CSS v4**: Integrado mediante `@tailwindcss/vite` para estilos utilitarios modernos, diseño responsivo móvil/escritorio y accesibilidad.

---

## 3. Estructura del Código Fuente

```text
SuperMercadoRequiem/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── inventory/
│   │   │   ├── InventoryFilters.jsx  # Subcomponente de búsqueda y filtrado
│   │   │   ├── InventoryMetrics.jsx  # Subcomponente de tarjetas de resumen
│   │   │   ├── ProductForm.jsx       # Subcomponente modular de formulario
│   │   │   └── ProductTable.jsx      # Subcomponente modular de tabla con adición a carrito
│   │   ├── BottomNav.jsx             # Menú de navegación inferior con badges e iconos SVG
│   │   ├── Footer.jsx                # Pie de página institucional
│   │   └── Navbar.jsx                # Barra superior responsiva con contador del carrito
│   ├── context/
│   │   ├── InventoryContext.jsx      # Provider global: productos, carrito, stock y persistencia
│   │   └── inventoryContextDef.js    # Definición del contexto React
│   ├── data/
│   │   └── initialProducts.js        # Datos semilla con marcas, categorías, SKU y UUID
│   ├── hooks/
│   │   └── useInventory.js           # Custom Hook para consumir inventario y carrito
│   ├── pages/
│   │   ├── AboutUs.jsx               # Quiénes Somos
│   │   ├── AddProductPage.jsx        # Ingreso de nuevos artículos
│   │   ├── CartPage.jsx              # Carrito de compras y sincronización bidireccional
│   │   ├── ContactUs.jsx             # Contáctanos
│   │   ├── Faq.jsx                   # Preguntas Frecuentes
│   │   ├── HomeInventory.jsx         # Dashboard principal
│   │   ├── HowToBuy.jsx              # Cómo Comprar
│   │   ├── InventoryTablePage.jsx    # Catálogo de artículos con filtro dinámico inmutable
│   │   ├── NotFound.jsx              # Manejador de rutas 404
│   │   ├── OurStores.jsx             # Nuestras Tiendas
│   │   └── ProductDetailPage.jsx     # Ficha técnica detallada del artículo
│   ├── App.css                       # Reglas complementarias de estilo
│   ├── App.jsx                       # Configuración de rutas (/articulos/:id, /carrito, etc.)
│   ├── index.css                     # Importación de Tailwind CSS y tema
│   └── main.jsx                      # Punto de entrada de la aplicación
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 4. Instrucciones de Ejecución Local

1. Instalar las dependencias del proyecto:
   ```bash
   npm install
   ```

2. Ejecutar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

3. Compilar el proyecto para producción:
   ```bash
   npm run build
   ```

4. Ejecutar el linter para comprobar calidad de código:
   ```bash
   npm run lint
   ```
