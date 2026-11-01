import { useInventory } from "../../hooks/useInventory";

export default function InventoryMetrics({ customMetrics }) {
  const { metrics: defaultMetrics } = useInventory();
  const metrics = customMetrics || defaultMetrics;

  return (
    <section
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4"
      aria-label="Metricas de inventario"
    >
      <div className="stat-card">
        <span className="stat-label">Total Referencias</span>
        <span className="stat-value">{metrics.totalItems}</span>
        <span className="stat-sub">Productos en sistema</span>
      </div>

      <div className="stat-card">
        <span className="stat-label">Unidades Totales</span>
        <span className="stat-value">{metrics.totalStock}</span>
        <span className="stat-sub">Existencias en piso y bodega</span>
      </div>

      <div className="stat-card">
        <span className="stat-label">Alertas de Stock</span>
        <span className="stat-value text-red-600">
          {metrics.lowStockCount + metrics.outOfStockCount}
        </span>
        <span className="stat-sub">
          {metrics.lowStockCount} criticos / {metrics.outOfStockCount} agotados
        </span>
      </div>

      <div className="stat-card">
        <span className="stat-label">Valor del Inventario</span>
        <span className="stat-value">
          ${metrics.totalValuation.toLocaleString("es-CL")}
        </span>
        <span className="stat-sub">Calculado al precio unitario</span>
      </div>
    </section>
  );
}
