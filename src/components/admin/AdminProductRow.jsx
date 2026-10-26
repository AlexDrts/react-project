import Badge from "../ui/Badge";

export default function AdminProductRow({ product, categoryName, onEdit, onDelete, busy }) {
  return (
    <tr className="border-t border-line">
      <td className="px-3 py-2.5 font-semibold">{product.name}</td>
      <td className="px-3 py-2.5 text-muted">{categoryName}</td>
      <td className="px-3 py-2.5">{product.formatPrice()}</td>
      <td className="px-3 py-2.5">{product.inStock ? <Badge $variant="ok">In stock</Badge> : <Badge $variant="danger">Sold out</Badge>}</td>
      <td className="px-3 py-2.5">
        <div className="flex justify-end gap-2">
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => onEdit(product)} disabled={busy}>
            Edit
          </button>
          <button type="button" className="btn btn-danger btn-sm" onClick={() => onDelete(product)} disabled={busy}>
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
