import Badge from "../ui/Badge";

const STATUS_VARIANTS = { new: "sale", shipped: "ok", cancelled: "danger" };

export default function OrderStatus({ status }) {
  return <Badge $variant={STATUS_VARIANTS[status] ?? "muted"}>{status}</Badge>;
}
