import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <h5 className="footer-title">Supermercado Requiem</h5>
            <p className="footer-text">
              Plataforma web de gestion y control de inventarios. Actividad individual formativa: Implementando gestion de estado en componentes frontend con React.
            </p>
          </div>

          <div>
            <h5 className="footer-title">Gestion de Inventario</h5>
            <ul className="list-none p-0 footer-links space-y-1">
              <li>
                <Link to="/">Dashboard Principal</Link>
              </li>
              <li>
                <Link to="/nuevo-articulo">Ingresar Articulo</Link>
              </li>
              <li>
                <Link to="/articulos">Tabla de Articulos</Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="footer-title">Informacion y Servicio</h5>
            <ul className="list-none p-0 footer-links space-y-1">
              <li>
                <Link to="/quienes-somos">Quienes Somos</Link>
              </li>
              <li>
                <Link to="/nuestras-tiendas">Nuestras Tiendas</Link>
              </li>
              <li>
                <Link to="/contactanos">Contactanos</Link>
              </li>
              <li>
                <Link to="/como-comprar">Como Comprar</Link>
              </li>
              <li>
                <Link to="/preguntas-frecuentes">Preguntas Frecuentes</Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="footer-title">Informacion Tecnica</h5>
            <p className="footer-text mb-1">
              <strong>Frontend:</strong> React 19 + Context API
            </p>
            <p className="footer-text mb-1">
              <strong>Enrutador:</strong> React Router 7
            </p>
            <p className="footer-text mb-1">
              <strong>Estilos:</strong> Tailwind CSS v4
            </p>
            <p className="footer-text">
              <strong>Estado Global:</strong> Custom Hook useInventory
            </p>
          </div>
        </div>

        <div className="footer-bottom pt-4 mt-4 border-t border-slate-700 text-center">
          <small className="text-slate-400">
            Supermercado Requiem - Todos los derechos reservados.
          </small>
        </div>
      </div>
    </footer>
  );
}
