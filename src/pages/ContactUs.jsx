import { useState } from "react";
import { Link } from "react-router-dom";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    topic: "Consulta General",
    store: "Sucursal Central Santiago",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        topic: "Consulta General",
        store: "Sucursal Central Santiago",
        message: ""
      });
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <header className="page-header mb-6 pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
          <Link to="/" className="hover:text-blue-600 transition-colors">
            Inicio
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-medium">Contactanos</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Contactanos</h1>
        <p className="text-slate-500 text-sm">
          Estamos a su disposicion para atender consultas comerciales, requerimientos de proveedores o solicitudes de clientes.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Canales de Atencion */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4">
              Canales Oficiales de Atencion
            </h2>

            <div className="space-y-4 text-sm text-slate-600">
              <div className="pb-3 border-b border-slate-100">
                <span className="text-xs uppercase font-semibold text-slate-400 block mb-1">
                  Mesa Central
                </span>
                <p className="text-base font-semibold text-slate-800">+56 2 2840 9000</p>
                <p className="text-xs text-slate-500">Lunes a Viernes de 08:30 a 18:30 hrs</p>
              </div>

              <div className="pb-3 border-b border-slate-100">
                <span className="text-xs uppercase font-semibold text-slate-400 block mb-1">
                  Correo de Atencion al Cliente
                </span>
                <p className="text-base font-semibold text-slate-800">
                  contacto@supermercadorequiem.cl
                </p>
                <p className="text-xs text-slate-500">Respuesta estimada en menos de 24 horas habiles</p>
              </div>

              <div className="pb-3 border-b border-slate-100">
                <span className="text-xs uppercase font-semibold text-slate-400 block mb-1">
                  Atencion a Proveedores y Logistica
                </span>
                <p className="text-base font-semibold text-slate-800">
                  proveedores@supermercadorequiem.cl
                </p>
                <p className="text-xs text-slate-500">Recepcion de facturas y ordenes de compra</p>
              </div>

              <div>
                <span className="text-xs uppercase font-semibold text-slate-400 block mb-1">
                  Casa Matriz y Centro de Distribucion
                </span>
                <p className="text-sm font-medium text-slate-800">
                  Av. Libertador Bernardo O&apos;Higgins 1420, Santiago Centro
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulario de Contacto */}
        <div className="lg:col-span-7">
          <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              Envienos su Mensaje
            </h2>
            <p className="text-sm text-slate-500 mb-4">
              Complete el siguiente formulario y un ejecutivo de soporte se pondra en contacto con usted.
            </p>

            {submitted && (
              <div
                className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-md text-sm mb-4"
                role="alert"
              >
                <strong>Mensaje enviado:</strong> Agradecemos su contacto. Nuestro equipo respondera a la brevedad.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-1">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    className="form-input"
                    placeholder="Ej: Juan Perez Gonzalez"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                    Correo Electronico *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    placeholder="juan.perez@correo.cl"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                    Telefono de Contacto
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-input"
                    placeholder="+56 9 1234 5678"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="topic" className="block text-sm font-medium text-slate-700 mb-1">
                    Tipo de Solicitud *
                  </label>
                  <select
                    id="topic"
                    name="topic"
                    className="form-input"
                    value={formData.topic}
                    onChange={handleChange}
                  >
                    <option value="Consulta General">Consulta General</option>
                    <option value="Disponibilidad de Articulo">Disponibilidad de Articulo</option>
                    <option value="Sugerencia o Reclamo">Sugerencia o Reclamo</option>
                    <option value="Contacto Comercial Proveedor">Contacto Comercial Proveedor</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="store" className="block text-sm font-medium text-slate-700 mb-1">
                    Sucursal Relacionada
                  </label>
                  <select
                    id="store"
                    name="store"
                    className="form-input"
                    value={formData.store}
                    onChange={handleChange}
                  >
                    <option value="Sucursal Central Santiago">Sucursal Central Santiago</option>
                    <option value="Sucursal Providencia">Sucursal Providencia</option>
                    <option value="Sucursal Vina del Mar">Sucursal Vina del Mar</option>
                    <option value="Sucursal Concepcion">Sucursal Concepcion</option>
                    <option value="Todas o No Aplica">Todas o No Aplica</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                    Detalle de su Consulta o Mensaje *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    className="form-input"
                    placeholder="Escriba aqui su mensaje detallado..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="md:col-span-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors shadow-sm text-sm"
                  >
                    Enviar Mensaje
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
