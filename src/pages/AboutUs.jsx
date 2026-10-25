export default function AboutUs() {
  return (
    <div className="about-page container py-4">
      <header className="page-header mb-4 pb-3 border-bottom">
        <h1 className="h2 mb-1">Quienes Somos</h1>
        <p className="text-muted mb-0">
          Conozca la historia, los valores y el compromiso logistico de Supermercado Requiem
        </p>
      </header>

      {/* Seccion principal / Resumen */}
      <section className="card p-4 mb-4 shadow-sm border-0 bg-light">
        <div className="row align-items-center">
          <div className="col-12 col-lg-8">
            <h2 className="h4 text-primary mb-3">Nuestra Trayectoria</h2>
            <p className="lead fs-6 text-secondary">
              Supermercado Requiem nacio con el objetivo de ofrecer a las familias y
              empresas locales productos frescos, alimentos de primera calidad y articulos
              para el hogar a precios accesibles, respaldados por una logistica eficiente y
              tecnologia moderna.
            </p>
            <p className="text-muted">
              A lo largo de los anos hemos implementado herramientas digitales de gestion de
              inventario en tiempo real que nos permiten optimizar la cadena de suministro,
              evitar quiebres de stock en productos esenciales y asegurar la trazabilidad y
              frescura en cada una de nuestras secciones.
            </p>
          </div>
          <div className="col-12 col-lg-4 text-center mt-3 mt-lg-0">
            <div className="p-3 border rounded bg-white shadow-sm">
              <h3 className="h5 text-dark mb-2">Compromiso Requiem</h3>
              <p className="small text-muted mb-0">
                Garantizamos disponibilidad, abastecimiento continuo y servicio cercano
                para toda nuestra comunidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mision, Vision, Valores */}
      <section className="row g-4 mb-4">
        <div className="col-12 col-md-4">
          <div className="card h-100 shadow-sm p-3">
            <h3 className="h5 text-primary mb-2">Mision</h3>
            <p className="text-muted mb-0">
              Brindar una experiencia de compra agil y confiable a traves del abastecimiento
              constante de productos de alta calidad, promoviendo precios justos y una
              atencion calida y orientada al cliente.
            </p>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card h-100 shadow-sm p-3">
            <h3 className="h5 text-primary mb-2">Vision</h3>
            <p className="text-muted mb-0">
              Consolidarnos como el supermercado lider en innovacion operativa y gestion
              inteligente de inventarios, siendo un referente de sostenibilidad, eficiencia y
              servicio al cliente en la region.
            </p>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card h-100 shadow-sm p-3">
            <h3 className="h5 text-primary mb-2">Valores</h3>
            <ul className="text-muted ps-3 mb-0">
              <li>Transparencia en precios y procesos</li>
              <li>Compromiso con la calidad y frescura</li>
              <li>Responsabilidad con el medio ambiente</li>
              <li>Innovacion y mejora continua</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Pilares logisticos */}
      <section className="card p-4 shadow-sm mb-5">
        <h2 className="h4 mb-3">Pilares de Nuestra Gestion Operativa</h2>
        <div className="row g-3">
          <div className="col-12 col-md-6 col-lg-3">
            <div className="p-3 border rounded h-100">
              <h4 className="h6 fw-bold">1. Control de Stock en Vivo</h4>
              <p className="small text-muted mb-0">
                Monitoreo continuo de existencias minimas para prevenir roturas de stock y
                reducir merma alimentaria.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3">
            <div className="p-3 border rounded h-100">
              <h4 className="h6 fw-bold">2. Alianzas con Proveedores</h4>
              <p className="small text-muted mb-0">
                Trabajo directo con agricultores, panaderos y distribuidores para asegurar
                abastecimiento diario.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3">
            <div className="p-3 border rounded h-100">
              <h4 className="h6 fw-bold">3. Cadena de Frio Rigurosa</h4>
              <p className="small text-muted mb-0">
                Supervision estricta en refrigeracion de carnes, lacteos y congelados bajo
                normas sanitarias vigentes.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3">
            <div className="p-3 border rounded h-100">
              <h4 className="h6 fw-bold">4. Digitalizacion Front-end</h4>
              <p className="small text-muted mb-0">
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
