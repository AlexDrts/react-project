import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addItem } from "../../store/cartSlice";
import Badge from "../ui/Badge";
import ProductImage from "./ProductImage";

/** One product tile in the grid. */
export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const [justAdded, setJustAdded] = useState(false);

  // Flip the button back after a moment; clear the timer if the card unmounts first.
  useEffect(() => {
    if (!justAdded) return undefined;
    const timer = setTimeout(() => setJustAdded(false), 1400);
    return () => clearTimeout(timer);
  }, [justAdded]);

  const quickAdd = () => {
    dispatch(
      addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        size: product.needsSize ? product.sizes[Math.floor(product.sizes.length / 2)] : null,
        colors: product.colors,
        icon: product.icon,
      }),
    );
    setJustAdded(true);
  };

  return (
    <article className="panel group flex flex-col overflow-hidden transition-colors hover:border-accent">
      <Link to={`/products/${product.id}`} className="relative block" aria-label={product.name}>
        <ProductImage product={product} className="aspect-[4/5] transition-transform duration-500 group-hover:scale-[1.03]" />
        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {product.isOnSale && <Badge $variant="sale">-{product.discountPercent}%</Badge>}
          {!product.inStock && <Badge $variant="muted">Sold out</Badge>}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-bold leading-snug">
            <Link to={`/products/${product.id}`} className="hover:text-accent">
              {product.name}
            </Link>
          </h3>
          <span className="shrink-0 text-sm text-muted" title="Rating">
            ★ {product.rating.toFixed(1)}
          </span>
        </div>

        <p className="flex items-baseline gap-2">
          <span className="text-lg font-bold">{product.formatPrice()}</span>
          {product.isOnSale && <s className="text-sm text-muted">{product.formatOldPrice()}</s>}
        </p>

        <button
          type="button"
          className="btn btn-primary mt-auto"
          onClick={quickAdd}
          disabled={!product.inStock}
          aria-live="polite"
        >
          {!product.inStock ? "Sold out" : justAdded ? "Added to cart" : "Add to cart"}
        </button>
      </div>
    </article>
  );
}
