export const generateId = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

export const initialProducts = [
  {
    id: "prod-001",
    sku: "ALM-001",
    name: "Arroz Grano Largo 1kg",
    brand: "Tucapel",
    category: "Alimentos Secos",
    stock: 45,
    minStock: 15,
    price: 1490,
    location: "Pasillo 1 - Estante A"
  },
  {
    id: "prod-002",
    sku: "LAC-002",
    name: "Leche Entera 1L",
    brand: "Colun",
    category: "Lacteos",
    stock: 12,
    minStock: 20,
    price: 1050,
    location: "Pasillo 2 - Refrigerador B"
  },
  {
    id: "prod-003",
    sku: "PAN-003",
    name: "Pan de Molde Integral 500g",
    brand: "Ideal",
    category: "Panaderia",
    stock: 28,
    minStock: 10,
    price: 2190,
    location: "Pasillo 3 - Estante C"
  },
  {
    id: "prod-004",
    sku: "BEB-004",
    name: "Jugo Natural de Naranja 1.5L",
    brand: "Watts",
    category: "Bebidas",
    stock: 4,
    minStock: 10,
    price: 1890,
    location: "Pasillo 2 - Refrigerador A"
  },
  {
    id: "prod-005",
    sku: "LIM-005",
    name: "Detergente Liquido Multiuso 3L",
    brand: "Omo",
    category: "Limpieza",
    stock: 18,
    minStock: 8,
    price: 6990,
    location: "Pasillo 4 - Estante D"
  },
  {
    id: "prod-006",
    sku: "CAR-006",
    name: "Pechuga de Pollo Fresca 1kg",
    brand: "Super Pollo",
    category: "Carniceria",
    stock: 0,
    minStock: 12,
    price: 4890,
    location: "Pasillo 5 - Camara Fria"
  },
  {
    id: "prod-007",
    sku: "FRU-007",
    name: "Manzana Royal Gala 1kg",
    brand: "Fruticola del Sur",
    category: "Frutas y Verduras",
    stock: 35,
    minStock: 15,
    price: 1690,
    location: "Zona Frescos - Mesa 2"
  },
  {
    id: "prod-008",
    sku: "LAC-008",
    name: "Queso Laminado Gauda 250g",
    brand: "Soprole",
    category: "Lacteos",
    stock: 3,
    minStock: 10,
    price: 2590,
    location: "Pasillo 2 - Vitrina Fria"
  }
];

export const productCategories = [
  "Todas",
  "Alimentos Secos",
  "Lacteos",
  "Panaderia",
  "Bebidas",
  "Limpieza",
  "Carniceria",
  "Frutas y Verduras"
];
