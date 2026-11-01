import { Link } from "react-router-dom";

export default function HowToBuy() {
  const steps = [
    {
      number: "01",
      title: "Consulte el Inventario en Linea",
      description:
        "Revise nuestro catalogo en tiempo real desde el panel de inventario para verificar la disponibilidad, precios y marcas de los articulos que necesita."
    },
    {
      number: "02",
      title: "Seleccione su Modalidad de Compra",
      description:
        "Puede acudir de forma presencial a cualquiera de nuestras sucursales o coordinar pedidos corporativos y mayoristas a traves de nuestros canales de atencion."
    },
    {
      number: "03",
      title: "Medios de Pago Seguros",
      description:
        "Aceptamos tarjetas de debito (Redcompra), credito bancario (Visa, Mastercard), transferencias electronicas directas y efectivo en cajas habilitadas."
    },
    {
      number: "04",
      title: "Entrega y Trazabilidad",
      description:
        "Para compras asistidas o retiros en sala, nuestro personal valida el codigo SKU de cada producto garantizando la frescura y la emision de factura o boleta electronica."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <header className="page-header mb-6 pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
          <Link to="/" className="hover:text-blue-600 transition-colors">
            Inicio
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-medium">Como Comprar</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Como Comprar en Supermercado Requiem</h1>
        <p className="text-slate-500 text-sm">
          Guia informativa sobre el proceso de compra, gestion de pedidos, medios de pago y politicas de despacho.
        </p>
      </header>

      {/* Grid de Pasos */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-slate-900 mb-4">
          Proceso Paso a Paso
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow relative"
            >
              <span className="text-2xl font-black text-blue-600 block mb-2 font-mono">
                {step.number}
              </span>
              <h3 className="text-base font-bold text-slate-800 mb-2">{step.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Seccion Medios de Pago y Garantias */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-3">
            Medios de Pago Habilitados
          </h2>
          <ul className="space-y-3 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <strong className="text-slate-800 min-w-[130px]">Tarjetas de Debito:</strong>
              <span>Redcompra y tarjetas de prepago autorizadas por la CMF.</span>
            </li>
            <li className="flex items-start gap-2">
              <strong className="text-slate-800 min-w-[130px]">Tarjetas de Credito:</strong>
              <span>Visa, Mastercard, American Express en hasta 3 cuotas sin interes segun convenio bancario.</span>
            </li>
            <li className="flex items-start gap-2">
              <strong className="text-slate-800 min-w-[130px]">Transferencia:</strong>
              <span>Transferencia electronica directa para convenios con empresas y compras por volumen.</span>
            </li>
            <li className="flex items-start gap-2">
              <strong className="text-slate-800 min-w-[130px]">Efectivo:</strong>
              <span>Recepcion en moneda nacional en todas las cajas de nuestras sucursales.</span>
            </li>
          </ul>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-3">
            Garantia y Politica de Cambios
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-3">
            Supermercado Requiem garantiza la calidad e inocuidad de todos los articulos comercializados.
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-slate-600">
            <li>
              Los productos perecibles cuentan con garantia inmediata de cambio en caso de cualquier inconveniente en su presentacion.
            </li>
            <li>
              Conserve su boleta o comprobante de compra para realizar cambios o devoluciones dentro del plazo legal.
            </li>
            <li>
              Atencion presencial en el meson de servicio al cliente de cualquiera de nuestras sucursales.
            </li>
          </ul>
        </div>
      </section>

      {/* Enlace al catalogo */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 text-center">
        <h2 className="text-lg font-bold text-blue-900 mb-2">
          Listo para revisar las existencias?
        </h2>
        <p className="text-sm text-blue-700 max-w-2xl mx-auto mb-4">
          Acceda a la tabla general de articulos para consultar existencias actuales, marcas y categorias disponibles en nuestras sucursales.
        </p>
        <Link
          to="/articulos"
          className="inline-block px-5 py-2.5 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors shadow-sm text-sm"
        >
          Consultar Tabla de Inventario
        </Link>
      </div>
    </div>
  );
}
