import { useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeProduct } from "../../api/shopApi";
import { useConfirm } from "../../hooks/useConfirm";
import { useAllProducts, useCategories } from "../../hooks/useShopQueries";
import ConfirmDialog from "../ui/ConfirmDialog";
import EmptyState from "../ui/EmptyState";
import ErrorMessage from "../ui/ErrorMessage";
import Loader from "../ui/Loader";
import AdminProductTable from "./AdminProductTable";
import ProductForm from "./ProductForm";

export default function AdminProducts({ editor, dispatch }) {
  const queryClient = useQueryClient();
  const products = useAllProducts();
  const categories = useCategories();
  const confirmDelete = useConfirm();

  const deleteMutation = useMutation({
    mutationFn: (product) => removeProduct(product.id),
    onSuccess: (_data, product) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      dispatch({ type: "notify", text: `Deleted “${product.name}”.` });
    },
    onError: (error) => dispatch({ type: "notify", noticeType: "error", text: error.message }),
  });

  const categoriesById = useMemo(
    () => Object.fromEntries((categories.data ?? []).map((category) => [category.id, category.name])),
    [categories.data],
  );

  if (products.isPending || categories.isPending) return <Loader label="Loading products..." />;
  if (products.isError) return <ErrorMessage title="Can't load products" error={products.error} onRetry={products.refetch} />;
  if (categories.isError) return <ErrorMessage title="Can't load categories" error={categories.error} onRetry={categories.refetch} />;

  const editing = editor?.kind === "product" ? editor : null;

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted">{products.data.length} products</p>
        <button type="button" className="btn btn-primary" onClick={() => dispatch({ type: "open_editor", kind: "product" })}>
          Add product
        </button>
      </div>

      {products.data.length === 0 ? (
        <EmptyState icon="📦" title="No products yet" text="Add the first product to fill the shop." />
      ) : (
        <AdminProductTable
          products={products.data}
          categoriesById={categoriesById}
          busy={deleteMutation.isPending}
          onEdit={(product) => dispatch({ type: "open_editor", kind: "product", item: product })}
          onDelete={confirmDelete.ask}
        />
      )}

      <ConfirmDialog
        open={confirmDelete.open}
        title={`Delete ${confirmDelete.target?.name ?? "this product"}?`}
        description="The product disappears from the shop right away. This can't be undone."
        confirmLabel="Delete product"
        onClose={confirmDelete.close}
        onConfirm={() => {
          deleteMutation.mutate(confirmDelete.target);
          confirmDelete.close();
        }}
      />

      {editing && (
        <ProductForm
          // `key` makes React build a fresh form when switching between "add" and "edit"
          key={editing.item?.id ?? "new"}
          product={editing.item}
          categories={categories.data}
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
