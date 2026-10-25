import { useState, useMemo } from "react";

const faqData = [
  {
    id: 1,
    category: "Inventario y Stock",
    question: "Como se actualizan las existencias de productos en el sistema?",
    answer:
      "Las existencias se actualizan en tiempo real mediante el panel de inventario. Cada ingreso de mercaderia o despacho en caja incrementa o disminuye el stock disponible automaticamente."
  },
  {
    id: 2,
    category: "Inventario y Stock",
    question: "Que significa la etiqueta de 'Stock Critico'?",
    answer:
      "Aparece cuando el numero de unidades disponibles cae por debajo del nivel minimo de alerta definido para ese SKU. Indica la necesidad inmediata de generar una orden de reposicion."
  },
  {
    id: 3,
    category: "Compras y Precios",
    question: "Los precios mostrados en el sistema incluyen impuestos?",
    answer:
      "Si, todos los precios unitarios registrados en el modulo de inventario y mostrados en sala contemplan el IVA y gravamenes correspondientes."
  },
  {
    id: 4,
    category: "Compras y Precios",
    question: "Cuales son los medios de pago aceptados en caja y bodega?",
    answer:
      "Aceptamos tarjetas de debito, credito, transferencias bancarias directas y pagos en efectivo para compras mayoristas y minoristas."
  },
  {
    id: 5,
    category: "Logistica y Proveedores",
    question: "Cual es el procedimiento para dar de alta un nuevo proveedor?",
    answer:
      "El proveedor debe registrar su identificacion fiscal, catalogo de articulos y condiciones comerciales con el area de compras. Luego, los articulos se ingresan con su respectivo SKU al sistema."
  },
  {
    id: 6,
    category: "Logistica y Proveedores",
    question: "Como se maneja el control de productos perecibles y fechas de vencimiento?",
    answer:
      "Se aplica la metodologia FEFO (primero en expirar, primero en salir). Los articulos proximos a vencer son identificados en la revision de pasillo para su priorizacion en sala o liquidacion autorizada."
  },
  {
    id: 7,
    category: "Politicas y Devoluciones",
    question: "Cual es la politica de devolucion o cambio de productos?",
    answer:
      "Los clientes disponen de 10 dias corridos para solicitar cambio o devolucion de productos no perecibles presentando su boleta y el articulo en su empaque original sin alteraciones."
  },
  {
    id: 8,
    category: "Politicas y Devoluciones",
    question: "Que sucede si un producto reporta stock cero pero aparece en gondola?",
    answer:
      "El encargado de turno debe registrar el reajuste manual en el sistema a traves del boton de incremento para conciliar la existencia fisica con la base de datos."
  }
];

export default function Faq() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [openItem, setOpenItem] = useState(1);

  const categories = ["Todas", "Inventario y Stock", "Compras y Precios", "Logistica y Proveedores", "Politicas y Devoluciones"];

  const toggleAccordion = (id) => {
    setOpenItem((prev) => (prev === id ? null : id));
  };

  const filteredFaqs = useMemo(() => {
    return faqData.filter((item) => {
      const matchesCategory =
        activeCategory === "Todas" || item.category === activeCategory;
      const matchesSearch =
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, activeCategory]);

  return (
    <div className="faq-page container py-4">
      <header className="page-header mb-4 pb-3 border-bottom">
        <h1 className="h2 mb-1">Preguntas Frecuentes</h1>
        <p className="text-muted mb-0">
          Respuestas claras sobre la operativa de inventario, politicas de reposicion y compras
        </p>
      </header>

      {/* Buscador de preguntas */}
      <section className="card p-3 mb-4 shadow-sm">
        <div className="row g-3 align-items-center">
          <div className="col-12 col-md-7">
            <label htmlFor="faqSearch" className="form-label small text-muted mb-1">
              Buscar consulta o palabra clave:
            </label>
            <input
              type="text"
              id="faqSearch"
              className="form-control"
              placeholder="Ejemplo: stock critico, devolucion, pago, vencimiento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="col-12 col-md-5">
            <label htmlFor="faqCategory" className="form-label small text-muted mb-1">
              Filtrar por categoria:
            </label>
            <select
              id="faqCategory"
              className="form-select"
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Acordeon de preguntas */}
      <section className="faq-list mb-5" aria-label="Listado de preguntas frecuentes">
        {filteredFaqs.length === 0 ? (
          <div className="card p-4 text-center text-muted">
            No se encontraron respuestas para los criterios de busqueda ingresados.
          </div>
        ) : (
          <div className="accordion" id="accordionFaq">
            {filteredFaqs.map((faq) => {
              const isOpen = openItem === faq.id;
              return (
                <div key={faq.id} className="accordion-item mb-2 border rounded shadow-sm">
                  <h2 className="accordion-header" id={`heading-${faq.id}`}>
                    <button
                      className={`accordion-button ${isOpen ? "" : "collapsed"}`}
                      type="button"
                      onClick={() => toggleAccordion(faq.id)}
                      aria-expanded={isOpen}
                      aria-controls={`collapse-${faq.id}`}
                    >
                      <div className="d-flex flex-column text-start">
                        <span className="badge bg-secondary mb-1 align-self-start">
                          {faq.category}
                        </span>
                        <span className="fw-semibold">{faq.question}</span>
                      </div>
                    </button>
                  </h2>
                  <div
                    id={`collapse-${faq.id}`}
                    className={`accordion-collapse collapse ${isOpen ? "show" : ""}`}
                    aria-labelledby={`heading-${faq.id}`}
                  >
                    <div className="accordion-body text-secondary">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Seccion de contacto / atencion */}
      <section className="card p-4 bg-light border-0 shadow-sm mb-4">
        <h3 className="h5 mb-2">Tiene una duda adicional no listada?</h3>
        <p className="text-muted mb-3">
          El equipo de soporte administrativo de Supermercado Requiem esta disponible
          para resolver cualquier incidencia relacionada con el inventario o la atencion en sala.
        </p>
        <p className="small mb-0 text-muted">
          Contacto interno: soporte@supermercadorequiem.local | Horario de atencion: Lunes a Sabado de 08:00 a 20:00 hrs.
        </p>
      </section>
    </div>
  );
}
