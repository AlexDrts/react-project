import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";

/**
 * Confirmation dialog built with Headless UI's <Dialog>.
 * The library handles the portal, focus trap, Escape key, click-outside and scroll lock;
 * we only style it (Tailwind) and animate it with the `data-closed` attribute it sets.
 */
export default function ConfirmDialog({ open, title, description, confirmLabel = "Confirm", onConfirm, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition duration-200 ease-out data-closed:opacity-0"
      />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
          transition
          className="w-full max-w-md rounded-2xl border border-line bg-surface p-6 text-fg shadow-[0_0_60px_var(--glow)] transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0"
        >
          <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
          {description && <Description className="mt-2 text-sm text-muted">{description}</Description>}

          <div className="mt-6 flex justify-end gap-3">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="button" className="btn btn-primary" onClick={onConfirm}>
              {confirmLabel}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
