import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./app.css";
import LoginPage from "./login";
import MembersPage from "./members";

function App() {
  const [page, setPage] = useState<"login" | "members">("login");

  if (page === "members") {
    return <MembersPage onLogout={() => setPage("login")} />;
  }

  return <LoginPage onLogin={() => setPage("members")} />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
