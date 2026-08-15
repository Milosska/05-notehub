import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Styles
import "modern-normalize";
import "./global.css";

// Components
import App from "./components/App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
