import { createContext, useContext, useMemo, useState } from "react";

const CategoryContext = createContext(null);

/** Keeps track of the category the shopper is browsing right now (null = all products). */
export function CategoryProvider({ children }) {
  const [currentCategory, setCurrentCategory] = useState(null);
  const value = useMemo(() => ({ currentCategory, setCurrentCategory }), [currentCategory]);
  return <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>;
}

export function useCurrentCategory() {
  const ctx = useContext(CategoryContext);
  if (!ctx) throw new Error("useCurrentCategory must be used inside <CategoryProvider>");
  return ctx;
}
