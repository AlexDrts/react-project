import { useEffect, useReducer } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { ADMIN_TABS, adminReducer, initialAdminState } from "../components/admin/adminReducer";
import { tabLinkClass } from "../components/ui/tabLinkClass";

export default function AdminPage() {
  const [state, dispatch] = useReducer(adminReducer, initialAdminState);
  const { editor, notice } = state;
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch({ type: "reset" });
  }, [pathname]);

  // Messages fade out by themselves.
  useEffect(() => {
    if (!notice) return undefined;
    const timer = setTimeout(() => dispatch({ type: "clear_notice" }), 5000);
    return () => clearTimeout(timer);
  }, [notice]);

  return (
    <>
      <h1 className="text-3xl font-extrabold">Admin</h1>
      <p className="mt-1 text-sm text-muted">Manage products, categories and users. Changes are saved to the API right away.</p>

      <nav aria-label="Admin sections" className="mt-6 flex gap-1 border-b border-line">
        {ADMIN_TABS.map((item) => (
          <NavLink key={item.id} to={`/admin/${item.id}`} className={tabLinkClass}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {notice && (
        <p
          role={notice.type === "error" ? "alert" : "status"}
          className={`mt-4 rounded-lg border px-3 py-2 text-sm ${notice.type === "error" ? "border-danger text-danger" : "border-ok text-ok"}`}
        >
          {notice.text}
        </p>
      )}

      <div className="mt-6">
        <Outlet context={{ editor, dispatch }} />
      </div>
    </>
  );
}
