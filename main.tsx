import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app.css";
import LoginPage from "./login";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LoginPage />
  </StrictMode>,
);
