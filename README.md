# Actividad Sumativa Semana 3: Desarrollando sitios web con React avanzado

## Proyecto: Supermercado Requiem - Sistema Integral de Inventario y Carrito

Repositorio desarrollado para la gestion de inventario y compras de un supermercado, implementando tecnologias avanzadas de React tales como arquitectura de estado centralizado con **Context API** y **useReducer** para transacciones atomicas, validacion de formularios mediante **expresiones regulares (RegEx)**, enrutamiento desacoplado con **HashRouter** optimizado para **GitHub Pages**, filtrado inmutable multidimensional, catalogo con fichas tecnicas detalladas, modulo de carrito con sincronizacion bidireccional y estilizacion responsiva mediante **Tailwind CSS v4**.

- Enlace publico en GitHub Pages: https://starcrusher037.github.io/Supermercado_LeonardoBustamante_PFY2202/
- Repositorio GitHub: https://github.com/Starcrusher037/Supermercado_LeonardoBustamante_PFY2202

---

## 1. Novedades y Mejoras Implementadas (Semana 3)

### A. Gestion de Estado Atomica con useReducer
Se refactorizo el nucleo del contexto (`src/context/InventoryContext.jsx`) abandonando estados locales aislados en favor del patron `useReducer`:
- **Unificacion del estado global**: Se consolida el estado en un unico arbol `{ products, cart, feedbackMessage }`.
- **Atomicidad bidireccional**: Al agregar productos al carrito o alterar cantidades, la deduccion o reposicion de existencias en bodega se procesa en la misma transaccion pura del reducer.
- **Acciones formales**:
  - `ADD_PRODUCT`: Registro de nuevos articulos validando unicidad de SKU.
  - `ADJUST_STOCK`: Ajuste rapido de existencias en bodega.
  - `DELETE_PRODUCT`: Eliminacion de articulo y limpieza automatica de referencias en carrito.
  - `RESET_INVENTORY`: Restauracion del catalogo base semilla.
  - `ADD_TO_CART`: Validacion de existencias, deduccion en bodega e inclusion en carrito.
  - `UPDATE_CART_QUANTITY`: Incremento o decremento coordinado con reposicion o reserva en bodega.
  - `REMOVE_FROM_CART`: Retiro de producto del carrito con restitucion total de unidades reservadas.
  - `CLEAR_CART`: Vaciado total restituyendo el stock a bodega.
  - `CHECKOUT_CART`: Cierre de compra definitiva conservando el descuento de bodega.
  - `SET_NOTIFICATION` / `CLEAR_NOTIFICATION`: Feedback contextual temporizado.

### B. Validaciones con Expresiones Regulares (RegEx)
Se implementaron validaciones formales para asegurar la integridad de datos:
- **Formulario de Contacto (`ContactUs.jsx`)**:
  - **Correo electronico**: `/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/` (validacion de formato estandar de correo).
  - **Telefono de contacto**: `/^(\+?56)?(\s?)(9\s?\d{4}\s?\d{4}|\d{2}\s?\d{4}\s?\d{4})$/` (validacion de numeracion valida en Chile).
  - **Nombre completo**: `/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]{3,}$/` (minimo 3 caracteres alfabeticos).
- **Formulario de Nuevo Articulo (`ProductForm.jsx`)**:
  - **Codigo SKU**: `/^[A-Z]{3}-\d{3,4}$/` (estandar de retail: 3 letras mayusculas, guion y 3 o 4 numeros, ej: `LAC-010`, `BEB-004`).
  - **Stock y Precio**: `/^\d+$/` (enteros positivos no negativos).

### C. Despliegue en GitHub Pages (gh-pages)
- Se configuro la propiedad `base: '/Supermercado_LeonardoBustamante_PFY2202/'` en `vite.config.js`.
- Se incorporo `HashRouter` en `src/App.jsx` para garantizar que la navegacion entre rutas y la recarga de pagina no generen errores 404 en servidores estaticos como GitHub Pages.
- Se integro la dependencia y scripts de publicacion automatica en `package.json` (`predeploy` y `deploy`).

---

## 2. Descripcion de Modulos y Funcionalidades

### Modulo de Inventario y Catalogo:
1. **Listado de Articulos (`InventoryTablePage.jsx` y `ProductTable.jsx`)**:
   - Tabla con informacion completa: SKU, nombre, marca, categoria, ubicacion, precio formateado, stock numerico, estado de disponibilidad y acciones.
   - Tarjetas KPI con metricas de resumen logistico.
2. **Filtro Dinamico Inmutable (`InventoryFilters.jsx`)**:
   - Selector por categoria y buscador por texto en tiempo real.
   - Procesa los datos de forma inmutable mediante `useMemo`, preservando el inventario original.
3. **Ficha Tecnica de Detalle (`ProductDetailPage.jsx`)**:
   - Acceso individual a traves de `/articulos/:id`.
   - Especificaciones completas, estado critico/agotado y selector interactivo con validacion de existencias maximas para agregar al carrito.
4. **Ingreso de Nuevos Articulos (`AddProductPage.jsx` y `ProductForm.jsx`)**:
   - Formulario controlado con validacion RegEx, control de SKU duplicado y persistencia inmediata.

### Modulo de Carrito de Compras:
1. **Pantalla de Carrito (`CartPage.jsx`)**:
   - Listado de articulos reservados con calculo de subtotal, total e indicador de existencias remanentes en bodega.
   - Controles `+` y `-` que actualizan en tiempo real el stock del inventario.
   - Opciones para quitar productos, vaciar el carrito o completar la compra.

### Modulo Institucional y de Atencion:
1. **Quienes Somos (`AboutUs.jsx`)**: Mision, vision y valores corporativos.
2. **Nuestras Tiendas (`OurStores.jsx`)**: Sucursales fisicas y horarios.
3. **Contactanos (`ContactUs.jsx`)**: Formulario estructurado con validacion RegEx.
4. **Como Comprar (`HowToBuy.jsx`)**: Guia de compra y metodos de pago.
5. **Preguntas Frecuentes (`Faq.jsx`)**: Preguntas y respuestas habituales.

---

## 3. Estructura del Proyecto

```text
SuperMercadoRequiem/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── inventory/
│   │   │   ├── InventoryFilters.jsx  # Subcomponente de busqueda y selector de categoria
│   │   │   ├── InventoryMetrics.jsx  # Tarjetas de resumen logistico y KPIs
│   │   │   ├── ProductForm.jsx       # Formulario con validacion RegEx para SKU y valores
│   │   │   └── ProductTable.jsx      # Tabla interactiva con enlace a fichas tecnicas
│   │   ├── BottomNav.jsx             # Menu inferior movil con iconos SVG e insignias reactivas
│   │   ├── Footer.jsx                # Pie de pagina institucional
│   │   └── Navbar.jsx                # Barra superior con menu hamburguesa y contador de carrito
│   ├── context/
│   │   ├── InventoryContext.jsx      # useReducer + Context API con sincronizacion atomica
│   │   └── inventoryContextDef.js    # Definicion del contexto
│   ├── data/
│   │   └── initialProducts.js        # Catalogo semilla inicial
│   ├── hooks/
│   │   └── useInventory.js           # Custom hook de consumo desacoplado
│   ├── pages/
│   │   ├── AboutUs.jsx               # Quienes Somos
│   │   ├── AddProductPage.jsx        # Pantalla de registro de producto
│   │   ├── CartPage.jsx              # Pantalla de carrito con sincronizacion de stock
│   │   ├── ContactUs.jsx             # Pantalla de contacto con validaciones RegEx
│   │   ├── Faq.jsx                   # Preguntas frecuentes
│   │   ├── HomeInventory.jsx         # Dashboard principal
│   │   ├── HowToBuy.jsx              # Como Comprar
│   │   ├── InventoryTablePage.jsx    # Catalogo con filtro dinamico inmutable
│   │   ├── NotFound.jsx              # Manejador de ruta 404
│   │   ├── OurStores.jsx             # Nuestras Tiendas
│   │   └── ProductDetailPage.jsx     # Ficha tecnica detallada de articulo
│   ├── App.css
│   ├── App.jsx                       # Configuracion de HashRouter y vistas
│   ├── index.css                     # Directivas de Tailwind CSS v4
│   └── main.jsx                      # Punto de entrada
├── index.html
├── package.json                      # Scripts de desarrollo, construccion y despliegue gh-pages
├── vite.config.js                    # Configuracion de Vite con plugin Tailwind y base de despliegue
└── README.md                         # Documentacion tecnica del proyecto
```

---

## 4. Instrucciones de Ejecucion y Despliegue

### 1. Instalacion de dependencias
```bash
npm install
```

### 2. Ejecutar entorno de desarrollo local
```bash
npm run dev
```

### 3. Verificar calidad de codigo con linter
```bash
npm run lint
```

### 4. Compilar proyecto para produccion
```bash
npm run build
```

### 5. Desplegar en GitHub Pages
```bash
npm run deploy
```
El comando `npm run deploy` ejecutara previamente la compilacion (`predeploy`) y publicara automaticamente la carpeta `dist` en la rama `gh-pages` de su repositorio remoto.
