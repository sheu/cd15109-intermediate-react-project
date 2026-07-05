import { describe, it, expect } from "vitest";
import { cartReducer } from "../context/CartContext";

const mockProduct = {
  id: 1,
  title: "React Retail T-Shirt",
  price: 19.99,
  image: "https://placehold.co/300x200",
  category: "Apparel",
};

const anotherProduct = {
  id: 2,
  title: "JavaScript Mug",
  price: 12.5,
  image: "https://placehold.co/300x200",
  category: "Accessories",
};

const emptyState = { items: [] };

describe("cartReducer", () => {
  describe("ADD_ITEM", () => {
    it("adds a new item to an empty cart", () => {
      const state = cartReducer(emptyState, {
        type: "ADD_ITEM",
        payload: { product: mockProduct, quantity: 1 },
      });
      expect(state.items).toHaveLength(1);
      expect(state.items[0].product.id).toBe(1);
      expect(state.items[0].quantity).toBe(1);
    });

    it("increments quantity when the same product is added again", () => {
      const initial = { items: [{ product: mockProduct, quantity: 2 }] };
      const state = cartReducer(initial, {
        type: "ADD_ITEM",
        payload: { product: mockProduct, quantity: 3 },
      });
      expect(state.items).toHaveLength(1);
      expect(state.items[0].quantity).toBe(5);
    });

    it("adds a distinct product alongside existing items", () => {
      const initial = { items: [{ product: mockProduct, quantity: 1 }] };
      const state = cartReducer(initial, {
        type: "ADD_ITEM",
        payload: { product: anotherProduct, quantity: 1 },
      });
      expect(state.items).toHaveLength(2);
    });
  });

  describe("REMOVE_ITEM", () => {
    it("removes the correct item by product id", () => {
      const initial = {
        items: [
          { product: mockProduct, quantity: 1 },
          { product: anotherProduct, quantity: 2 },
        ],
      };
      const state = cartReducer(initial, {
        type: "REMOVE_ITEM",
        payload: mockProduct.id,
      });
      expect(state.items).toHaveLength(1);
      expect(state.items[0].product.id).toBe(anotherProduct.id);
    });

    it("does nothing when the item is not in the cart", () => {
      const initial = { items: [{ product: mockProduct, quantity: 1 }] };
      const state = cartReducer(initial, { type: "REMOVE_ITEM", payload: 999 });
      expect(state.items).toHaveLength(1);
    });
  });

  describe("UPDATE_QUANTITY", () => {
    it("updates the quantity of the correct item", () => {
      const initial = { items: [{ product: mockProduct, quantity: 1 }] };
      const state = cartReducer(initial, {
        type: "UPDATE_QUANTITY",
        payload: { id: mockProduct.id, quantity: 5 },
      });
      expect(state.items[0].quantity).toBe(5);
    });

    it("removes the item when quantity is set to 0", () => {
      const initial = { items: [{ product: mockProduct, quantity: 1 }] };
      const state = cartReducer(initial, {
        type: "UPDATE_QUANTITY",
        payload: { id: mockProduct.id, quantity: 0 },
      });
      expect(state.items).toHaveLength(0);
    });

    it("removes the item when quantity is negative", () => {
      const initial = { items: [{ product: mockProduct, quantity: 1 }] };
      const state = cartReducer(initial, {
        type: "UPDATE_QUANTITY",
        payload: { id: mockProduct.id, quantity: -1 },
      });
      expect(state.items).toHaveLength(0);
    });
  });

  describe("CLEAR_CART", () => {
    it("removes all items from the cart", () => {
      const initial = {
        items: [
          { product: mockProduct, quantity: 3 },
          { product: anotherProduct, quantity: 1 },
        ],
      };
      const state = cartReducer(initial, { type: "CLEAR_CART" });
      expect(state.items).toHaveLength(0);
    });

    it("returns an empty cart when already empty", () => {
      const state = cartReducer(emptyState, { type: "CLEAR_CART" });
      expect(state.items).toHaveLength(0);
    });
  });

  it("returns unchanged state for an unknown action type", () => {
    const state = cartReducer(emptyState, { type: "UNKNOWN" });
    expect(state).toEqual(emptyState);
  });
});
