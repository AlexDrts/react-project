/** Placeholder picture: a two-colour gradient with the product's icon (the subclass decides which). */
export default function ProductImage({ product, className = "" }) {
  const [from, to] = product.colors;

  return (
    <div
      className={`relative grid place-items-center overflow-hidden ${className}`}
      style={{ background: `linear-gradient(155deg, ${from}, ${to})` }}
      role="img"
      aria-label={product.name}
    >
      <span className="text-6xl drop-shadow-lg" aria-hidden="true">
        {product.icon}
      </span>
    </div>
  );
}
