export default function AboutUs() {
  return (
    <div className="about-page max-w-7xl mx-auto px-4 py-4">
      <header className="page-header mb-4 pb-3 border-b border-slate-200">
        <h1 className="text-2xl font-bold mb-1">Quienes Somos</h1>
        <p className="text-slate-500 mb-0">
          Conozca la historia, los valores y el compromiso logistico de Supermercado Requiem
        </p>
      </header>

      {/* Seccion principal / Resumen */}
      <section className="bg-slate-50 rounded-lg p-4 mb-4 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-blue-600 mb-3">Nuestra Trayectoria</h2>
            <p className="text-base text-slate-500 leading-relaxed">
              Supermercado Requiem nacio con el objetivo de ofrecer a las familias y
              empresas locales productos frescos, alimentos de primera calidad y articulos
              para el hogar a precios accesibles, respaldados por una logistica eficiente y
              tecnologia moderna.
            </p>
            <p className="text-slate-500">
              A lo largo de los anos hemos implementado herramientas digitales de gestion de
              inventario en tiempo real que nos permiten optimizar la cadena de suministro,
              evitar quiebres de stock en productos esenciales y asegurar la trazabilidad y
              frescura en cada una de nuestras secciones.
            </p>
          </div>
          <div className="text-center mt-3 lg:mt-0">
            <div className="p-3 border border-slate-200 rounded-lg bg-white shadow-sm">
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Compromiso Requiem</h3>
              <p className="text-sm text-slate-500 mb-0">
                Garantizamos disponibilidad, abastecimiento continuo y servicio cercano
                para toda nuestra comunidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mision, Vision, Valores - Grid de tres tarjetas con altura uniforme */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <div className="bg-white rounded-lg shadow-sm p-3 h-full border border-slate-200">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">Mision</h3>
            <p className="text-slate-500 mb-0">
              Brindar una experiencia de compra agil y confiable a traves del abastecimiento
              constante de productos de alta calidad, promoviendo precios justos y una
              atencion calida y orientada al cliente.
            </p>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-sm p-3 h-full border border-slate-200">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">Vision</h3>
            <p className="text-slate-500 mb-0">
              Consolidarnos como el supermercado lider en innovacion operativa y gestion
              inteligente de inventarios, siendo un referente de sostenibilidad, eficiencia y
              servicio al cliente en la region.
            </p>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-sm p-3 h-full border border-slate-200">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">Valores</h3>
            <ul className="text-slate-500 pl-5 mb-0 list-disc">
              <li>Transparencia en precios y procesos</li>
              <li>Compromiso con la calidad y frescura</li>
              <li>Responsabilidad con el medio ambiente</li>
              <li>Innovacion y mejora continua</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Pilares logisticos - Grid de cuatro tarjetas informativas */}
      <section className="bg-white rounded-lg p-4 shadow-sm mb-5 border border-slate-200">
        <h2 className="text-xl font-semibold mb-3">Pilares de Nuestra Gestion Operativa</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <div className="p-3 border border-slate-200 rounded-lg h-full">
              <h4 className="text-sm font-bold">1. Control de Stock en Vivo</h4>
              <p className="text-sm text-slate-500 mb-0">
                Monitoreo continuo de existencias minimas para prevenir roturas de stock y
                reducir merma alimentaria.
              </p>
            </div>
          </div>

          <div>
            <div className="p-3 border border-slate-200 rounded-lg h-full">
              <h4 className="text-sm font-bold">2. Alianzas con Proveedores</h4>
              <p className="text-sm text-slate-500 mb-0">
                Trabajo directo con agricultores, panaderos y distribuidores para asegurar
                abastecimiento diario.
              </p>
            </div>
          </div>

          <div>
            <div className="p-3 border border-slate-200 rounded-lg h-full">
              <h4 className="text-sm font-bold">3. Cadena de Frio Rigurosa</h4>
              <p className="text-sm text-slate-500 mb-0">
                Supervision estricta en refrigeracion de carnes, lacteos y congelados bajo
                normas sanitarias vigentes.
              </p>
            </div>
          </div>

          <div>
            <div className="p-3 border border-slate-200 rounded-lg h-full">
              <h4 className="text-sm font-bold">4. Digitalizacion Front-end</h4>
              <p className="text-sm text-slate-500 mb-0">
                Aplicaciones React con enrutamiento dinamico para facilitar la supervision
                del personal y administracion.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
