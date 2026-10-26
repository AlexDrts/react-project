import { Navigate, useParams } from "react-router-dom";

export default function ProductRedirect() {
  const { productId } = useParams();
  return <Navigate to={`/products/${productId}`} replace />;
}
