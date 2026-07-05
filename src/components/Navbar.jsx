import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { itemCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <nav
        className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        <Link
          to="/"
          className="text-xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          React Retail
        </Link>

        <div className="flex items-center gap-6">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `text-sm font-medium transition-colors ${
                isActive ? "text-indigo-600" : "text-slate-600 hover:text-slate-900"
              }`
            }
          >
            Products
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `relative text-sm font-medium transition-colors ${
                isActive ? "text-indigo-600" : "text-slate-600 hover:text-slate-900"
              }`
            }
            aria-label={`Cart${itemCount > 0 ? `, ${itemCount} item${itemCount !== 1 ? "s" : ""}` : ""}`}
          >
            Cart
            {itemCount > 0 && (
              <span
                data-testid="cart-badge"
                className="absolute -top-2 -right-3 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white"
              >
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </NavLink>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-500 hidden sm:block">{user?.email}</span>
              <button
                onClick={logout}
                className="text-sm font-medium text-slate-600 hover:text-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? "text-indigo-600" : "text-slate-600 hover:text-slate-900"
                }`
              }
            >
              Login
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
}
