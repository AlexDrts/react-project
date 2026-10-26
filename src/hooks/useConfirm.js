import { useCallback, useState } from "react";

/**
 * State for a confirmation dialog: which item is waiting for a decision and whether the dialog is open.
 * The item is kept after closing, so the dialog text doesn't go blank during the closing animation.
 */
export function useConfirm() {
  const [target, setTarget] = useState(null);
  const [open, setOpen] = useState(false);

  const ask = useCallback((item) => {
    setTarget(item);
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  return { target, open, ask, close };
}
