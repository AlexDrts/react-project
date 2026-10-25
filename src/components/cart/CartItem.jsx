import { Link } from "react-router-dom";
import { formatMoney } from "../../models";
import { MAX_QTY } from "../../store/cartSlice";

/** One line in the cart. */
export default function CartItem({ line, onChangeQty, onRemove }) {
  const [from, to] = line.colors;

  return (
    <li className="panel flex gap-4 p-3 sm:p-4">
      <Link
        to={`/product/${line.productId}`}
        className="grid size-20 shrink-0 place-items-center rounded-xl text-3xl sm:size-24"
        style={{ background: `linear-gradient(155deg, ${from}, ${to})` }}
        aria-label={`Open ${line.name}`}
      >
        <span aria-hidden="true">{line.icon}</span>
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate font-bold">
              <Link to={`/product/${line.productId}`} className="hover:text-accent">
                {line.name}
              </Link>
            </h3>
            <p className="text-sm text-muted">{line.size ? `Size ${line.size}` : "One size"} · {formatMoney(line.price)}</p>
          </div>
          <p className="font-bold">{formatMoney(line.price * line.qty)}</p>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="inline-flex items-center rounded-lg border border-line">
            <button
              type="button"
              className="px-3 py-1.5 disabled:opacity-40"
              aria-label={`Decrease quantity of ${line.name}`}
              disabled={line.qty <= 1}
              onClick={() => onChangeQty(line.key, line.qty - 1)}
            >
              −
            </button>
            <span className="min-w-8 text-center text-sm font-semibold">{line.qty}</span>
            <button
              type="button"
              className="px-3 py-1.5 disabled:opacity-40"
              aria-label={`Increase quantity of ${line.name}`}
              disabled={line.qty >= MAX_QTY}
              onClick={() => onChangeQty(line.key, line.qty + 1)}
            >
              +
            </button>
          </div>

          <button type="button" className="text-sm text-muted underline hover:text-danger" onClick={() => onRemove(line.key)}>
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}
