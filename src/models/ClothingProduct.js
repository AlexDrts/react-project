import { Product } from "./Product";

// Same icons as the categories in db.json; unknown (admin-made) categories fall back to a T-shirt.
const CATEGORY_ICONS = { "t-shirts": "👕", hoodies: "🧶", jackets: "🧥", jeans: "👖" };

export class ClothingProduct extends Product {
  constructor(data) {
    super({ ...data, type: "clothing" });
  }

  get icon() {
    return CATEGORY_ICONS[this.categoryId] ?? "👕";
  }

  getDetails() {
    return [
      ...super.getDetails(),
      { label: "Sizes", value: this.sizes.join(", ") || "One size" },
    ];
  }
}
