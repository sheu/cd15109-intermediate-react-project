import { Link, useLocation } from "react-router-dom";

export default function OrderConfirmationPage() {
  const { state } = useLocation();
  const order = state?.order;

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 text-center">
      <p className="text-5xl mb-6" aria-hidden="true">🎉</p>
      <h1 className="text-3xl font-bold text-slate-900 mb-3">Order Confirmed!</h1>
      <p className="text-slate-500 mb-8">
        Thank you for your purchase. Your order is on its way.
      </p>

      {order && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 text-left mb-8">
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-100">
            <span className="text-sm text-slate-500">Order number</span>
            <span className="font-bold text-slate-900">#{order.id}</span>
          </div>

          {order.customer?.name && (
            <div className="mb-4 pb-4 border-b border-slate-100">
              <p className="text-sm font-medium text-slate-500 mb-1">Delivering to</p>
              <p className="text-sm text-slate-800">{order.customer.name}</p>
              <p className="text-sm text-slate-600">{order.customer.address}</p>
            </div>
          )}

          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-500 mb-2">Items ordered</p>
            {order.items?.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-slate-700">
                  {item.title} × {item.quantity}
                </span>
                <span className="font-medium text-slate-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <Link
        to="/"
        className="inline-block rounded-lg bg-indigo-600 px-8 py-3 text-white font-semibold hover:bg-indigo-700 transition-colors"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
