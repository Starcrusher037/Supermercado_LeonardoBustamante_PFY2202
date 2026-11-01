import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      {/* Contenedor principal del header */}
      <div className="w-full max-w-7xl mx-auto flex flex-wrap justify-between items-center py-2 px-4">
        <NavLink to="/" className="brand-link no-underline" onClick={closeMenu}>
          <span className="brand-badge">SMR</span>
          <span className="brand-title">Supermercado Requiem</span>
          <span className="brand-subtitle hidden lg:inline">| Control de Inventario</span>
        </NavLink>

        {/* Boton hamburguesa para pantallas pequenas */}
        <button
          type="button"
          className="lg:hidden p-2 text-slate-300 hover:text-white focus:outline-none"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Abrir menu de navegacion"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Navegacion desktop */}
        <nav className="header-nav hidden lg:flex items-center gap-1">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link-btn ${isActive ? "active" : ""}`}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/nuevo-articulo"
            className={({ isActive }) => `nav-link-btn ${isActive ? "active" : ""}`}
          >
            Ingresar Articulo
          </NavLink>
          <NavLink
            to="/articulos"
            className={({ isActive }) => `nav-link-btn ${isActive ? "active" : ""}`}
          >
            Tabla Articulos
          </NavLink>
          <NavLink
            to="/nuestras-tiendas"
            className={({ isActive }) => `nav-link-btn ${isActive ? "active" : ""}`}
          >
            Nuestras Tiendas
          </NavLink>
          <NavLink
            to="/contactanos"
            className={({ isActive }) => `nav-link-btn ${isActive ? "active" : ""}`}
          >
            Contactanos
          </NavLink>
          <NavLink
            to="/como-comprar"
            className={({ isActive }) => `nav-link-btn ${isActive ? "active" : ""}`}
          >
            Como Comprar
          </NavLink>
          <NavLink
            to="/quienes-somos"
            className={({ isActive }) => `nav-link-btn ${isActive ? "active" : ""}`}
          >
            Quienes Somos
          </NavLink>
          <NavLink
            to="/preguntas-frecuentes"
            className={({ isActive }) => `nav-link-btn ${isActive ? "active" : ""}`}
          >
            FAQ
          </NavLink>
        </nav>
      </div>

      {/* Menu desplegable movil */}
      {menuOpen && (
        <div className="lg:hidden bg-slate-900 border-t border-slate-800 px-4 py-3 flex flex-col gap-1">
          <NavLink
            to="/"
            end
            onClick={closeMenu}
            className={({ isActive }) => `nav-link-btn ${isActive ? "active" : ""}`}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/nuevo-articulo"
            onClick={closeMenu}
            className={({ isActive }) => `nav-link-btn ${isActive ? "active" : ""}`}
          >
            Ingresar Articulo
          </NavLink>
          <NavLink
            to="/articulos"
            onClick={closeMenu}
            className={({ isActive }) => `nav-link-btn ${isActive ? "active" : ""}`}
          >
            Tabla de Articulos
          </NavLink>
          <NavLink
            to="/nuestras-tiendas"
            onClick={closeMenu}
            className={({ isActive }) => `nav-link-btn ${isActive ? "active" : ""}`}
          >
            Nuestras Tiendas
          </NavLink>
          <NavLink
            to="/contactanos"
            onClick={closeMenu}
            className={({ isActive }) => `nav-link-btn ${isActive ? "active" : ""}`}
          >
            Contactanos
          </NavLink>
          <NavLink
            to="/como-comprar"
            onClick={closeMenu}
            className={({ isActive }) => `nav-link-btn ${isActive ? "active" : ""}`}
          >
            Como Comprar
          </NavLink>
          <NavLink
            to="/quienes-somos"
            onClick={closeMenu}
            className={({ isActive }) => `nav-link-btn ${isActive ? "active" : ""}`}
          >
            Quienes Somos
          </NavLink>
          <NavLink
            to="/preguntas-frecuentes"
            onClick={closeMenu}
            className={({ isActive }) => `nav-link-btn ${isActive ? "active" : ""}`}
          >
            Preguntas Frecuentes
          </NavLink>
        </div>
      )}
    </header>
  );
}
