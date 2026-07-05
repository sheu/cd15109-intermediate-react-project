import { createContext, useContext, useReducer, useEffect } from "react";

const DEMO_EMAIL = "demo@example.com";
const DEMO_PASSWORD = "password";
const SESSION_KEY = "react-retail-auth";

const AuthContext = createContext(null);

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload.user, token: action.payload.token, isAuthenticated: true };
    case "LOGOUT":
      return { user: null, token: null, isAuthenticated: false };
    default:
      return state;
  }
}

function getInitialState() {
  try {
    const saved = sessionStorage.getItem(SESSION_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...parsed, isAuthenticated: true };
    }
  } catch {
    // ignore parse errors
  }
  return { user: null, token: null, isAuthenticated: false };
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, getInitialState());

  useEffect(() => {
    if (state.isAuthenticated) {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({ user: state.user, token: state.token }));
    } else {
      sessionStorage.removeItem(SESSION_KEY);
    }
  }, [state.isAuthenticated, state.user, state.token]);

  function login(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
          const user = { email, name: "Demo User" };
          const token = "mock-jwt-token";
          dispatch({ type: "LOGIN", payload: { user, token } });
          resolve(user);
        } else {
          reject(new Error("Invalid email or password"));
        }
      }, 500);
    });
  }

  function logout() {
    dispatch({ type: "LOGOUT" });
  }

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
