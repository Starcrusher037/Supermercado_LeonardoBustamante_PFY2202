import { BrowserRouter, Routes, Route } from "react-router-dom";
import { InventoryProvider } from "./context/InventoryContext";
import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";
import Footer from "./components/Footer";
import HomeInventory from "./pages/HomeInventory";
import AddProductPage from "./pages/AddProductPage";
import InventoryTablePage from "./pages/InventoryTablePage";
import OurStores from "./pages/OurStores";
import ContactUs from "./pages/ContactUs";
import HowToBuy from "./pages/HowToBuy";
import AboutUs from "./pages/AboutUs";
import Faq from "./pages/Faq";
import NotFound from "./pages/NotFound";
import "./App.css";

function App() {
  return (
    <InventoryProvider>
      <BrowserRouter>
        <div className="app-shell">
          {/* Barra superior de identificacion */}
          <Navbar />

          {/* Contenido principal segun la ruta activa */}
          <main className="main-content">
            <Routes>
              {/* Rutas de gestion de inventario */}
              <Route path="/" element={<HomeInventory />} />
              <Route path="/nuevo-articulo" element={<AddProductPage />} />
              <Route path="/articulos" element={<InventoryTablePage />} />

              {/* Rutas institucionales del supermercado */}
              <Route path="/quienes-somos" element={<AboutUs />} />
              <Route path="/nuestras-tiendas" element={<OurStores />} />
              <Route path="/contactanos" element={<ContactUs />} />
              <Route path="/como-comprar" element={<HowToBuy />} />
              <Route path="/preguntas-frecuentes" element={<Faq />} />

              {/* Ruta 404 para URLs no encontradas */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Pie de pagina con informacion complementaria */}
          <Footer />

          {/* Menu inferior para navegacion fluida entre paginas */}
          <BottomNav />
        </div>
      </BrowserRouter>
    </InventoryProvider>
  );
}

export default App;
