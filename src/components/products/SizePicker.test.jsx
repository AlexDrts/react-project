import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import SizePicker from "./SizePicker";

const SIZES = ["S", "M", "L"];

describe("SizePicker", () => {
  it("shows a button for every size", () => {
    render(<SizePicker sizes={SIZES} selected={null} onSelect={() => {}} />);

    expect(screen.getAllByRole("button")).toHaveLength(3);
    expect(screen.getByRole("button", { name: "M" })).toBeInTheDocument();
  });

  it("marks only the selected size as pressed", () => {
    render(<SizePicker sizes={SIZES} selected="M" onSelect={() => {}} />);

    expect(screen.getByRole("button", { name: "M" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "S" })).toHaveAttribute("aria-pressed", "false");
  });

  it("reports the clicked size", async () => {
    const onSelect = vi.fn();
    render(<SizePicker sizes={SIZES} selected={null} onSelect={onSelect} />);

    await userEvent.click(screen.getByRole("button", { name: "L" }));

    expect(onSelect).toHaveBeenCalledWith("L");
  });
});
