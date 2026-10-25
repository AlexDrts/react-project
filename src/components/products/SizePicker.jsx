import SizeOption from "./SizeOption";

/** List of sizes. The ref lets the parent move focus here when no size was chosen. */
export default function SizePicker({ sizes, selected, onSelect, ref }) {
  return (
    <ul ref={ref} tabIndex={-1} className="flex flex-wrap gap-2 rounded-lg outline-offset-4" aria-label="Sizes">
      {sizes.map((size) => (
        <SizeOption key={size} size={size} selected={size === selected} onSelect={onSelect} />
      ))}
    </ul>
  );
}
