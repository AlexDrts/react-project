import { useEffect, useReducer } from "react";
import AdminCategories from "../components/admin/AdminCategories";
import AdminProducts from "../components/admin/AdminProducts";
import AdminUsers from "../components/admin/AdminUsers";
import { ADMIN_TABS, adminReducer, initialAdminState } from "../components/admin/adminReducer";

export default function AdminPage() {
  const [state, dispatch] = useReducer(adminReducer, initialAdminState);
  const { tab, editor, notice } = state;

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

      <div role="tablist" aria-label="Admin sections" className="mt-6 flex gap-1 border-b border-line">
        {ADMIN_TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`tab-${item.id}`}
            aria-selected={tab === item.id}
            aria-controls={`panel-${item.id}`}
            onClick={() => dispatch({ type: "set_tab", tab: item.id })}
            className={`-mb-px border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
              tab === item.id ? "border-accent text-accent" : "border-transparent text-muted hover:text-fg"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {notice && (
        <p
          role={notice.type === "error" ? "alert" : "status"}
          className={`mt-4 rounded-lg border px-3 py-2 text-sm ${notice.type === "error" ? "border-danger text-danger" : "border-ok text-ok"}`}
        >
          {notice.text}
        </p>
      )}

      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="mt-6">
        {tab === "products" && <AdminProducts editor={editor} dispatch={dispatch} />}
        {tab === "categories" && <AdminCategories editor={editor} dispatch={dispatch} />}
        {tab === "users" && <AdminUsers dispatch={dispatch} />}
      </div>
    </>
  );
}
