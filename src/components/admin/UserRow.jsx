import Badge from "../ui/Badge";

export default function UserRow({ user, isCurrent, onUse }) {
  return (
    <li className="flex items-center justify-between gap-3 border-t border-line px-4 py-3 first:border-0">
      <div className="min-w-0">
        <p className="truncate font-semibold">{user.name}</p>
        <p className="truncate text-sm text-muted">{user.email}</p>
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <Badge $variant={user.role === "admin" ? "sale" : "muted"}>{user.role}</Badge>
        {isCurrent ? (
          <Badge $variant="ok">Signed in</Badge>
        ) : (
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => onUse(user)}>
            Use account
          </button>
        )}
      </div>
    </li>
  );
}
