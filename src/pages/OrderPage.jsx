import { Navigate, useOutletContext, useParams } from "react-router-dom";
import { useOrder } from "../hooks/useShopQueries";
import OrderDetails from "../components/profile/OrderDetails";
import ErrorMessage from "../components/ui/ErrorMessage";
import Loader from "../components/ui/Loader";

export default function OrderPage() {
  const { orderId } = useParams();
  const { user } = useOutletContext();
  const { data: order, isPending, isError, error, refetch } = useOrder(orderId);

  if (isPending) return <Loader label="Loading order..." />;
  if (isError && error.status === 404) return <Navigate to="/profile/orders" replace />;
  if (isError) return <ErrorMessage title="Can't load this order" error={error} onRetry={refetch} />;
  if (order.customer.email !== user.email) return <Navigate to="/profile/orders" replace />;

  return <OrderDetails order={order} />;
}
