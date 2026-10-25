import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container py-5 text-center">
      <div className="card p-5 shadow-sm mx-auto" style={{ maxWidth: "600px" }}>
        <h1 className="display-4 fw-bold text-danger">404</h1>
        <h2 className="h4 mb-3">Pagina no encontrada</h2>
        <p className="text-muted mb-4">
          La seccion a la que intenta acceder no existe o fue reubicada en el sistema de
          gestion del supermercado.
        </p>
        <div>
          <Link to="/" className="btn btn-primary px-4 py-2">
            Volver a Gestion de Inventario (Home)
          </Link>
        </div>
      </div>
    </div>
  );
}
