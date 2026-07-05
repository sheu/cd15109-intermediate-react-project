import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider, useCart } from "../context/CartContext";
import ProductDetailPage from "../pages/ProductDetailPage";

const mockProduct = {
  id: 1,
  title: "React Retail T-Shirt",
  price: 19.99,
  description: "A comfy tee for frontend devs.",
  image: "https://placehold.co/300x200?text=React+Retail+T-Shirt",
  category: "Apparel",
};

// Renders a small cart-count indicator alongside the page under test,
// avoiding the full Navbar which causes double-render issues in the
// concurrent React 19 + Vitest 4 test environment.
function CartCount() {
  const { itemCount } = useCart();
  return (
    <span data-testid="cart-count">{itemCount}</span>
  );
}

function renderApp() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <MemoryRouter initialEntries={["/products/1"]}>
            <CartCount />
            <Routes>
              <Route path="/products/:id" element={<ProductDetailPage />} />
            </Routes>
          </MemoryRouter>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

describe("Add to Cart integration", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => mockProduct,
    });
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("displays the product title and price after loading", async () => {
    renderApp();

    await waitFor(() =>
      expect(screen.getByText("React Retail T-Shirt")).toBeInTheDocument()
    );
    expect(screen.getByText("$19.99")).toBeInTheDocument();
    expect(screen.getByText("A comfy tee for frontend devs.")).toBeInTheDocument();
  });

  it("cart count is zero before adding an item", async () => {
    renderApp();

    await waitFor(() =>
      expect(screen.getByText("React Retail T-Shirt")).toBeInTheDocument()
    );

    expect(screen.getByTestId("cart-count")).toHaveTextContent("0");
  });

  it("clicking Add to Cart shows confirmation and increments cart count", async () => {
    const user = userEvent.setup();
    renderApp();

    await waitFor(() =>
      expect(screen.getByText("React Retail T-Shirt")).toBeInTheDocument()
    );

    await user.click(screen.getByTestId("add-to-cart-btn"));

    // Button gives visual confirmation
    expect(screen.getByText("✓ Added to Cart!")).toBeInTheDocument();

    // Cart count increments
    expect(screen.getByTestId("cart-count")).toHaveTextContent("1");
  });

  it("adding the same product twice accumulates quantity", async () => {
    const user = userEvent.setup();
    renderApp();

    await waitFor(() =>
      expect(screen.getByText("React Retail T-Shirt")).toBeInTheDocument()
    );

    // Click twice — the button stays clickable during the "Added!" feedback state
    await user.click(screen.getByTestId("add-to-cart-btn"));
    expect(screen.getByTestId("cart-count")).toHaveTextContent("1");

    await user.click(screen.getByTestId("add-to-cart-btn"));
    expect(screen.getByTestId("cart-count")).toHaveTextContent("2");
  });
});
