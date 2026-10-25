import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveProduct } from "../../api/shopApi";
import { productFromApi } from "../../models";
import Modal from "../ui/Modal";

const TYPES = [
  { value: "clothing", label: "Clothing" },
  { value: "footwear", label: "Footwear" },
  { value: "accessory", label: "Accessory" },
];
const GENDERS = ["unisex", "men", "women"];

function parseSizes(text) {
  return text
    .split(",")
    .map((size) => size.trim())
    .filter(Boolean);
}

/** Create / edit a product in a modal. `product` is null when creating. */
export default function ProductForm({ product, categories, onClose, onSaved }) {
  const queryClient = useQueryClient();
  const isNew = !product;

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: product?.name ?? "",
      categoryId: product?.categoryId ?? categories[0]?.id ?? "",
      type: product?.type ?? "clothing",
      gender: product?.gender ?? "unisex",
      price: product?.price ?? "",
      oldPrice: product?.oldPrice ?? "",
      sizes: product?.sizes.join(", ") ?? "XS, S, M, L, XL",
      material: product?.material ?? "",
      description: product?.description ?? "",
      color1: product?.colors[0] ?? "#ff4fa3",
      color2: product?.colors[1] ?? "#7b2cbf",
      inStock: product?.inStock ?? true,
    },
    mode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: saveProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });

  const onSubmit = async (data) => {
    // The model classes normalise the data (numbers, defaults) and drop anything that isn't a field.
    const payload = productFromApi({
      ...(product ? product.toPlain() : { rating: 4.5 }),
      name: data.name.trim(),
      categoryId: data.categoryId,
      type: data.type,
      gender: data.gender,
      price: data.price,
      oldPrice: data.oldPrice === "" ? null : data.oldPrice,
      sizes: parseSizes(data.sizes),
      material: data.material.trim(),
      description: data.description.trim(),
      colors: [data.color1, data.color2],
      inStock: data.inStock,
    }).toPlain();

    try {
      await mutation.mutateAsync(payload);
      onSaved(isNew ? `Added “${payload.name}”.` : `Saved “${payload.name}”.`);
    } catch {
      // the error is shown below through mutation.error
    }
  };

  return (
    <Modal title={isNew ? "Add product" : `Edit ${product.name}`} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div>
          <label htmlFor="p-name" className="field-label">
            Name
          </label>
          <input
            id="p-name"
            className="input"
            aria-invalid={Boolean(errors.name)}
            {...register("name", { required: "Enter a product name", minLength: { value: 3, message: "Use at least 3 characters" } })}
          />
          {errors.name && <span className="field-error">{errors.name.message}</span>}
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="p-category" className="field-label">
              Category
            </label>
            <select id="p-category" className="input" {...register("categoryId", { required: "Choose a category" })}>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="p-type" className="field-label">
              Type
            </label>
            <select id="p-type" className="input" {...register("type")}>
              {TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="p-gender" className="field-label">
              Fit
            </label>
            <select id="p-gender" className="input" {...register("gender")}>
              {GENDERS.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="p-price" className="field-label">
              Price (USD)
            </label>
            <input
              id="p-price"
              type="number"
              step="0.01"
              className="input"
              aria-invalid={Boolean(errors.price)}
              {...register("price", { required: "Enter a price", min: { value: 1, message: "Price must be at least 1" } })}
            />
            {errors.price && <span className="field-error">{errors.price.message}</span>}
          </div>
          <div>
            <label htmlFor="p-old-price" className="field-label">
              Old price (optional)
            </label>
            <input
              id="p-old-price"
              type="number"
              step="0.01"
              className="input"
              aria-invalid={Boolean(errors.oldPrice)}
              {...register("oldPrice", {
                validate: (value) => value === "" || Number(value) > Number(getValues("price")) || "Old price must be higher than the price",
              })}
            />
            {errors.oldPrice && <span className="field-error">{errors.oldPrice.message}</span>}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="p-sizes" className="field-label">
              Sizes (comma separated)
            </label>
            <input id="p-sizes" className="input" placeholder="S, M, L" {...register("sizes")} />
          </div>
          <div>
            <label htmlFor="p-material" className="field-label">
              Material
            </label>
            <input id="p-material" className="input" {...register("material")} />
          </div>
        </div>

        <div>
          <label htmlFor="p-description" className="field-label">
            Description
          </label>
          <textarea id="p-description" rows={3} className="input" {...register("description")} />
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <label className="flex items-center gap-2 text-sm font-semibold">
            Colour 1
            <input type="color" {...register("color1")} />
          </label>
          <label className="flex items-center gap-2 text-sm font-semibold">
            Colour 2
            <input type="color" {...register("color2")} />
          </label>
          <label className="flex items-center gap-2 text-sm font-semibold">
            <input type="checkbox" className="size-4 accent-[var(--accent)]" {...register("inStock")} />
            In stock
          </label>
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
            {isSubmitting ? "Saving..." : isNew ? "Add product" : "Save changes"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
