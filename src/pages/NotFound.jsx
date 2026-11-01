import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 text-center">
      <div className="bg-white rounded-lg p-10 shadow-sm mx-auto border border-slate-200" style={{ maxWidth: "600px" }}>
        <h1 className="text-7xl font-bold text-red-600">404</h1>
        <h2 className="text-xl font-semibold mb-3">Pagina no encontrada</h2>
        <p className="text-slate-500 mb-4">
          La seccion a la que intenta acceder no existe o fue reubicada en el sistema de
          gestion del supermercado.
        </p>
        <div>
          <Link
            to="/"
            className="inline-block px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors no-underline"
          >
            Volver a Gestion de Inventario (Home)
          </Link>
        </div>
      </div>
    </div>
  );
}
