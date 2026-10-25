import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { postOrder } from "../api/shopApi";
import { useCart } from "../hooks/useCart";
import { Order } from "../models";
import { clearCart } from "../store/cartSlice";
import CartSummary from "../components/cart/CartSummary";
import OrderForm from "../components/checkout/OrderForm";
import OrderConfirmation from "../components/checkout/OrderConfirmation";

export default function CheckoutPage() {
  const cart = useCart();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.current);
  const [placedOrder, setPlacedOrder] = useState(null);
  const [serverError, setServerError] = useState(null);
  const topRef = useRef(null);
  const orderMutation = useMutation({ mutationFn: postOrder });

  // Nothing to pay for: go back to the cart (but not right after a successful order).
  if (cart.isEmpty && !placedOrder) return <Navigate to="/cart" replace />;

  const handleSubmitOrder = async (data) => {
    setServerError(null);
    try {
      const order = new Order({
        customer: { fullName: data.fullName.trim(), phone: data.phone, email: data.email, city: data.city.trim() },
        items: cart.items,
        deliveryMethod: data.delivery,
        paymentMethod: data.payment,
        giftWrap: data.giftWrap,
        subscribe: data.subscribe,
        comment: data.comment.trim(),
      });

      const saved = await orderMutation.mutateAsync(order.toPayload());
      // Show the confirmation first and make sure it is on screen (flushSync) before the cart is emptied.
      // Otherwise one render would see "empty cart, no order" and redirect to /cart.
      flushSync(() => setPlacedOrder(saved));
      dispatch(clearCart());
    } catch (error) {
      setServerError(error.message);
    } finally {
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <h1 ref={topRef} className="mb-6 scroll-mt-24 text-3xl font-extrabold">
        Checkout
      </h1>

      <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <OrderForm
          defaultValues={user ? { fullName: user.name, email: user.email } : undefined}
          onSubmitOrder={handleSubmitOrder}
          serverError={serverError}
        />
        <CartSummary cart={cart} />
      </div>

      {placedOrder && <OrderConfirmation order={placedOrder} />}
    </>
  );
}
