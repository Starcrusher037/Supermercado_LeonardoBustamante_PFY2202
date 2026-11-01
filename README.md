# Actividad Individual Formativa 2: Implementando gestion de estado en componentes frontend con React

## Proyecto: Supermercado Requiem - Sistema de Gestion de Inventario

Repositorio desarrollado para la evaluacion formativa de la Semana 2. La aplicacion continua el desarrollo del sitio web de gestion de inventario para un supermercado, implementando gestion de estado global con Context API y Hooks personalizados, separacion de responsabilidades en subcomponentes reutilizables, navegacion multipantalla con React Router, inclusion de las paginas solicitadas del catalogo institucional y estilizacion responsiva mediante Tailwind CSS.

---

## 1. Caracteristicas y Requerimientos Implementados

### A. Gestion de Estado Global y Custom Hook (`useInventory`)
- **Context API centralizada**: Ubicada en `src/context/InventoryContext.jsx` y `src/context/inventoryContextDef.js`.
- **Custom Hook `useInventory`**: Provee acceso desacoplado al estado global desde cualquier componente o pagina, exponiendo:
  - `products`: Coleccion de articulos disponibles.
  - `metrics`: Indicadores de inventario calculados de manera eficiente con `useMemo`.
  - `addProduct(productData)`: Registro de articulos con validacion de unicidad de SKU.
  - `adjustStock(id, delta)`: Incremento o disminucion controlada de existencias.
  - `deleteProduct(id, name)`: Eliminacion de articulos con confirmacion.
  - `resetInventory()`: Restablecimiento al catalogo inicial de prueba.
  - `feedbackMessage` y `showNotification(msg, type)`: Sistema de alertas informativas.
- **Detalle de los articulos**: Cada registro almacena obligatoriamente `name` (nombre), `brand` (marca), `category` (tipo de producto/categoria), `sku`, `stock`, `minStock`, `price` y `location`.
- **Generacion robusta de identificadores**: Implementacion de `crypto.randomUUID()` para evitar colisiones por milisegundos en altas simultaneas.
- **Persistencia en LocalStorage**: Mantiene sincronizados los cambios del inventario ante recargas de pagina.

### B. Paginas y Navegacion del Sitio

#### Modulo de Inventario:
1. **Dashboard Principal (`/` - `HomeInventory.jsx`)**: Centro de control que orquesta metricas, formulario rapido, filtros y tabla.
2. **Pagina de Ingreso de Articulos (`/nuevo-articulo` - `AddProductPage.jsx`)**: Formulario con validacion en tiempo real de campos requeridos (nombre, marca, tipo de producto, precio, stock).
3. **Pagina de Tabla de Articulos (`/articulos` - `InventoryTablePage.jsx`)**: Vista en tabla completa con estados visuales, ajuste de stock y filtros.

#### Paginas Institucionales y de Atencion (Lista de Opciones):
1. **Quienes Somos (`/quienes-somos` - `AboutUs.jsx`)**: Mision, vision, valores institucionales y pilares logisticos.
2. **Nuestras Tiendas (`/nuestras-tiendas` - `OurStores.jsx`)**: Red de sucursales con direccion, horarios, telefono, filtro por ciudad y departamentos disponibles.
3. **Contactanos (`/contactanos` - `ContactUs.jsx`)**: Canales de atencion oficial y formulario de contacto estructurado para clientes y proveedores.
4. **Como Comprar (`/como-comprar` - `HowToBuy.jsx`)**: Guia paso a paso de compra, medios de pago habilitados y politicas de devolucion.
5. **Preguntas Frecuentes (`/preguntas-frecuentes` - `Faq.jsx`)**: Acordeon interactivo con respuestas a dudas habituales.

### C. Menu de Navegacion
- **Navbar superior (`Navbar.jsx`)**: Barra superior con diseno responsivo (menu hamburguesa en dispositivos moviles y barra completa en escritorio).
- **BottomNav inferior (`BottomNav.jsx`)**: Menu fijo inferior con iconos SVG para acceso rapido a Dashboard, Ingreso, Tabla, Tiendas y Contacto.
- **Footer institucional (`Footer.jsx`)**: Mapa de navegacion completo dividido en cuatro columnas tematicas.

### D. Descomposicion Modular (Single Responsibility & DRY)
- `src/components/inventory/InventoryMetrics.jsx`: Indicadores clave (KPIs).
- `src/components/inventory/InventoryFilters.jsx`: Buscador y filtro por tipo de producto.
- `src/components/inventory/ProductForm.jsx`: Formulario controlado reutilizable.
- `src/components/inventory/ProductTable.jsx`: Tabla responsiva de inventario con gestion de existencias.

### E. Framework CSS
- **Tailwind CSS v4**: Integrado mediante `@tailwindcss/vite` para estilos utilitarios modernos, responsivos y accesibles.

---

## 2. Estructura del Codigo Fuente

```text
SuperMercadoRequiem/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── inventory/
│   │   │   ├── InventoryFilters.jsx  # Subcomponente de busqueda y filtrado
│   │   │   ├── InventoryMetrics.jsx  # Subcomponente de tarjetas de resumen
│   │   │   ├── ProductForm.jsx       # Subcomponente modular de formulario
│   │   │   └── ProductTable.jsx      # Subcomponente modular de tabla
│   │   ├── BottomNav.jsx             # Menu de navegacion inferior con SVG
│   │   ├── Footer.jsx                # Pie de pagina institucional
│   │   └── Navbar.jsx                # Barra superior responsiva con menu movil
│   ├── context/
│   │   ├── InventoryContext.jsx      # Provider del estado global y persistencia
│   │   └── inventoryContextDef.js    # Definicion del contexto React
│   ├── data/
│   │   └── initialProducts.js        # Datos semilla con marcas, categorias y UUID
│   ├── hooks/
│   │   └── useInventory.js           # Custom Hook para consumir el estado global
│   ├── pages/
│   │   ├── AboutUs.jsx               # Quienes Somos
│   │   ├── AddProductPage.jsx        # Ingreso de nuevos articulos
│   │   ├── ContactUs.jsx             # Contactanos
│   │   ├── Faq.jsx                   # Preguntas Frecuentes
│   │   ├── HomeInventory.jsx         # Dashboard principal
│   │   ├── HowToBuy.jsx              # Como Comprar
│   │   ├── InventoryTablePage.jsx    # Tabla general de articulos
│   │   └── NotFound.jsx              # Manejador de rutas 404
│   │   └── OurStores.jsx             # Nuestras Tiendas
│   ├── App.css                       # Reglas complementarias de estilo
│   ├── App.jsx                       # Rutas y envoltura con InventoryProvider
│   ├── index.css                     # Importacion de Tailwind CSS y tema
│   └── main.jsx                      # Punto de entrada de la aplicacion
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 3. Instrucciones de Ejecucion Local

1. Instalar las dependencias del proyecto:
   ```bash
   npm install
   ```

2. Ejecutar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

3. Compilar el proyecto para produccion:
   ```bash
   npm run build
   ```

4. Ejecutar el linter para comprobar calidad de codigo:
   ```bash
   npm run lint
   ```
