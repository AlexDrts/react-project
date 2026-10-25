import { PAGE_SIZE } from "../../api/shopApi";
import { useProducts } from "../../hooks/useShopQueries";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import ErrorMessage from "../ui/ErrorMessage";
import EmptyState from "../ui/EmptyState";
import Loader from "../ui/Loader";
import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";

const GRID = "grid grid-cols-2 gap-4 md:grid-cols-3";

/** The product grid. Loads the next page when the sentinel at the bottom scrolls into view. */
export default function ProductGrid({ filters }) {
  const { data, isPending, isError, error, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useProducts(filters);

  const sentinelRef = useInfiniteScroll(fetchNextPage, hasNextPage && !isFetchingNextPage);

  if (isPending) {
    return (
      <div className={GRID}>
        {Array.from({ length: 6 }, (_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return <ErrorMessage title="Can't load products" error={error} onRetry={refetch} />;
  }

  const products = data.pages.flatMap((page) => page.items);
  const total = data.pages[0].total;
  const fromCache = data.pages[0].fromCache;

  if (products.length === 0) {
    return (
      <EmptyState
        icon="🔍"
        title="Nothing matches these filters"
        text="Try a different search, or clear the filters to see everything."
      />
    );
  }

  return (
    <div>
      {fromCache && (
        <p role="status" className="mb-4 rounded-lg border border-line bg-surface-2 px-3 py-2 text-sm text-muted">
          The server is offline. Showing the copy saved on this device.
        </p>
      )}
      <p className="mb-3 text-sm text-muted">
        Showing {products.length} of {total}
      </p>

      <div className={GRID}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div ref={sentinelRef} aria-hidden="true" className="h-1" />
      {isFetchingNextPage && <Loader label="Loading more..." />}
      {!hasNextPage && total > PAGE_SIZE && (
        <p className="py-8 text-center text-sm text-muted">That's everything. You've seen all {total}.</p>
      )}
    </div>
  );
}
