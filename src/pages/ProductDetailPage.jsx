import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../api/products";
import { useCart } from "../context/CartContext";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(Number(id)),
  });

  function handleAddToCart() {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <Link
        to="/"
        className="text-sm text-indigo-600 hover:underline mb-6 inline-block"
      >
        ← Back to Products
      </Link>

      {isLoading && <LoadingSpinner label="Loading product details" />}
      {isError && <ErrorMessage message={error.message} />}

      {product && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-4">
          <div className="rounded-xl overflow-hidden bg-slate-100">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-80 object-cover"
            />
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">
              {product.category}
            </p>
            <h1 className="text-2xl font-bold text-slate-900">{product.title}</h1>
            <p className="text-slate-600 leading-relaxed">{product.description}</p>
            <p className="text-3xl font-bold text-slate-900">${product.price.toFixed(2)}</p>

            <div className="flex items-center gap-3 mt-2">
              <label htmlFor="quantity" className="text-sm font-medium text-slate-700">
                Qty
              </label>
              <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-slate-600 hover:bg-slate-100 transition-colors"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span
                  id="quantity"
                  className="px-4 py-2 text-sm font-medium min-w-[2rem] text-center"
                  aria-live="polite"
                >
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2 text-slate-600 hover:bg-slate-100 transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              data-testid="add-to-cart-btn"
              className="mt-2 rounded-lg bg-indigo-600 px-6 py-3 text-white font-semibold hover:bg-indigo-700 transition-colors"
              aria-label={added ? "Item added to cart" : `Add ${product.title} to cart`}
            >
              {added ? "✓ Added to Cart!" : "Add to Cart"}
            </button>

            <Link
              to="/cart"
              className="text-center text-sm text-indigo-600 hover:underline"
            >
              View Cart →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
