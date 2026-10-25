import { formatMoney } from "./format";

export const FREE_SHIPPING_FROM = 100;
export const SHIPPING_PRICE = 8;

/**
 * Read-only view over the cart lines stored in Redux.
 * Redux keeps plain serializable data; this class does the maths.
 */
export class Cart {
  constructor(items = []) {
    this.items = items;
  }

  static lineKey(productId, size) {
    return `${productId}:${size ?? "one-size"}`;
  }

  get isEmpty() {
    return this.items.length === 0;
  }

  get totalQty() {
    return this.items.reduce((sum, line) => sum + line.qty, 0);
  }

  get subtotal() {
    return this.items.reduce((sum, line) => sum + line.price * line.qty, 0);
  }

  get shipping() {
    if (this.isEmpty || this.subtotal >= FREE_SHIPPING_FROM) return 0;
    return SHIPPING_PRICE;
  }

  get total() {
    return this.subtotal + this.shipping;
  }

  get amountToFreeShipping() {
    return Math.max(0, FREE_SHIPPING_FROM - this.subtotal);
  }

  lineTotal(line) {
    return line.price * line.qty;
  }

  format(value) {
    return formatMoney(value);
  }
}
