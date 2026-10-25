import { formatMoney } from "./format";

const GENDER_LABELS = { men: "Men", women: "Women", unisex: "Unisex" };

/**
 * Base product. Subclasses (ClothingProduct, FootwearProduct) override
 * `icon` and `getDetails()` — the UI just calls them and gets the right
 * behaviour for each kind of product (polymorphism).
 */
export class Product {
  constructor({
    id,
    name,
    price,
    oldPrice = null,
    categoryId,
    description = "",
    rating = 0,
    inStock = true,
    gender = "unisex",
    colors = ["#ff4fa3", "#7b2cbf"],
    sizes = [],
    type = "accessory",
    material = "",
  }) {
    this.id = id;
    this.name = name;
    this.price = Number(price);
    this.oldPrice = oldPrice === null || oldPrice === "" ? null : Number(oldPrice);
    this.categoryId = categoryId;
    this.description = description;
    this.rating = Number(rating);
    this.inStock = Boolean(inStock);
    this.gender = gender;
    this.colors = colors;
    this.sizes = sizes;
    this.type = type;
    this.material = material;
  }

  get icon() {
    return "🧢";
  }

  get isOnSale() {
    return this.oldPrice !== null && this.oldPrice > this.price;
  }

  get discountPercent() {
    return this.isOnSale ? Math.round((1 - this.price / this.oldPrice) * 100) : 0;
  }

  get genderLabel() {
    return GENDER_LABELS[this.gender] ?? "Unisex";
  }

  get needsSize() {
    return this.sizes.length > 0;
  }

  formatPrice() {
    return formatMoney(this.price);
  }

  formatOldPrice() {
    return this.oldPrice === null ? "" : formatMoney(this.oldPrice);
  }

  matches(query) {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return `${this.name} ${this.description}`.toLowerCase().includes(q);
  }

  /** Rows for the "Details" list on the product page. Subclasses add their own. */
  getDetails() {
    const details = [{ label: "Fit", value: this.genderLabel }];
    if (this.material) details.push({ label: "Material", value: this.material });
    return details;
  }

  /** Plain object for sending to the server (getters are not included). */
  toPlain() {
    return { ...this };
  }
}
