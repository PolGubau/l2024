import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppProviders from "./providers";
import { Router } from "./Router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppProviders>
      <Router />
    </AppProviders>
  </React.StrictMode>
);
