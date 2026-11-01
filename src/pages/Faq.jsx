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
    <div className="faq-page max-w-7xl mx-auto px-4 py-4">
      <header className="page-header mb-4 pb-3 border-b border-slate-200">
        <h1 className="text-2xl font-bold mb-1">Preguntas Frecuentes</h1>
        <p className="text-slate-500 mb-0">
          Respuestas claras sobre la operativa de inventario, politicas de reposicion y compras
        </p>
      </header>

      {/* Buscador de preguntas con filtro por categoria */}
      <section className="bg-white border border-slate-200 rounded-lg p-3 mb-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-7">
            <label htmlFor="faqSearch" className="block text-sm text-slate-500 mb-1">
              Buscar consulta o palabra clave:
            </label>
            <input
              type="text"
              id="faqSearch"
              className="form-input"
              placeholder="Ejemplo: stock critico, devolucion, pago, vencimiento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="md:col-span-5">
            <label htmlFor="faqCategory" className="block text-sm text-slate-500 mb-1">
              Filtrar por categoria:
            </label>
            <select
              id="faqCategory"
              className="form-input"
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

      {/* ----------------------------------------------------------------
          Acordeon de preguntas frecuentes
          Implementacion manual que reemplaza el accordion de Bootstrap.
          Cada pregunta se expande/colapsa al hacer click en su encabezado.
          ---------------------------------------------------------------- */}
      <section className="faq-list mb-5" aria-label="Listado de preguntas frecuentes">
        {filteredFaqs.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-lg p-4 text-center text-slate-500">
            No se encontraron respuestas para los criterios de busqueda ingresados.
          </div>
        ) : (
          <div id="accordionFaq">
            {filteredFaqs.map((faq) => {
              const isOpen = openItem === faq.id;
              return (
                <div key={faq.id} className="mb-2 border border-slate-200 rounded-lg shadow-sm overflow-hidden">
                  <h2 id={`heading-${faq.id}`}>
                    <button
                      className="accordion-btn"
                      type="button"
                      onClick={() => toggleAccordion(faq.id)}
                      aria-expanded={isOpen}
                      aria-controls={`collapse-${faq.id}`}
                    >
                      <div className="flex flex-col text-left">
                        <span className="inline-block self-start bg-slate-500 text-white text-xs font-medium px-2 py-0.5 rounded mb-1">
                          {faq.category}
                        </span>
                        <span className="font-semibold">{faq.question}</span>
                      </div>
                    </button>
                  </h2>
                  {/* Contenido colapsable del acordeon, visible solo cuando isOpen es true */}
                  <div
                    id={`collapse-${faq.id}`}
                    className={`${isOpen ? "block" : "hidden"}`}
                    aria-labelledby={`heading-${faq.id}`}
                  >
                    <div className="px-5 py-3 text-slate-500 border-t border-slate-100">
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
      <section className="bg-slate-50 rounded-lg p-4 shadow-sm mb-4">
        <h3 className="text-lg font-semibold mb-2">Tiene una duda adicional no listada?</h3>
        <p className="text-slate-500 mb-3">
          El equipo de soporte administrativo de Supermercado Requiem esta disponible
          para resolver cualquier incidencia relacionada con el inventario o la atencion en sala.
        </p>
        <p className="text-sm mb-0 text-slate-500">
          Contacto interno: soporte@supermercadorequiem.local | Horario de atencion: Lunes a Sabado de 08:00 a 20:00 hrs.
        </p>
      </section>
    </div>
  );
}
