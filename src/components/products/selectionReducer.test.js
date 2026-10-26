import { describe, expect, it } from "vitest";
import { MAX_QTY } from "../../store/cartSlice";
import { initialSelection, selectionReducer } from "./selectionReducer";

describe("selectionReducer", () => {
  it("remembers the chosen size and clears the error", () => {
    const withError = selectionReducer(initialSelection, { type: "size_missing" });
    const picked = selectionReducer(withError, { type: "pick_size", size: "L" });

    expect(picked.size).toBe("L");
    expect(picked.error).toBeNull();
  });

  it("asks for a size when none was chosen", () => {
    const state = selectionReducer(initialSelection, { type: "size_missing" });

    expect(state.error).toMatch(/choose a size/i);
  });

  it("never lets the quantity go below 1", () => {
    const state = selectionReducer(initialSelection, { type: "qty_down" });

    expect(state.qty).toBe(1);
  });

  it("never lets the quantity go above the maximum", () => {
    let state = initialSelection;
    for (let i = 0; i < MAX_QTY + 5; i += 1) state = selectionReducer(state, { type: "qty_up" });

    expect(state.qty).toBe(MAX_QTY);
  });

  it("ignores unknown actions", () => {
    expect(selectionReducer(initialSelection, { type: "nope" })).toBe(initialSelection);
  });
});
