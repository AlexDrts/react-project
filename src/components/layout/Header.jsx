import { Link, NavLink } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useSelector } from "react-redux";
import ThemeToggle from "./ThemeToggle";

const navClass = ({ isActive }) =>
  `rounded-lg px-2 py-1.5 text-sm sm:px-3 font-semibold transition-colors ${
    isActive ? "bg-accent-soft text-accent" : "text-muted hover:text-fg"
  }`;

export default function Header() {
  const cart = useCart();
  const user = useSelector((state) => state.user.current);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:gap-4">
        <Link to="/" className="font-display text-lg font-extrabold tracking-tight sm:text-xl">
          <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text text-transparent">AFTERGLOW</span>
        </Link>

        <nav aria-label="Main" className="flex items-center gap-1">
          <NavLink to="/" end className={navClass}>
            Shop
          </NavLink>
          <NavLink to="/cart" className={navClass}>
            Cart
            {cart.totalQty > 0 && (
              <span className="ml-1.5 rounded-full bg-accent px-1.5 py-0.5 text-xs text-on-accent">{cart.totalQty}</span>
            )}
          </NavLink>
          <NavLink to="/admin" className={navClass}>
            Admin
          </NavLink>
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <span className="hidden text-sm text-muted md:inline">{user ? `Hi, ${user.name}` : "Guest"}</span>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
