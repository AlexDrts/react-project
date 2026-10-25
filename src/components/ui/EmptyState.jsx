export default function EmptyState({ icon = "🌅", title, text, children }) {
  return (
    <div className="panel mx-auto max-w-md p-8 text-center">
      <div className="text-4xl" aria-hidden="true">
        {icon}
      </div>
      <h3 className="mt-3 text-lg font-bold">{title}</h3>
      {text && <p className="mt-2 text-sm text-muted">{text}</p>}
      {children && <div className="mt-5 flex justify-center gap-3">{children}</div>}
    </div>
  );
}
