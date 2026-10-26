import { describe, expect, it } from "vitest";
import { Cart, FREE_SHIPPING_FROM, SHIPPING_PRICE } from "./Cart";

const hoodie = { key: "1:M", productId: 1, name: "Hoodie", size: "M", price: 40, qty: 2 };
const cap = { key: "2:one-size", productId: 2, name: "Cap", size: null, price: 15, qty: 1 };

describe("Cart", () => {
  it("is empty and costs nothing without items", () => {
    const cart = new Cart();

    expect(cart.isEmpty).toBe(true);
    expect(cart.totalQty).toBe(0);
    expect(cart.shipping).toBe(0);
    expect(cart.total).toBe(0);
  });

  it("sums quantity and subtotal over all lines", () => {
    const cart = new Cart([hoodie, cap]);

    expect(cart.totalQty).toBe(3);
    expect(cart.subtotal).toBe(95);
  });

  it("adds shipping below the free shipping threshold", () => {
    const cart = new Cart([hoodie, cap]);

    expect(cart.shipping).toBe(SHIPPING_PRICE);
    expect(cart.total).toBe(95 + SHIPPING_PRICE);
    expect(cart.amountToFreeShipping).toBe(FREE_SHIPPING_FROM - 95);
  });

  it("ships for free from the threshold", () => {
    const cart = new Cart([{ ...hoodie, qty: 3 }]);

    expect(cart.subtotal).toBe(120);
    expect(cart.shipping).toBe(0);
    expect(cart.total).toBe(120);
    expect(cart.amountToFreeShipping).toBe(0);
  });

  it("builds a line key from the product id and size", () => {
    expect(Cart.lineKey(5, "L")).toBe("5:L");
    expect(Cart.lineKey(5, null)).toBe("5:one-size");
  });
});
