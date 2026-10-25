import ConfirmButton from "../ui/ConfirmButton";

export default function AdminCategoryRow({ category, productCount, onEdit, onDelete, busy }) {
  return (
    <tr className="border-t border-line">
      <td className="px-3 py-2.5 text-xl" aria-hidden="true">
        {category.icon}
      </td>
      <td className="px-3 py-2.5 font-semibold">{category.name}</td>
      <td className="px-3 py-2.5 text-muted">{category.id}</td>
      <td className="px-3 py-2.5 text-muted">{productCount}</td>
      <td className="px-3 py-2.5">
        <div className="flex justify-end gap-2">
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => onEdit(category)} disabled={busy}>
            Edit
          </button>
          {/* A category that still has products can't be deleted: they would become unreachable. */}
          <ConfirmButton onConfirm={() => onDelete(category)} disabled={busy || productCount > 0} />
        </div>
      </td>
    </tr>
  );
}
