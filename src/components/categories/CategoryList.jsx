import { Category } from "../../models";
import CategoryItem from "./CategoryItem";

const ALL_PRODUCTS = new Category({ id: "all", name: "All products", icon: "✨" });

/** Side menu with categories. Scrolls sideways on phones, stacks on desktop. */
export default function CategoryList({ categories }) {
  return (
    <nav aria-label="Categories">
      <ul className="flex gap-1 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
        <CategoryItem category={ALL_PRODUCTS} to="/" end />
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </ul>
    </nav>
  );
}
