import { useNavigate, Link } from "react-router-dom";
import ProductForm from "../components/inventory/ProductForm";
import { useInventory } from "../hooks/useInventory";

export default function AddProductPage() {
  const navigate = useNavigate();
  const { feedbackMessage } = useInventory();

  const handleSuccess = () => {
    // Tras agregar con exito, el usuario puede elegir ir a la tabla o continuar
    navigate("/articulos");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Encabezado y migas de pan */}
      <div className="mb-6 pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
          <Link to="/" className="hover:text-blue-600 transition-colors">
            Inicio
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-medium">Ingreso de Articulos</span>
        </div>
        <div className="flex flex-wrap justify-between items-center gap-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Ingresar Nuevos Articulos al Inventario
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Complete los campos requeridos para incorporar un nuevo producto al catalogo global del supermercado.
            </p>
          </div>
          <Link
            to="/articulos"
            className="px-4 py-2 border border-slate-300 text-slate-700 font-medium rounded-md hover:bg-slate-100 transition-colors text-sm"
          >
            Ver Tabla de Articulos
          </Link>
        </div>
      </div>

      {/* Alerta de notificacion global */}
      {feedbackMessage && (
        <div
          className={`p-4 rounded-md mb-4 text-sm font-medium border ${
            feedbackMessage.type === "error"
              ? "bg-red-50 text-red-800 border-red-200"
              : feedbackMessage.type === "success"
              ? "bg-green-50 text-green-800 border-green-200"
              : "bg-blue-50 text-blue-800 border-blue-200"
          }`}
          role="alert"
        >
          {feedbackMessage.message}
        </div>
      )}

      {/* Formulario modular */}
      <ProductForm
        title="Formulario de Registro de Articulo"
        onSuccess={handleSuccess}
        onCancel={() => navigate("/articulos")}
      />

      {/* Tarjeta informativa de pautas */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-sm text-slate-600">
        <h3 className="font-semibold text-slate-800 mb-2">
          Recomendaciones para el registro de articulos:
        </h3>
        <ul className="list-disc list-inside space-y-1">
          <li>
            El codigo SKU debe ser unico para cada producto (ejemplo: LAC-001, BEB-020).
          </li>
          <li>
            Especifique claramente la marca comercial para facilitar la busqueda y reposicion.
          </li>
          <li>
            El stock minimo activara una alerta visual en la tabla cuando las existencias desciendan a dicho nivel.
          </li>
          <li>
            Los articulos agregados se sincronizan de inmediato en el estado global del sistema.
          </li>
        </ul>
      </div>
    </div>
  );
}
