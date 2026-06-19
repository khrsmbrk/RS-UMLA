import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import App from "./App.tsx";
import "./index.css";

// This will eventually replace the App.tsx component tree
// import { routeTree } from "./routeTree.gen";
// const router = createRouter({ routeTree });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
