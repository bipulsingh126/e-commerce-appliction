import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth.jsx";
import { SearchProvider } from "./context/Serach.jsx";
createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <SearchProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SearchProvider>
  </AuthProvider>
);
