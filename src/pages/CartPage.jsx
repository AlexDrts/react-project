import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { clearCart } from "../store/cartSlice";
import CartList from "../components/cart/CartList";
import CartSummary from "../components/cart/CartSummary";
import EmptyState from "../components/ui/EmptyState";

export default function CartPage() {
  const cart = useCart();
  const dispatch = useDispatch();

  if (cart.isEmpty) {
    return (
      <EmptyState icon="🛍️" title="Your cart is empty" text="Pick a hoodie or a pair of sneakers and it will show up here.">
        <Link to="/" className="btn btn-primary">
          Start shopping
        </Link>
      </EmptyState>
    );
  }

  return (
    <>
      <h1 className="mb-6 text-3xl font-extrabold">Your cart</h1>
      <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div>
          <CartList items={cart.items} />
          <button type="button" className="mt-4 text-sm text-muted underline hover:text-danger" onClick={() => dispatch(clearCart())}>
            Clear cart
          </button>
        </div>

        <CartSummary cart={cart}>
          <Link to="/checkout" className="btn btn-primary">
            Go to checkout
          </Link>
          <Link to="/" className="btn btn-ghost">
            Keep shopping
          </Link>
        </CartSummary>
      </div>
    </>
  );
}
