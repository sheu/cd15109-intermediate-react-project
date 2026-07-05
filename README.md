# React Retail

A fully functional e-commerce frontend built as the **Intermediate React** capstone project. React Retail simulates a small online store where users can browse products, add items to a cart, sign in, and complete a checkout flow through a mock API.

---

## Tech Stack

| Concern | Tool |
|---|---|
| Build | Vite |
| UI | React 19 + Tailwind CSS v4 |
| Routing | React Router v7 |
| Server state | TanStack React Query v5 |
| Client state | React Context + useReducer |
| Testing | Vitest + React Testing Library |
| Mock API | Express (local) |

---

## Features

- **Product catalog** — Responsive grid with loading, error, and empty states
- **Product detail** — Image, description, price, quantity selector, Add to Cart
- **Shopping cart** — Add / update qty / remove items, computed subtotal, persisted to `localStorage`
- **Auth flow** — Frontend mock login, session persisted to `sessionStorage`
- **Protected routes** — Checkout requires login; redirects back after sign-in
- **Checkout** — Order summary + customer info form → `POST /api/orders` → confirmation page
- **Fully tested** — 11 unit tests (cartReducer) + 4 integration tests (add-to-cart flow)

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm (bundled with Node)

```bash
node -v
npm -v
```

### Installation

```bash
npm install
```

### Run the app

You need **two terminals**:

**Terminal 1 — Mock API (port 5174):**
```bash
npm run dev:api
```

**Terminal 2 — React app (port 5173):**
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

> The API server must be running for products to load and orders to submit.

---

## Demo Credentials

The login page uses frontend-only mock authentication.

| Field | Value |
|---|---|
| Email | `demo@example.com` |
| Password | `password` |

---

## Testing

```bash
npm test
```

Runs all tests once (Vitest in run mode). To run in watch mode:

```bash
npx vitest
```

### Test breakdown

| File | Type | Coverage |
|---|---|---|
| `src/test/cartReducer.test.js` | Unit | ADD_ITEM (new + duplicate merge), REMOVE_ITEM, UPDATE_QUANTITY (incl. zero/negative), CLEAR_CART, unknown action |
| `src/test/AddToCart.test.jsx` | Integration | Product loads, cart starts empty, Add to Cart updates count, double-add accumulates quantity |

---

## Project Structure

```
src/
├── api/
│   ├── products.js        # getProducts(), getProductById()
│   └── orders.js          # submitOrder()
├── components/
│   ├── EmptyState.jsx
│   ├── ErrorMessage.jsx
│   ├── LoadingSpinner.jsx
│   ├── Navbar.jsx
│   └── ProtectedRoute.jsx
├── context/
│   ├── AuthContext.jsx    # useReducer — LOGIN / LOGOUT, sessionStorage
│   └── CartContext.jsx    # useReducer — ADD_ITEM / REMOVE_ITEM / UPDATE_QUANTITY / CLEAR_CART, localStorage
├── pages/
│   ├── ProductsPage.jsx
│   ├── ProductDetailPage.jsx
│   ├── CartPage.jsx
│   ├── LoginPage.jsx
│   ├── CheckoutPage.jsx
│   └── OrderConfirmationPage.jsx
├── test/
│   ├── setup.js
│   ├── cartReducer.test.js
│   └── AddToCart.test.jsx
├── App.jsx                # Routes + providers
└── main.jsx
api/
└── server.js              # Express mock API
```

---

## Architecture Notes

**Client state** (cart, auth) is managed with React Context + `useReducer` — predictable, action-based transitions that are easy to test in isolation.

**Server state** (products, order submission) is managed with TanStack React Query — handles caching, loading/error states, and deduplication automatically.

**Cart persistence** — cart items survive page refresh via `localStorage`. Auth session survives refresh via `sessionStorage` (clears on tab close).

**Protected routes** — `ProtectedRoute` wraps the `/checkout` and `/order-confirmation` routes. Unauthenticated users are redirected to `/login?returnTo=<path>` and returned after a successful login.

---

## Mock API Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/products` | List all products |
| `GET` | `/api/products/:id` | Single product by ID |
| `POST` | `/api/orders` | Submit an order |

---

## License

[License](LICENSE.txt)
