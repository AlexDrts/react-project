import { MAX_QTY } from "../../store/cartSlice";

export const initialSelection = { size: null, qty: 1, error: null };

/** State of the "choose size and quantity" panel on the product page. */
export function selectionReducer(state, action) {
  switch (action.type) {
    case "pick_size":
      return { ...state, size: action.size, error: null };
    case "qty_up":
      return { ...state, qty: Math.min(MAX_QTY, state.qty + 1) };
    case "qty_down":
      return { ...state, qty: Math.max(1, state.qty - 1) };
    case "size_missing":
      return { ...state, error: "Choose a size to add this to your cart." };
    default:
      return state;
  }
}
