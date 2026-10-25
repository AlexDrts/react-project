import { useDispatch } from "react-redux";
import { changeQty, removeItem } from "../../store/cartSlice";
import CartItem from "./CartItem";

export default function CartList({ items }) {
  const dispatch = useDispatch();

  return (
    <ul className="space-y-3">
      {items.map((line) => (
        <CartItem
          key={line.key}
          line={line}
          onChangeQty={(key, qty) => dispatch(changeQty({ key, qty }))}
          onRemove={(key) => dispatch(removeItem(key))}
        />
      ))}
    </ul>
  );
}
