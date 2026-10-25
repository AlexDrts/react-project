import { useMemo, useState } from "react";
import { useCurrentCategory } from "../../context/CategoryContext";
import { useCategories } from "../../hooks/useShopQueries";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import CategoryList from "../categories/CategoryList";
import ErrorMessage from "../ui/ErrorMessage";
import ProductFilters from "./ProductFilters";
import ProductGrid from "./ProductGrid";

const DEFAULT_FILTERS = { search: "", sort: "featured", gender: "all", inStockOnly: false };

/** Category menu + filters + product grid. Used by the home page and the category page. */
export default function ShopSection({ categoryId }) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const debouncedSearch = useDebouncedValue(filters.search);
  const { currentCategory } = useCurrentCategory();
  const categories = useCategories();

  const queryFilters = useMemo(
    () => ({
      categoryId,
      search: debouncedSearch.trim(),
      sort: filters.sort,
      gender: filters.gender,
      inStockOnly: filters.inStockOnly,
    }),
    [categoryId, debouncedSearch, filters.sort, filters.gender, filters.inStockOnly],
  );

  return (
    <section id="catalog" className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[14rem_minmax(0,1fr)]">
      <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
        <h2 className="mb-3 text-lg font-bold">Categories</h2>
        {categories.isPending && <div className="skeleton h-10 rounded-xl" />}
        {categories.isError && <ErrorMessage title="Categories unavailable" error={categories.error} onRetry={categories.refetch} />}
        {categories.data && <CategoryList categories={categories.data} />}
      </aside>

      <div>
        <h2 className="mb-4 text-2xl font-extrabold">{currentCategory ? currentCategory.name : "All products"}</h2>
        <ProductFilters filters={filters} onChange={setFilters} />
        <ProductGrid filters={queryFilters} />
      </div>
    </section>
  );
}
