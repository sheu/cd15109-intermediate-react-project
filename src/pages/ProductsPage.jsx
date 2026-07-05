import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getProducts } from "../api/products";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import EmptyState from "../components/EmptyState";

function ProductCard({ product }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="group border rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden"
      aria-label={`${product.title} – $${product.price.toFixed(2)}`}
    >
      <div className="h-44 bg-slate-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-200"
        />
      </div>
      <div className="p-4">
        <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-1">
          {product.category}
        </p>
        <h2 className="font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors leading-snug">
          {product.title}
        </h2>
        <p className="mt-2 font-bold text-slate-900">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
}

export default function ProductsPage() {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">All Products</h1>

      {isLoading && <LoadingSpinner label="Loading products" />}
      {isError && <ErrorMessage message={error.message} />}

      {!isLoading && !isError && products?.length === 0 && (
        <EmptyState
          title="No products found"
          description="Check back later for new arrivals."
        />
      )}

      {products && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
