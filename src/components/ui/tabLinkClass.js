export const tabLinkClass = ({ isActive }) =>
  `-mb-px border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
    isActive ? "border-accent text-accent" : "border-transparent text-muted hover:text-fg"
  }`;
