import { SORT_OPTIONS } from "../../api/shopApi";

const GENDERS = [
  { value: "all", label: "Everyone" },
  { value: "men", label: "Men" },
  { value: "women", label: "Women" },
  { value: "unisex", label: "Unisex" },
];

/** Controlled inputs: search (text), sort and fit (selects), stock (checkbox). */
export default function ProductFilters({ filters, onChange }) {
  const set = (name) => (event) => {
    const { type, checked, value } = event.target;
    onChange({ ...filters, [name]: type === "checkbox" ? checked : value });
  };

  return (
    <form
      className="panel mb-5 grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-[1fr_auto_auto_auto]"
      role="search"
      onSubmit={(event) => event.preventDefault()}
    >
      <div>
        <label htmlFor="search" className="field-label">
          Search
        </label>
        <input
          id="search"
          type="search"
          className="input"
          placeholder="Hoodie, denim, cap..."
          value={filters.search}
          onChange={set("search")}
        />
      </div>

      <div>
        <label htmlFor="sort" className="field-label">
          Sort by
        </label>
        <select id="sort" className="input" value={filters.sort} onChange={set("sort")}>
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="gender" className="field-label">
          Fit
        </label>
        <select id="gender" className="input" value={filters.gender} onChange={set("gender")}>
          {GENDERS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <label className="flex items-center gap-2 self-end pb-2.5 text-sm font-semibold">
        <input type="checkbox" className="size-4 accent-[var(--accent)]" checked={filters.inStockOnly} onChange={set("inStockOnly")} />
        In stock only
      </label>
    </form>
  );
}
