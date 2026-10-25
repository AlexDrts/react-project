/** One size button. */
export default function SizeOption({ size, selected, onSelect }) {
  return (
    <li>
      <button
        type="button"
        aria-pressed={selected}
        onClick={() => onSelect(size)}
        className={`min-w-12 rounded-lg border px-3 py-2 text-sm font-semibold transition-colors ${
          selected ? "border-accent bg-accent text-on-accent" : "border-line hover:border-accent"
        }`}
      >
        {size}
      </button>
    </li>
  );
}
