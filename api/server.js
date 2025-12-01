/* eslint-env node */

import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5174;

app.use(cors());
app.use(express.json());

const PRODUCTS = [
  {
    id: 1,
    title: "React Retail T-Shirt",
    price: 19.99,
    description: "A comfy tee for frontend devs.",
    image: "https://placehold.co/300x200?text=React+Retail+T-Shirt",
    category: "Apparel",
  },
  {
    id: 2,
    title: "JavaScript Mug",
    price: 12.5,
    description: "Perfect for coffee while debugging.",
    image: "https://placehold.co/300x200?text=JavaScript+Mug",
    category: "Accessories",
  },
  {
    id: 3,
    title: "Keyboard Stickers",
    price: 7.0,
    description: "Colorful stickers for your laptop or keyboard.",
    image: "https://placehold.co/300x200?text=Keyboard+Stickers",
    category: "Accessories",
  },
  {
    id: 4,
    title: "Dark Mode Hoodie",
    price: 39.0,
    description: "A cozy hoodie for late-night coding sessions.",
    image: "https://placehold.co/300x200?text=Dark+Mode+Hoodie",
    category: "Apparel",
  },
  {
    id: 5,
    title: "TypeScript Notebook",
    price: 9.99,
    description: "Dot-grid notebook for sketching components and diagrams.",
    image: "https://placehold.co/300x200?text=TypeScript+Notebook",
    category: "Stationery",
  },
  {
    id: 6,
    title: "Frontend Engineer Cap",
    price: 24.5,
    description: "Keep the sun out of your eyes while reviewing PRs.",
    image: "https://placehold.co/300x200?text=Frontend+Engineer+Cap",
    category: "Apparel",
  },
  {
    id: 7,
    title: "CSS Gradient Poster",
    price: 14.0,
    description: "A wall poster featuring beautiful CSS gradients.",
    image: "https://placehold.co/300x200?text=CSS+Gradient+Poster",
    category: "Decor",
  },
  {
    id: 8,
    title: "REST API Enamel Pin",
    price: 6.5,
    description: "A small pin that says you care about HTTP verbs.",
    image: "https://placehold.co/300x200?text=REST+API+Pin",
    category: "Accessories",
  },
  {
    id: 9,
    title: "React Component Coasters",
    price: 16.0,
    description: "Set of 4 cork coasters with component diagrams.",
    image: "https://placehold.co/300x200?text=React+Component+Coasters",
    category: "Home",
  },
  {
    id: 10,
    title: "Debugger Socks",
    price: 11.5,
    description: "Lucky socks for fixing the toughest bugs.",
    image: "https://placehold.co/300x200?text=Debugger+Socks",
    category: "Apparel",
  },
  {
    id: 11,
    title: "Node.js Beanie",
    price: 21.0,
    description: "Keep your head warm in cold server rooms.",
    image: "https://placehold.co/300x200?text=Node.js+Beanie",
    category: "Apparel",
  },
  {
    id: 12,
    title: "React Router Tote Bag",
    price: 18.75,
    description: "Carry your laptop and snacks between routes.",
    image: "https://placehold.co/300x200?text=React+Router+Tote+Bag",
    category: "Bags",
  },
  {
    id: 13,
    title: "Linting Lanyard",
    price: 8.0,
    description: "A lanyard that reminds you to keep things clean.",
    image: "https://placehold.co/300x200?text=Linting+Lanyard",
    category: "Accessories",
  },
  {
    id: 14,
    title: "Hooks Reference Poster",
    price: 15.5,
    description: "Quick reference for the most common React hooks.",
    image: "https://placehold.co/300x200?text=Hooks+Reference+Poster",
    category: "Decor",
  },
  {
    id: 15,
    title: "State Management Notebook",
    price: 10.25,
    description: "Plan your reducers and context trees on paper.",
    image: "https://placehold.co/300x200?text=State+Management+Notebook",
    category: "Stationery",
  },
  {
    id: 16,
    title: "HTTP Status Code Stickers",
    price: 5.99,
    description:
      "Sticker pack featuring your favorite 2xx, 4xx, and 5xx codes.",
    image: "https://placehold.co/300x200?text=HTTP+Status+Stickers",
    category: "Accessories",
  },
  {
    id: 17,
    title: "Loading Spinner Desk Toy",
    price: 22.0,
    description: "A physical spinner for when your builds take too long.",
    image: "https://placehold.co/300x200?text=Loading+Spinner+Desk+Toy",
    category: "Desk",
  },
  {
    id: 18,
    title: "Accessibility Checklist Cards",
    price: 13.5,
    description: "A deck of cards with a11y reminders and tips.",
    image: "https://placehold.co/300x200?text=Accessibility+Checklist+Cards",
    category: "Reference",
  },
  {
    id: 19,
    title: "Testing Pyramid Mug",
    price: 14.25,
    description: "A mug that nudges you to write more unit tests.",
    image: "https://placehold.co/300x200?text=Testing+Pyramid+Mug",
    category: "Accessories",
  },
  {
    id: 20,
    title: "Refactor Reward Candle",
    price: 17.75,
    description: "Light this when you finish a big refactor.",
    image: "https://placehold.co/300x200?text=Refactor+Reward+Candle",
    category: "Home",
  },
];

// GET /api/products – list all products
app.get("/api/products", (req, res) => {
  res.json(PRODUCTS);
});

// GET /api/products/:id – single product by ID
app.get("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});

let nextOrderId = 1;

// POST /api/orders – create an order
app.post("/api/orders", (req, res) => {
  const { items, customer } = req.body || {};

  if (!Array.isArray(items) || items.length === 0) {
    return res
      .status(400)
      .json({ message: "Order must include at least one item." });
  }

  const order = {
    id: nextOrderId++,
    items,
    customer: customer || null,
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };

  res.status(201).json(order);
});

app.listen(PORT, () => {
  console.log(`Mock API server listening on http://localhost:${PORT}`);
});
