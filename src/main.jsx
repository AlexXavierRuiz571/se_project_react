import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import { BrowserRouter } from "react-router-dom";

/**
 * Use Vite's BASE_URL:
 * - In dev BASE_URL === "/" => pass undefined to BrowserRouter so no basename is used.
 * - In production (e.g. GitHub Pages) BASE_URL === "/se_project_react/" => use that basename.
 */
const baseUrl = import.meta.env.BASE_URL;
const basename = baseUrl === "/" ? undefined : baseUrl.replace(/\/$/, "");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
