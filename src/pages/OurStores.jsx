import { useState } from "react";
import { Link } from "react-router-dom";

export default function OurStores() {
  const [selectedCity, setSelectedCity] = useState("Todas");

  const stores = [
    {
      id: "store-1",
      name: "Sucursal Central Santiago",
      city: "Santiago",
      address: "Av. Libertador Bernardo O'Higgins 1420",
      phone: "+56 2 2840 9100",
      hours: "Lunes a Sabado: 08:30 - 21:00 | Domingo: 09:00 - 19:00",
      departments: ["Carniceria", "Panaderia", "Lacteos", "Frescos", "Bodega Mayorista"],
      parking: "Estacionamiento cubierto gratuito (120 plazas)"
    },
    {
      id: "store-2",
      name: "Sucursal Providencia",
      city: "Santiago",
      address: "Av. Providencia 2185",
      phone: "+56 2 2840 9105",
      hours: "Lunes a Sabado: 08:30 - 21:30 | Domingo: 09:00 - 20:00",
      departments: ["Panaderia Express", "Lacteos", "Gourmet", "Bebidas", "Limpieza"],
      parking: "Estacionamiento subterraneo (80 plazas)"
    },
    {
      id: "store-3",
      name: "Sucursal Vina del Mar",
      city: "Vina del Mar",
      address: "Calle Valparaiso 650",
      phone: "+56 32 254 8820",
      hours: "Lunes a Sabado: 08:30 - 21:00 | Domingo: 09:30 - 19:30",
      departments: ["Carniceria", "Pescaderia", "Frutas y Verduras", "Abarrotes"],
      parking: "Estacionamiento disponible (90 plazas)"
    },
    {
      id: "store-4",
      name: "Sucursal Concepcion",
      city: "Concepcion",
      address: "Barros Arana 890",
      phone: "+56 41 273 4500",
      hours: "Lunes a Sabado: 08:30 - 21:00 | Domingo: 09:00 - 19:00",
      departments: ["Carniceria", "Panaderia", "Lacteos", "Limpieza", "Centro de Despacho"],
      parking: "Estacionamiento exterior (110 plazas)"
    }
  ];

  const cities = ["Todas", "Santiago", "Vina del Mar", "Concepcion"];

  const filteredStores = stores.filter(
    (store) => selectedCity === "Todas" || store.city === selectedCity
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <header className="page-header mb-6 pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
          <Link to="/" className="hover:text-blue-600 transition-colors">
            Inicio
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-medium">Nuestras Tiendas</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Nuestras Tiendas y Sucursales</h1>
        <p className="text-slate-500 text-sm">
          Encuentre la sucursal de Supermercado Requiem mas cercana a su localidad, consulte horarios y servicios.
        </p>
      </header>

      {/* Selector de Ciudad */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-slate-700">Filtrar por ciudad:</span>
          <div className="flex flex-wrap gap-2">
            {cities.map((city) => (
              <button
                key={city}
                type="button"
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  selectedCity === city
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
                onClick={() => setSelectedCity(city)}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
        <span className="text-sm text-slate-500">
          Mostrando {filteredStores.length} de {stores.length} tiendas
        </span>
      </div>

      {/* Grid de Sucursales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredStores.map((store) => (
          <div
            key={store.id}
            className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide bg-blue-50 px-2 py-0.5 rounded">
                  {store.city}
                </span>
                <h2 className="text-lg font-bold text-slate-900 mt-1">{store.name}</h2>
              </div>
            </div>

            <div className="space-y-2 text-sm text-slate-600 mb-4">
              <p className="flex items-start gap-2">
                <strong className="text-slate-800 min-w-[85px]">Direccion:</strong>
                <span>{store.address}</span>
              </p>
              <p className="flex items-start gap-2">
                <strong className="text-slate-800 min-w-[85px]">Telefono:</strong>
                <span>{store.phone}</span>
              </p>
              <p className="flex items-start gap-2">
                <strong className="text-slate-800 min-w-[85px]">Horario:</strong>
                <span>{store.hours}</span>
              </p>
              <p className="flex items-start gap-2">
                <strong className="text-slate-800 min-w-[85px]">Acceso:</strong>
                <span>{store.parking}</span>
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Secciones Disponibles
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {store.departments.map((dept) => (
                  <span
                    key={dept}
                    className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-md"
                  >
                    {dept}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
