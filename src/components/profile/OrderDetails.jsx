import { Link } from "react-router-dom";
import { formatMoney } from "../../models";
import DetailList from "../products/DetailList";
import OrderLineList from "./OrderLineList";
import OrderStatus from "./OrderStatus";

export default function OrderDetails({ order }) {
  const details = [
    { label: "Placed", value: new Date(order.createdAt).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" }) },
    { label: "Delivery", value: `${order.deliveryMethod}, ${order.customer.city}` },
    { label: "Payment", value: order.paymentMethod },
  ];

  return (
    <div className="max-w-2xl">
      <Link to="/profile/orders" className="text-sm text-muted hover:text-accent">
        ← All orders
      </Link>

      <div className="mt-3 flex items-center gap-3">
        <h2 className="text-2xl font-extrabold">Order #{order.id}</h2>
        <OrderStatus status={order.status} />
      </div>

      <div className="mt-5">
        <OrderLineList lines={order.items} />
      </div>

      <p className="mt-3 flex justify-between font-bold">
        <span>Total</span>
        <span>{formatMoney(order.total)}</span>
      </p>

      <div className="panel mt-5 p-4">
        <DetailList details={details} />
      </div>
    </div>
  );
}
