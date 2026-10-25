import DetailItem from "./DetailItem";

/** `details` comes from product.getDetails(), so each product type lists its own facts. */
export default function DetailList({ details }) {
  return (
    <dl>
      {details.map((detail) => (
        <DetailItem key={detail.label} label={detail.label} value={detail.value} />
      ))}
    </dl>
  );
}
