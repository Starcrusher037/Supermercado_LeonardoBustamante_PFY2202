import { NavLink } from "react-router-dom";
import { useInventory } from "../hooks/useInventory";

export default function BottomNav() {
  const { cartCount } = useInventory();

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
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" />
            <line x1="3" y1="18" x2="3.01" y2="18" />
          </svg>
          <span className="bottom-menu-label">Articulos</span>
        </NavLink>

        <NavLink
          to="/carrito"
          className={({ isActive }) =>
            `bottom-menu-item relative ${isActive ? "active" : ""}`
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
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <span className="bottom-menu-label flex items-center gap-1">
            Carrito
            {cartCount > 0 && (
              <span className="bg-emerald-600 text-white text-[10px] font-bold px-1 rounded-full">
                {cartCount}
              </span>
            )}
          </span>
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
      </div>
    </nav>
  );
}
