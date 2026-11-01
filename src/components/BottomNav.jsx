import { NavLink } from "react-router-dom";

export default function BottomNav() {
  return (
    <nav className="bottom-menu-bar" aria-label="Menu de navegacion inferior">
      <div className="bottom-menu-container">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `bottom-menu-item ${isActive ? "active" : ""}`
          }
        >
          <svg
            className="bottom-menu-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span className="bottom-menu-label">Dashboard</span>
        </NavLink>

        <NavLink
          to="/nuevo-articulo"
          className={({ isActive }) =>
            `bottom-menu-item ${isActive ? "active" : ""}`
          }
        >
          <svg
            className="bottom-menu-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
          <span className="bottom-menu-label">Ingresar</span>
        </NavLink>

        <NavLink
          to="/articulos"
          className={({ isActive }) =>
            `bottom-menu-item ${isActive ? "active" : ""}`
          }
        >
          <svg
            className="bottom-menu-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="3" y1="15" x2="21" y2="15" />
            <line x1="9" y1="3" x2="9" y2="21" />
          </svg>
          <span className="bottom-menu-label">Tabla</span>
        </NavLink>

        <NavLink
          to="/nuestras-tiendas"
          className={({ isActive }) =>
            `bottom-menu-item ${isActive ? "active" : ""}`
          }
        >
          <svg
            className="bottom-menu-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <path d="M9 22V12h6v10" />
          </svg>
          <span className="bottom-menu-label">Tiendas</span>
        </NavLink>

        <NavLink
          to="/contactanos"
          className={({ isActive }) =>
            `bottom-menu-item ${isActive ? "active" : ""}`
          }
        >
          <svg
            className="bottom-menu-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          <span className="bottom-menu-label">Contacto</span>
        </NavLink>
      </div>
    </nav>
  );
}
