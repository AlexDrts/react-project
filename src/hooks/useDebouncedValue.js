import { useEffect, useState } from "react";

export function useDebouncedValue(value, delay = 350) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer); // cleanup: cancel the previous timer on every keystroke
  }, [value, delay]);

  return debounced;
}
