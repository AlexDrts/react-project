import { FREE_SHIPPING_FROM } from "../../models";

export default function CartSummary({ cart, children }) {
  const progress = Math.min(100, (cart.subtotal / FREE_SHIPPING_FROM) * 100);

  return (
    <aside className="panel p-5 lg:sticky lg:top-24" aria-label="Order summary">
      <h2 className="text-lg font-bold">Order summary</h2>

      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted">Items ({cart.totalQty})</dt>
          <dd>{cart.format(cart.subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted">Shipping</dt>
          <dd>{cart.shipping === 0 ? "Free" : cart.format(cart.shipping)}</dd>
        </div>
        <div className="flex justify-between border-t border-line pt-3 text-base font-bold">
          <dt>Total</dt>
          <dd>{cart.format(cart.total)}</dd>
        </div>
      </dl>

      {cart.amountToFreeShipping > 0 ? (
        <div className="mt-4">
          <p className="text-xs text-muted">Add {cart.format(cart.amountToFreeShipping)} more for free shipping.</p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-2">
            <div className="h-full rounded-full bg-accent transition-[width]" style={{ width: `${progress}%` }} />
          </div>
        </div>
      ) : (
        <p className="mt-4 text-xs font-semibold text-ok">You've unlocked free shipping.</p>
      )}

      {children && <div className="mt-5 flex flex-col gap-2">{children}</div>}
    </aside>
  );
}
