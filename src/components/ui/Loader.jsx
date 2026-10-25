export default function Loader({ label = "Loading..." }) {
  return (
    <div role="status" className="flex items-center justify-center gap-3 py-10 text-muted">
      <span className="size-5 animate-spin rounded-full border-2 border-line border-t-accent" />
      <span className="text-sm">{label}</span>
    </div>
  );
}
