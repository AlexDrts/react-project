import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useCurrentCategory } from "../context/CategoryContext";
import { useCategories } from "../hooks/useShopQueries";
import ShopSection from "../components/products/ShopSection";
import ErrorMessage from "../components/ui/ErrorMessage";
import Loader from "../components/ui/Loader";

export default function CategoryPage() {
  const { categoryId } = useParams();
  const { setCurrentCategory } = useCurrentCategory();
  const { data: categories, isPending, isError, error, refetch } = useCategories();

  const category = categories?.find((item) => item.id === categoryId) ?? null;

  // Tell the rest of the app which category is open (shared through context).
  useEffect(() => {
    setCurrentCategory(category);
    return () => setCurrentCategory(null);
  }, [category, setCurrentCategory]);

  if (isPending) return <Loader label="Loading category..." />;
  if (isError) return <ErrorMessage title="Can't load categories" error={error} onRetry={refetch} />;

  // Unknown category in the URL: send the shopper to the full catalog.
  if (!category) return <Navigate to="/" replace />;

  return <ShopSection categoryId={categoryId} />;
}
