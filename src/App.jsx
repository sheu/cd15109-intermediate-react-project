import { useEffect, useState } from "react";

export default function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5174/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p className="p-6 text-slate-600">Loading products…</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error.message}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">React Retail</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="h-40 bg-slate-100 rounded mb-3 flex items-center justify-center">
              <img
                src={p.image}
                alt={p.title}
                className="object-cover h-full w-full rounded"
              />
            </div>

            <h2 className="font-semibold text-slate-800">{p.title}</h2>
            <p className="text-slate-500 text-sm">{p.category}</p>

            <p className="mt-2 font-semibold text-slate-900">
              ${p.price.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
