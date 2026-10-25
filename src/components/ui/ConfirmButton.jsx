import { useEffect, useState } from "react";

/** Two-step button: the first click arms it, the second one confirms. Disarms itself after a few seconds. */
export default function ConfirmButton({ label = "Delete", confirmLabel = "Confirm?", onConfirm, disabled }) {
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (!armed) return undefined;
    const timer = setTimeout(() => setArmed(false), 3500);
    return () => clearTimeout(timer);
  }, [armed]);

  const handleClick = () => {
    if (!armed) {
      setArmed(true);
      return;
    }
    setArmed(false);
    onConfirm();
  };

  return (
    <button type="button" className={`btn btn-sm ${armed ? "btn-primary" : "btn-danger"}`} onClick={handleClick} disabled={disabled}>
      {armed ? confirmLabel : label}
    </button>
  );
}
