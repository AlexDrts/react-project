import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { ClothingProduct } from "../../models";
import cartReducer from "../../store/cartSlice";
import ProductCard from "./ProductCard";

const baseProduct = { id: 3, name: "Dusk Hoodie", price: 60, categoryId: "hoodies", rating: 4.5, sizes: ["S", "M", "L"] };

function renderCard(overrides = {}) {
  const store = configureStore({ reducer: { cart: cartReducer } });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <ProductCard product={new ClothingProduct({ ...baseProduct, ...overrides })} />
      </MemoryRouter>
    </Provider>,
  );
  return store;
}

describe("ProductCard", () => {
  it("shows the name, price, rating and a link to the product page", () => {
    renderCard();

    expect(screen.getByRole("heading", { name: "Dusk Hoodie" })).toBeInTheDocument();
    expect(screen.getByText("$60.00")).toBeInTheDocument();
    expect(screen.getByText("★ 4.5")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Dusk Hoodie" })[0]).toHaveAttribute("href", "/products/3");
  });

  it("shows the old price and the discount for a product on sale", () => {
    renderCard({ oldPrice: 80 });

    expect(screen.getByText("$80.00")).toBeInTheDocument();
    expect(screen.getByText("-25%")).toBeInTheDocument();
  });

  it("disables the button for a product that is sold out", () => {
    renderCard({ inStock: false });

    expect(screen.getAllByText("Sold out").length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: "Sold out" })).toBeDisabled();
  });

  it("puts the product into the cart and confirms it", async () => {
    const store = renderCard();

    await userEvent.click(screen.getByRole("button", { name: "Add to cart" }));

    expect(store.getState().cart.items).toHaveLength(1);
    expect(store.getState().cart.items[0]).toMatchObject({ productId: 3, size: "M", qty: 1 });
    expect(screen.getByRole("button", { name: "Added to cart" })).toBeInTheDocument();
  });
});
