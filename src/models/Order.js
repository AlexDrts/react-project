import { Cart } from "./Cart";

export class Order {
  constructor({ customer, items, deliveryMethod, paymentMethod, giftWrap = false, subscribe = false, comment = "" }) {
    this.customer = customer;
    this.items = items;
    this.deliveryMethod = deliveryMethod;
    this.paymentMethod = paymentMethod;
    this.giftWrap = giftWrap;
    this.subscribe = subscribe;
    this.comment = comment;
    this.status = "new";
    this.createdAt = new Date().toISOString();
  }

  get cart() {
    return new Cart(this.items);
  }

  get total() {
    return this.cart.total;
  }

  /** What we POST to /orders. */
  toPayload() {
    return {
      customer: this.customer,
      items: this.items,
      deliveryMethod: this.deliveryMethod,
      paymentMethod: this.paymentMethod,
      giftWrap: this.giftWrap,
      subscribe: this.subscribe,
      comment: this.comment,
      total: this.total,
      status: this.status,
      createdAt: this.createdAt,
    };
  }
}
