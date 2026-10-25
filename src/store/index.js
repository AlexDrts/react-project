import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { CART_STORAGE_KEY } from "./cartSlice";
import userReducer, { USER_STORAGE_KEY } from "./userSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
});

// Persist the cart and the signed-in user in localStorage.
let lastCart = store.getState().cart.items;
let lastUser = store.getState().user.current;

store.subscribe(() => {
  const { cart, user } = store.getState();
  try {
    if (cart.items !== lastCart) {
      lastCart = cart.items;
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart.items));
    }
    if (user.current !== lastUser) {
      lastUser = user.current;
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user.current));
    }
  } catch {
    // Storage can be full or blocked (private mode). The app keeps working without it.
  }
});
