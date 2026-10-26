import { describe, expect, it } from "vitest";
import reducer, { MAX_QTY, addItem, changeQty, clearCart, removeItem } from "./cartSlice";

const item = { productId: 1, name: "Hoodie", price: 40, size: "M" };

describe("cartSlice", () => {
  it("adds a new line", () => {
    const state = reducer({ items: [] }, addItem(item));

    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toMatchObject({ key: "1:M", qty: 1 });
  });

  it("merges the same product and size into one line", () => {
    let state = reducer({ items: [] }, addItem(item));
    state = reducer(state, addItem(item));

    expect(state.items).toHaveLength(1);
    expect(state.items[0].qty).toBe(2);
  });

  it("keeps different sizes as separate lines", () => {
    let state = reducer({ items: [] }, addItem(item));
    state = reducer(state, addItem({ ...item, size: "L" }));

    expect(state.items).toHaveLength(2);
  });

  it("limits the quantity of one line", () => {
    const state = reducer({ items: [] }, addItem({ ...item, qty: 99 }));

    expect(state.items[0].qty).toBe(MAX_QTY);
  });

  it("changes the quantity within 1 and the maximum", () => {
    let state = reducer({ items: [] }, addItem(item));
    state = reducer(state, changeQty({ key: "1:M", qty: 0 }));
    expect(state.items[0].qty).toBe(1);

    state = reducer(state, changeQty({ key: "1:M", qty: 50 }));
    expect(state.items[0].qty).toBe(MAX_QTY);
  });

  it("removes a line and clears the cart", () => {
    let state = reducer({ items: [] }, addItem(item));
    state = reducer(state, addItem({ ...item, size: "L" }));
    state = reducer(state, removeItem("1:M"));
    expect(state.items.map((line) => line.key)).toEqual(["1:L"]);

    state = reducer(state, clearCart());
    expect(state.items).toEqual([]);
  });
});
