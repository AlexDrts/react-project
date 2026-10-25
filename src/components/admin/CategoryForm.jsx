import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveCategory } from "../../api/shopApi";
import { Category, slugify } from "../../models";
import Modal from "../ui/Modal";

/** Create / edit a category. The URL id is generated from the name and can't change afterwards. */
export default function CategoryForm({ category, existingIds, onClose, onSaved }) {
  const queryClient = useQueryClient();
  const isNew = !category;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { name: category?.name ?? "", icon: category?.icon ?? "🏷️" },
    mode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: (payload) => saveCategory(payload, { isNew }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });

  const onSubmit = async (data) => {
    const saved = new Category({ id: category?.id ?? slugify(data.name), name: data.name.trim(), icon: data.icon.trim() || "🏷️" });
    try {
      await mutation.mutateAsync(saved.toPlain());
      onSaved(isNew ? `Added category “${saved.name}”.` : `Saved category “${saved.name}”.`);
    } catch {
      // shown below through mutation.error
    }
  };

  return (
    <Modal title={isNew ? "Add category" : `Edit ${category.name}`} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div>
          <label htmlFor="c-name" className="field-label">
            Name
          </label>
          <input
            id="c-name"
            className="input"
            aria-invalid={Boolean(errors.name)}
            {...register("name", {
              required: "Enter a category name",
              minLength: { value: 3, message: "Use at least 3 characters" },
              validate: (value) => !isNew || !existingIds.includes(slugify(value)) || "A category with this name already exists",
            })}
          />
          {errors.name && <span className="field-error">{errors.name.message}</span>}
        </div>

        <div>
          <label htmlFor="c-icon" className="field-label">
            Icon (an emoji)
          </label>
          <input id="c-icon" className="input" maxLength={4} {...register("icon")} />
        </div>

        {mutation.isError && (
          <p role="alert" className="rounded-lg border border-danger px-3 py-2 text-sm text-danger">
            {mutation.error.message}
          </p>
        )}

        <div className="flex justify-end gap-3">
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : isNew ? "Add category" : "Save changes"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
