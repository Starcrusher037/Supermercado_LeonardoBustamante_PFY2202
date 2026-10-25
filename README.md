# Actividad Individual Formativa 1: Utilizando tecnologias avanzadas de React en sitios web

## Proyecto: Supermercado Requiem - Sistema de Gestion de Inventario

Repositorio desarrollado para la evaluacion formativa de la asignatura de desarrollo web con React. La aplicacion implementa una solucion integral de gestion de inventario para un supermercado, configurando la navegacion multipantalla mediante **React Router** dentro de una misma aplicacion Single Page Application (SPA).

---

## 1. Descripcion del Proyecto

El sitio web cuenta con un panel central de control y monitoreo de existencias para las diferentes areas y departamentos del supermercado, acompanado de un **menu inferior de navegacion** fijo que permite desplazarse hacia las pantallas adicionales tematicas requeridas.

### Paginas y Rutas Implementadas

1. **Home / Gestion de Inventario (`/`)**:
   - Tarjetas de metricas con calculo automatico: total de referencias, unidades en bodega, productos en stock critico o agotados y valorizacion monetaria del inventario.
   - Formulario reactivo para el registro de nuevos articulos con validacion de campos (SKU, nombre, categoria, stock inicial, stock minimo de alerta, precio y ubicacion en sala).
   - Filtros combinados por categoria de supermercado (Alimentos Secos, Lacteos, Panaderia, Bebidas, Limpieza, Carniceria, Frutas y Verduras).
   - Buscador de texto en tiempo real por nombre, SKU o pasillo.
   - Tabla interactiva con badges de estado (Disponible, Stock Critico, Agotado), ajuste rapido de stock (+1 / -1) y eliminacion de productos.
   - Persistencia local mediante `localStorage` y opcion para restablecer los datos iniciales de prueba.

2. **Quienes Somos (`/quienes-somos`)**:
   - Resena historica y trayectoria de Supermercado Requiem.
   - Declaracion formal de Mision, Vision y Valores institucionales.
   - Cuatro pilares fundamentales de la gestion operativa y cadena de frio.

3. **Preguntas Frecuentes (`/preguntas-frecuentes`)**:
   - Listado categorizado de consultas habituales sobre control de existencias, medios de pago, relacion con proveedores y politicas de devolucion.
   - Componente de acordeon interactivo expandible y colapsable.
   - Filtro por categoria de pregunta y buscador en tiempo real.
   - Canal informativo de soporte interno.

4. **Pagina 404 (`*`)**:
   - Gestion de rutas no existentes con enlace de retorno inmediato al Home.

---

## 2. Menu Inferior de Navegacion (Bottom Navigation)

Siguiendo las instrucciones especificas de la actividad, se desarrollo el componente `BottomNav` ubicado de forma permanente en la parte inferior de la interfaz. Permite alternar rapidamente entre:
- **Home / Inventario**
- **Quienes Somos**
- **Preguntas Frecuentes**

El menu utiliza el componente `NavLink` de React Router para aplicar estilos visuales diferenciados al enlace activo, garantizando una experiencia de usuario clara e intuitiva.

---

## 3. Tecnologias Utilizadas

- **React 19**: Biblioteca base para la construccion de interfaces de usuario declarativas mediante componentes funcionales y Hooks (`useState`, `useEffect`, `useMemo`).
- **React Router 7**: Enrutamiento declarativo del lado del cliente (`BrowserRouter`, `Routes`, `Route`, `NavLink`, `Link`).
- **Bootstrap 5 & CSS3**: Maquetacion responsiva, tipografia y diseno adaptable para dispositivos moviles y escritorio.
- **Vite**: Entorno de desarrollo rapido y empaquetador optimizado.
- **Git**: Sistema de control de versiones para la entrega y trabajo colaborativo.

---

## 4. Estructura del Codigo Fuente

```text
SuperMercadoRequiem/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── BottomNav.jsx       # Menu de navegacion inferior requerido
│   │   ├── Footer.jsx          # Pie de pagina institucional
│   │   └── Navbar.jsx          # Encabezado superior con marca y enlaces
│   ├── data/
│   │   └── initialProducts.js  # Catalogo base de articulos del supermercado
│   ├── pages/
│   │   ├── AboutUs.jsx         # Pagina Quienes Somos
│   │   ├── Faq.jsx             # Pagina Preguntas Frecuentes
│   │   ├── HomeInventory.jsx   # Pagina principal de gestion de inventario
│   │   └── NotFound.jsx        # Manejador de rutas no encontradas (404)
│   ├── App.css                 # Reglas de estilo para layout, cards y menu inferior
│   ├── App.jsx                 # Configuracion de rutas principales de React Router
│   ├── index.css               # Estilos globales y variables
│   └── main.jsx                # Punto de entrada de la aplicacion React
├── index.html                  # Plantilla HTML principal
├── package.json                # Dependencias y scripts de ejecucion
└── README.md                   # Documentacion del proyecto para el docente
```

---

