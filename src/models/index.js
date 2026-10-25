import { Product } from "./Product";
import { ClothingProduct } from "./ClothingProduct";
import { FootwearProduct } from "./FootwearProduct";
import { Category } from "./Category";

export { Product, ClothingProduct, FootwearProduct, Category };
export { Cart, FREE_SHIPPING_FROM, SHIPPING_PRICE } from "./Cart";
export { Order } from "./Order";
export { formatMoney, slugify } from "./format";

/** Turns a raw server object into the right Product subclass. */
export function productFromApi(raw) {
  switch (raw.type) {
    case "clothing":
      return new ClothingProduct(raw);
    case "footwear":
      return new FootwearProduct(raw);
    default:
      return new Product(raw);
  }
}

export function categoryFromApi(raw) {
  return new Category(raw);
}
