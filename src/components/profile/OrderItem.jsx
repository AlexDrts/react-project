import { Link } from "react-router-dom";
import { formatMoney } from "../../models";
import OrderStatus from "./OrderStatus";

export default function OrderItem({ order }) {
  const units = order.items.reduce((sum, line) => sum + line.qty, 0);

  return (
    <li>
      <Link to={`/profile/orders/${order.id}`} className="panel flex items-center justify-between gap-4 p-4 transition-colors hover:border-accent">
        <div className="min-w-0">
          <p className="font-bold">Order #{order.id}</p>
          <p className="text-sm text-muted">
            {new Date(order.createdAt).toLocaleDateString("en-US", { dateStyle: "medium" })} · {units} {units === 1 ? "item" : "items"}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <OrderStatus status={order.status} />
          <span className="font-bold">{formatMoney(order.total)}</span>
        </div>
      </Link>
    </li>
  );
}
