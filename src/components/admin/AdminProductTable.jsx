import AdminProductRow from "./AdminProductRow";

export default function AdminProductTable({ products, categoriesById, onEdit, onDelete, busy }) {
  return (
    <div className="panel overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="text-muted">
          <tr>
            <th className="px-3 py-2.5 font-semibold">Name</th>
            <th className="px-3 py-2.5 font-semibold">Category</th>
            <th className="px-3 py-2.5 font-semibold">Price</th>
            <th className="px-3 py-2.5 font-semibold">Stock</th>
            <th className="px-3 py-2.5">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <AdminProductRow
              key={product.id}
              product={product}
              categoryName={categoriesById[product.categoryId] ?? product.categoryId}
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
