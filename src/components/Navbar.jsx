import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="site-header">
      <div className="container-fluid d-flex flex-wrap justify-content-between align-items-center py-2 px-3">
        <NavLink to="/" className="brand-link text-decoration-none">
          <span className="brand-badge">SMR</span>
          <span className="brand-title">Supermercado Requiem</span>
          <span className="brand-subtitle d-none d-sm-inline">| Control de Inventario</span>
        </NavLink>

        <nav className="header-nav d-none d-md-flex align-items-center gap-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-link-btn ${isActive ? "active" : ""}`
            }
          >
            Inventario (Home)
          </NavLink>
          <NavLink
            to="/quienes-somos"
            className={({ isActive }) =>
              `nav-link-btn ${isActive ? "active" : ""}`
            }
          >
            Quienes Somos
          </NavLink>
          <NavLink
            to="/preguntas-frecuentes"
            className={({ isActive }) =>
              `nav-link-btn ${isActive ? "active" : ""}`
            }
          >
            Preguntas Frecuentes
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
