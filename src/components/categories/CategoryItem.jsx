import { NavLink } from "react-router-dom";

/** One row of the category menu. The link highlights itself when its route is active. */
export default function CategoryItem({ category, to = category.path, end = false }) {
  return (
    <li className="shrink-0">
      <NavLink
        to={to}
        end={end}
        className={({ isActive }) =>
          `flex items-center gap-2.5 rounded-xl border px-3 py-2 text-sm font-semibold transition-colors ${
            isActive
              ? "border-accent bg-accent-soft text-accent"
              : "border-transparent text-muted hover:border-line hover:text-fg"
          }`
        }
      >
        <span aria-hidden="true">{category.icon}</span>
        {category.name}
      </NavLink>
    </li>
  );
}
