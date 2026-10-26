import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ConfirmDialog from "./ConfirmDialog";

function renderDialog(props = {}) {
  const onConfirm = vi.fn();
  const onClose = vi.fn();
  render(
    <ConfirmDialog
      open
      title="Clear your cart?"
      description="All 3 items will be removed."
      confirmLabel="Clear cart"
      onConfirm={onConfirm}
      onClose={onClose}
      {...props}
    />,
  );
  return { onConfirm, onClose };
}

describe("ConfirmDialog", () => {
  it("shows the title, description and buttons when open", () => {
    renderDialog();

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Clear your cart?")).toBeInTheDocument();
    expect(screen.getByText("All 3 items will be removed.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Clear cart" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });

  it("renders nothing when closed", () => {
    renderDialog({ open: false });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("calls onConfirm when the main button is clicked", async () => {
    const { onConfirm, onClose } = renderDialog();

    await userEvent.click(screen.getByRole("button", { name: "Clear cart" }));

    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onClose).not.toHaveBeenCalled();
  });

  it("calls onClose on Cancel and on Escape", async () => {
    const { onConfirm, onClose } = renderDialog();

    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    await userEvent.keyboard("{Escape}");

    expect(onClose).toHaveBeenCalledTimes(2);
    expect(onConfirm).not.toHaveBeenCalled();
  });
});
