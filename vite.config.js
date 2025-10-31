import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    port: 3000,
  },
  // Use the repo base only in production; use root (/) in dev
  base: mode === "production" ? "/se_project_react/" : "/",
}));
