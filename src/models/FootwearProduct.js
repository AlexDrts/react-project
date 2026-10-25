import { Product } from "./Product";

export class FootwearProduct extends Product {
  constructor(data) {
    super({ ...data, type: "footwear" });
    this.sole = data.sole ?? "";
  }

  get icon() {
    return "👟";
  }

  getDetails() {
    const details = [
      ...super.getDetails(),
      { label: "Sizes (EU)", value: this.sizes.join(", ") || "—" },
    ];
    if (this.sole) details.push({ label: "Sole", value: this.sole });
    return details;
  }
}
