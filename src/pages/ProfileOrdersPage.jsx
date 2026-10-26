import { Link, useOutletContext } from "react-router-dom";
import { useUserOrders } from "../hooks/useShopQueries";
import OrderList from "../components/profile/OrderList";
import EmptyState from "../components/ui/EmptyState";
import ErrorMessage from "../components/ui/ErrorMessage";
import Loader from "../components/ui/Loader";

export default function ProfileOrdersPage() {
  const { user } = useOutletContext();
  const orders = useUserOrders(user.email);

  if (orders.isPending) return <Loader label="Loading your orders..." />;
  if (orders.isError) return <ErrorMessage title="Can't load your orders" error={orders.error} onRetry={orders.refetch} />;

  if (orders.data.length === 0) {
    return (
      <EmptyState icon="📦" title="No orders yet" text={`Orders placed with ${user.email} will show up here.`}>
        <Link to="/products" className="btn btn-primary">
          Browse products
        </Link>
      </EmptyState>
    );
  }

  return <OrderList orders={orders.data} />;
}
