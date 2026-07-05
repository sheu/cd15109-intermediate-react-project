import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useCart } from "../context/CartContext";
import { submitOrder } from "../api/orders";
import ErrorMessage from "../components/ErrorMessage";

const FIELDS = [
  { id: "name", label: "Full Name", type: "text", placeholder: "Jane Doe", autoComplete: "name" },
  { id: "email", label: "Email", type: "email", placeholder: "jane@example.com", autoComplete: "email" },
  { id: "address", label: "Shipping Address", type: "text", placeholder: "123 Main St, City, State", autoComplete: "street-address" },
];

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", address: "" });

  const mutation = useMutation({
    mutationFn: submitOrder,
    onSuccess: (order) => {
      clearCart();
      navigate("/order-confirmation", { state: { order } });
    },
  });

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    mutation.mutate({
      items: items.map(({ product, quantity }) => ({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity,
      })),
      customer: form,
    });
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Order Summary */}
        <section aria-labelledby="summary-heading">
          <h2 id="summary-heading" className="text-lg font-semibold text-slate-700 mb-4">
            Order Summary
          </h2>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex justify-between items-center py-3 border-b border-slate-100 last:border-0 text-sm"
              >
                <span className="text-slate-700">
                  {product.title}{" "}
                  <span className="text-slate-400">× {quantity}</span>
                </span>
                <span className="font-semibold text-slate-900">
                  ${(product.price * quantity).toFixed(2)}
                </span>
              </div>
            ))}
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-200 font-bold text-slate-900">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          </div>
        </section>

        {/* Customer Info Form */}
        <section aria-labelledby="customer-heading">
          <h2 id="customer-heading" className="text-lg font-semibold text-slate-700 mb-4">
            Customer Information
          </h2>
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col gap-4"
          >
            {mutation.isError && <ErrorMessage message={mutation.error.message} />}

            {FIELDS.map(({ id, label, type, placeholder, autoComplete }) => (
              <div key={id} className="flex flex-col gap-1.5">
                <label htmlFor={id} className="text-sm font-medium text-slate-700">
                  {label}
                </label>
                <input
                  id={id}
                  name={id}
                  type={type}
                  value={form[id]}
                  onChange={handleChange}
                  required
                  placeholder={placeholder}
                  autoComplete={autoComplete}
                  className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={mutation.isPending || items.length === 0}
              className="mt-2 rounded-lg bg-indigo-600 py-3 text-white font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {mutation.isPending ? "Placing Order…" : "Place Order"}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
