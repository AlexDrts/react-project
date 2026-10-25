export default function ErrorMessage({ title = "Something went wrong", error, onRetry }) {
  return (
    <div role="alert" className="panel mx-auto max-w-md p-6 text-center">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="mt-2 text-sm text-muted">{error?.message ?? "Unknown error."}</p>
      {onRetry && (
        <button type="button" className="btn btn-primary mt-4" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
