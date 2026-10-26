import { Link } from "react-router-dom";
import { formatMoney } from "../../models";

export default function OrderLineItem({ line }) {
  return (
    <li className="flex justify-between gap-3 px-3 py-2">
      <span>
        {line.qty} ×{" "}
        <Link to={`/products/${line.productId}`} className="hover:text-accent">
          {line.name}
        </Link>
        {line.size ? ` (${line.size})` : ""}
      </span>
      <span className="font-semibold">{formatMoney(line.price * line.qty)}</span>
    </li>
  );
}
