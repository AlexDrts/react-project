import { useEffect, useReducer, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addItem } from "../../store/cartSlice";
import Badge from "../ui/Badge";
import DetailList from "./DetailList";
import ProductImage from "./ProductImage";
import SizePicker from "./SizePicker";
import { initialSelection, selectionReducer } from "./selectionReducer";

export default function ProductDetails({ product }) {
  const dispatch = useDispatch();
  const [selection, dispatchSelection] = useReducer(selectionReducer, initialSelection);
  const [added, setAdded] = useState(false);
  const sizesRef = useRef(null);

  useEffect(() => {
    if (!added) return undefined;
    const timer = setTimeout(() => setAdded(false), 4000);
    return () => clearTimeout(timer);
  }, [added]);

  const handleAdd = () => {
    if (product.needsSize && !selection.size) {
      dispatchSelection({ type: "size_missing" });
      sizesRef.current?.focus(); // bring the shopper's eyes (and keyboard) to the missing choice
      return;
    }

    dispatch(
      addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        size: selection.size,
        colors: product.colors,
        icon: product.icon,
        qty: selection.qty,
      }),
    );
    setAdded(true);
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <ProductImage product={product} className="aspect-square rounded-2xl md:sticky md:top-24 md:self-start" />

      <div>
        <p className="text-sm text-muted">
          <Link to={`/category/${product.categoryId}`} className="hover:text-accent">
            ← Back to {product.categoryId.replace("-", " ")}
          </Link>
        </p>

        <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">{product.name}</h1>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span className="text-2xl font-bold">{product.formatPrice()}</span>
          {product.isOnSale && (
            <>
              <s className="text-muted">{product.formatOldPrice()}</s>
              <Badge $variant="sale">-{product.discountPercent}%</Badge>
            </>
          )}
          <span className="text-sm text-muted">★ {product.rating.toFixed(1)}</span>
          {product.inStock ? <Badge $variant="ok">In stock</Badge> : <Badge $variant="danger">Sold out</Badge>}
        </div>

        <p className="mt-5 max-w-prose text-muted">{product.description}</p>

        {product.inStock && (
          <div className="mt-6 space-y-5">
            {product.needsSize && (
              <div>
                <p className="field-label">Size</p>
                <SizePicker
                  ref={sizesRef}
                  sizes={product.sizes}
                  selected={selection.size}
                  onSelect={(size) => dispatchSelection({ type: "pick_size", size })}
                />
                {selection.error && (
                  <p role="alert" className="field-error">
                    {selection.error}
                  </p>
                )}
              </div>
            )}

            <div>
              <p className="field-label">Quantity</p>
              <div className="inline-flex items-center rounded-lg border border-line">
                <button type="button" className="px-3 py-2" aria-label="Decrease quantity" onClick={() => dispatchSelection({ type: "qty_down" })}>
                  −
                </button>
                <span className="min-w-8 text-center font-semibold" aria-live="polite">
                  {selection.qty}
                </span>
                <button type="button" className="px-3 py-2" aria-label="Increase quantity" onClick={() => dispatchSelection({ type: "qty_up" })}>
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button type="button" className="btn btn-primary" onClick={handleAdd}>
                Add to cart
              </button>
              {added && (
                <p role="status" className="text-sm">
                  Added.{" "}
                  <Link to="/cart" className="font-semibold text-accent underline">
                    View cart
                  </Link>
                </p>
              )}
            </div>
          </div>
        )}

        <div className="panel mt-8 px-4 py-2">
          <DetailList details={product.getDetails()} />
        </div>
      </div>
    </div>
  );
}
