import { useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeCategory } from "../../api/shopApi";
import { useConfirm } from "../../hooks/useConfirm";
import { useAllProducts, useCategories } from "../../hooks/useShopQueries";
import ConfirmDialog from "../ui/ConfirmDialog";
import EmptyState from "../ui/EmptyState";
import ErrorMessage from "../ui/ErrorMessage";
import Loader from "../ui/Loader";
import AdminCategoryTable from "./AdminCategoryTable";
import CategoryForm from "./CategoryForm";

export default function AdminCategories({ editor, dispatch }) {
  const queryClient = useQueryClient();
  const categories = useCategories();
  const products = useAllProducts();
  const confirmDelete = useConfirm();

  const deleteMutation = useMutation({
    mutationFn: (category) => removeCategory(category.id),
    onSuccess: (_data, category) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      dispatch({ type: "notify", text: `Deleted category “${category.name}”.` });
    },
    onError: (error) => dispatch({ type: "notify", noticeType: "error", text: error.message }),
  });

  const counts = useMemo(() => {
    const result = {};
    for (const product of products.data ?? []) result[product.categoryId] = (result[product.categoryId] ?? 0) + 1;
    return result;
  }, [products.data]);

  if (categories.isPending || products.isPending) return <Loader label="Loading categories..." />;
  if (categories.isError) return <ErrorMessage title="Can't load categories" error={categories.error} onRetry={categories.refetch} />;
  if (products.isError) return <ErrorMessage title="Can't load products" error={products.error} onRetry={products.refetch} />;

  const editing = editor?.kind === "category" ? editor : null;

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted">{categories.data.length} categories. Empty categories can be deleted.</p>
        <button type="button" className="btn btn-primary" onClick={() => dispatch({ type: "open_editor", kind: "category" })}>
          Add category
        </button>
      </div>

      {categories.data.length === 0 ? (
        <EmptyState icon="🏷️" title="No categories yet" text="Add a category, then put products into it." />
      ) : (
        <AdminCategoryTable
          categories={categories.data}
          counts={counts}
          busy={deleteMutation.isPending}
          onEdit={(category) => dispatch({ type: "open_editor", kind: "category", item: category })}
          onDelete={confirmDelete.ask}
        />
      )}

      <ConfirmDialog
        open={confirmDelete.open}
        title={`Delete the ${confirmDelete.target?.name ?? ""} category?`}
        description="Only empty categories can be deleted, so no products are affected."
        confirmLabel="Delete category"
        onClose={confirmDelete.close}
        onConfirm={() => {
          deleteMutation.mutate(confirmDelete.target);
          confirmDelete.close();
        }}
      />

      {editing && (
        <CategoryForm
          key={editing.item?.id ?? "new"}
          category={editing.item}
          existingIds={categories.data.map((category) => category.id)}
          onClose={() => dispatch({ type: "close_editor" })}
          onSaved={(text) => {
            dispatch({ type: "close_editor" });
            dispatch({ type: "notify", text });
          }}
        />
      )}
    </>
  );
}
