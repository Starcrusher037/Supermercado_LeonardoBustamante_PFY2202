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
          <span className="bottom-menu-label">Home / Inventario</span>
        </NavLink>

        <NavLink
          to="/quienes-somos"
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
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <span className="bottom-menu-label">Quienes Somos</span>
        </NavLink>

        <NavLink
          to="/preguntas-frecuentes"
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
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <span className="bottom-menu-label">Preguntas Frecuentes</span>
        </NavLink>
      </div>
    </nav>
  );
}
