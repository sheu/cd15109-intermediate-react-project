import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import EmptyState from "../components/EmptyState";

function CartItem({ item, updateQuantity, removeItem }) {
  const { product, quantity } = item;

  return (
    <div className="flex items-center gap-4 py-4 border-b border-slate-100 last:border-0">
      <img
        src={product.image}
        alt={product.title}
        className="h-20 w-20 rounded-lg object-cover bg-slate-100 shrink-0"
      />
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-slate-800 truncate">{product.title}</h3>
        <p className="text-sm text-slate-500">{product.category}</p>
        <p className="font-bold text-slate-900 mt-1">${product.price.toFixed(2)}</p>
      </div>

      <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden shrink-0">
        <button
          onClick={() => updateQuantity(product.id, quantity - 1)}
          className="px-3 py-2 text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label={`Decrease quantity of ${product.title}`}
        >
          −
        </button>
        <span className="px-3 py-2 text-sm font-medium min-w-[2rem] text-center">
          {quantity}
        </span>
        <button
          onClick={() => updateQuantity(product.id, quantity + 1)}
          className="px-3 py-2 text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label={`Increase quantity of ${product.title}`}
        >
          +
        </button>
      </div>

      <p className="w-20 text-right font-semibold text-slate-800 shrink-0">
        ${(product.price * quantity).toFixed(2)}
      </p>

      <button
        onClick={() => removeItem(product.id)}
        className="text-slate-400 hover:text-red-500 transition-colors shrink-0 ml-1"
        aria-label={`Remove ${product.title} from cart`}
      >
        ✕
      </button>
    </div>
  );
}

export default function CartPage() {
  const { items, itemCount, subtotal, updateQuantity, removeItem } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Your Cart</h1>
        <EmptyState
          title="Your cart is empty"
          description="Looks like you haven't added anything yet."
          linkTo="/"
          linkLabel="Browse Products"
        />
      </div>
    );
  }

  function handleCheckout() {
    if (isAuthenticated) {
      navigate("/checkout");
    } else {
      navigate("/login?returnTo=/checkout");
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Your Cart</h1>
      <p className="text-slate-500 mb-8">
        {itemCount} {itemCount === 1 ? "item" : "items"}
      </p>

      <div className="bg-white rounded-xl border border-slate-200 px-6 mb-6">
        {items.map((item) => (
          <CartItem
            key={item.product.id}
            item={item}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
          />
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex justify-between items-center text-lg font-bold text-slate-900 mb-6">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <button
          onClick={handleCheckout}
          className="w-full rounded-lg bg-indigo-600 py-3 text-white font-semibold hover:bg-indigo-700 transition-colors"
        >
          Proceed to Checkout
        </button>
        <Link
          to="/"
          className="block text-center mt-4 text-sm text-indigo-600 hover:underline"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
