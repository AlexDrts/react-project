import { useEffect, useRef } from "react";

/**
 * Calls `onReach` when the element behind the returned ref scrolls into view.
 * Attach the ref to an empty "sentinel" div under the list.
 */
export function useInfiniteScroll(onReach, enabled) {
  const sentinelRef = useRef(null);
  const onReachRef = useRef(onReach);

  useEffect(() => {
    onReachRef.current = onReach;
  });

  useEffect(() => {
    const node = sentinelRef.current;
    if (!enabled || !node) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) onReachRef.current();
      },
      { rootMargin: "300px" },
    );
    observer.observe(node);

    return () => observer.disconnect(); // cleanup
  }, [enabled]);

  return sentinelRef;
}
