import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Cart } from "../models";

/** The cart lines from Redux wrapped in the Cart class (totals, shipping...). */
export function useCart() {
  const items = useSelector((state) => state.cart.items);
  return useMemo(() => new Cart(items), [items]);
}
