export default function ProductSkeleton() {
  return (
    <div className="panel overflow-hidden" aria-hidden="true">
      <div className="skeleton aspect-[4/5]" />
      <div className="space-y-3 p-4">
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton h-5 w-1/3 rounded" />
        <div className="skeleton h-10 w-full rounded-lg" />
      </div>
    </div>
  );
}
