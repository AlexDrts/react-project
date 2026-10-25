import { createSlice } from "@reduxjs/toolkit";
import { Cart } from "../models";

export const CART_STORAGE_KEY = "afterglow.cart";

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

const MAX_QTY = 10;

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: loadCart() },
  reducers: {
    // payload: { productId, name, price, size, colors, icon, qty? }
    addItem(state, { payload }) {
      const key = Cart.lineKey(payload.productId, payload.size);
      const existing = state.items.find((line) => line.key === key);
      const qty = payload.qty ?? 1;
      if (existing) {
        existing.qty = Math.min(MAX_QTY, existing.qty + qty);
      } else {
        state.items.push({ ...payload, key, qty: Math.min(MAX_QTY, qty) });
      }
    },
    changeQty(state, { payload: { key, qty } }) {
      const line = state.items.find((item) => item.key === key);
      if (!line) return;
      line.qty = Math.min(MAX_QTY, Math.max(1, qty));
    },
    removeItem(state, { payload: key }) {
      state.items = state.items.filter((line) => line.key !== key);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addItem, changeQty, removeItem, clearCart } = cartSlice.actions;
export { MAX_QTY };
export default cartSlice.reducer;
