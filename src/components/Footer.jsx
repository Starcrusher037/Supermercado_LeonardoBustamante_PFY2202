import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container py-4">
        <div className="row g-4">
          <div className="col-12 col-md-4">
            <h5 className="footer-title">Supermercado Requiem</h5>
            <p className="footer-text">
              Plataforma web de gestion y control de inventarios. Actividad individual
              formativa 1: Utilizando tecnologias avanzadas de React en sitios web.
            </p>
          </div>

          <div className="col-12 col-md-4">
            <h5 className="footer-title">Navegacion Principal</h5>
            <ul className="list-unstyled footer-links">
              <li>
                <Link to="/">Home / Gestion de Inventario</Link>
              </li>
              <li>
                <Link to="/quienes-somos">Quienes Somos</Link>
              </li>
              <li>
                <Link to="/preguntas-frecuentes">Preguntas Frecuentes</Link>
              </li>
            </ul>
          </div>

          <div className="col-12 col-md-4">
            <h5 className="footer-title">Informacion Tecnica</h5>
            <p className="footer-text mb-1">
              <strong>Frontend:</strong> React + React Router
            </p>
            <p className="footer-text mb-1">
              <strong>Estilos:</strong> CSS y Bootstrap
            </p>
            <p className="footer-text">
              <strong>Control de versiones:</strong> Git y repositorio de entrega
            </p>
          </div>
        </div>

        <div className="footer-bottom pt-3 mt-3 border-top text-center">
          <small className="text-muted">
            Supermercado Requiem - Todos los derechos reservados.
          </small>
        </div>
      </div>
    </footer>
  );
}
