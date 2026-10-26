import OrderLineItem from "./OrderLineItem";

export default function OrderLineList({ lines }) {
  return (
    <ul className="divide-y divide-line rounded-lg border border-line text-sm">
      {lines.map((line) => (
        <OrderLineItem key={line.key} line={line} />
      ))}
    </ul>
  );
}
