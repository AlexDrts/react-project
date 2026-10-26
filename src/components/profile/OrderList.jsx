import OrderItem from "./OrderItem";

export default function OrderList({ orders }) {
  return (
    <ul className="space-y-3">
      {orders.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </ul>
  );
}
