import { useSelector } from "react-redux";
import { Link, NavLink, Outlet } from "react-router-dom";
import EmptyState from "../components/ui/EmptyState";
import { tabLinkClass } from "../components/ui/tabLinkClass";

export default function ProfilePage() {
  const user = useSelector((state) => state.user.current);

  if (!user) {
    return (
      <EmptyState icon="👤" title="You're not signed in" text="Register or pick a user in the admin panel to see your profile and orders.">
        <Link to="/admin/users" className="btn btn-primary">
          Go to users
        </Link>
      </EmptyState>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-extrabold">Profile</h1>
      <nav aria-label="Profile sections" className="mt-6 flex gap-1 border-b border-line">
        <NavLink to="/profile" end className={tabLinkClass}>
          Account
        </NavLink>
        <NavLink to="/profile/orders" className={tabLinkClass}>
          Orders
        </NavLink>
      </nav>
      <div className="mt-6">
        <Outlet context={{ user }} />
      </div>
    </>
  );
}
