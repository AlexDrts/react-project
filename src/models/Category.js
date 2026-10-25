export class Category {
  constructor({ id, name, icon = "🏷️" }) {
    this.id = id;
    this.name = name;
    this.icon = icon;
  }

  get path() {
    return `/category/${this.id}`;
  }

  toPlain() {
    return { ...this };
  }
}
