export const ADMIN_TABS = [
  { id: "products", label: "Products" },
  { id: "categories", label: "Categories" },
  { id: "users", label: "Users" },
];

// editor: null (closed) or { kind: "product" | "category", item: object | null }  (item null = create new)
export const initialAdminState = { tab: "products", editor: null, notice: null };

/** State of the whole admin panel: current tab, which editor is open, and the last message. */
export function adminReducer(state, action) {
  switch (action.type) {
    case "set_tab":
      return { ...state, tab: action.tab, editor: null, notice: null };
    case "open_editor":
      return { ...state, editor: { kind: action.kind, item: action.item ?? null }, notice: null };
    case "close_editor":
      return { ...state, editor: null };
    case "notify":
      return { ...state, notice: { type: action.noticeType ?? "ok", text: action.text } };
    case "clear_notice":
      return { ...state, notice: null };
    default:
      return state;
  }
}
