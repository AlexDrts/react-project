import AdminCategoryRow from "./AdminCategoryRow";

export default function AdminCategoryTable({ categories, counts, onEdit, onDelete, busy }) {
  return (
    <div className="panel overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="text-muted">
          <tr>
            <th className="px-3 py-2.5">
              <span className="sr-only">Icon</span>
            </th>
            <th className="px-3 py-2.5 font-semibold">Name</th>
            <th className="px-3 py-2.5 font-semibold">URL id</th>
            <th className="px-3 py-2.5 font-semibold">Products</th>
            <th className="px-3 py-2.5">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <AdminCategoryRow
              key={category.id}
              category={category}
              productCount={counts[category.id] ?? 0}
              onEdit={onEdit}
              onDelete={onDelete}
              busy={busy}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
