import { useContext } from "react";
import { InventoryContext } from "../context/inventoryContextDef";

export function useInventory() {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error(
      "useInventory debe ser utilizado dentro de un InventoryProvider"
    );
  }
  return context;
}

export default useInventory;
