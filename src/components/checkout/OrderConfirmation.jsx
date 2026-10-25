import { useNavigate } from "react-router-dom";
import { Cart, formatMoney } from "../../models";
import Modal from "../ui/Modal";

/** Shown in a Portal after the server accepted the order. */
export default function OrderConfirmation({ order }) {
  const navigate = useNavigate();
  const close = () => navigate("/", { replace: true });

  return (
    <Modal title={`Order #${order.id} is on its way`} onClose={close}>
      <p className="text-sm text-muted">
        Thanks, {order.customer.fullName}. We'll send updates to {order.customer.email}.
      </p>

      <ul className="mt-4 divide-y divide-line rounded-lg border border-line text-sm">
        {order.items.map((line) => (
          <li key={line.key} className="flex justify-between gap-3 px-3 py-2">
            <span>
              {line.qty} × {line.name}
              {line.size ? ` (${line.size})` : ""}
            </span>
            <span className="font-semibold">{formatMoney(line.price * line.qty)}</span>
          </li>
        ))}
      </ul>

      <p className="mt-3 flex justify-between font-bold">
        <span>Total{new Cart(order.items).shipping === 0 ? " (free shipping)" : " (with shipping)"}</span>
        <span>{formatMoney(order.total)}</span>
      </p>
      <p className="mt-1 text-sm text-muted">
        {order.deliveryMethod} · {order.paymentMethod}
      </p>

      <button type="button" className="btn btn-primary mt-5 w-full" onClick={close}>
        Continue shopping
      </button>
    </Modal>
  );
}
