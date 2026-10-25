import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";
import Footer from "./components/Footer";
import HomeInventory from "./pages/HomeInventory";
import AboutUs from "./pages/AboutUs";
import Faq from "./pages/Faq";
import NotFound from "./pages/NotFound";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        {/* Barra superior de identificacion */}
        <Navbar />

        {/* Contenido principal segun la ruta activa */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomeInventory />} />
            <Route path="/quienes-somos" element={<AboutUs />} />
            <Route path="/preguntas-frecuentes" element={<Faq />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Pie de pagina con informacion complementaria */}
        <Footer />

        {/* Menu inferior para navegacion fluida entre paginas (requerimiento especifico) */}
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}

export default App;
