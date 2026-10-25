import { Navigate, useParams } from "react-router-dom";
import { useProduct } from "../hooks/useShopQueries";
import ProductDetails from "../components/products/ProductDetails";
import ErrorMessage from "../components/ui/ErrorMessage";
import Loader from "../components/ui/Loader";

export default function ProductPage() {
  const { productId } = useParams();
  const { data: product, isPending, isError, error, refetch } = useProduct(productId);

  if (isPending) return <Loader label="Loading product..." />;

  // A product that doesn't exist sends the shopper back to the catalog.
  if (isError && error.status === 404) return <Navigate to="/" replace />;
  if (isError) return <ErrorMessage title="Can't load this product" error={error} onRetry={refetch} />;

  // `key` resets the size / quantity choice when the shopper moves to another product.
  return <ProductDetails key={product.id} product={product} />;
}
