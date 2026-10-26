import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// The browser talks to VITE_API_URL (/api); Vite forwards it to json-server (VITE_API_PROXY_TARGET).
export default defineConfig(({ mode }) => {
  // This file runs in Node, where import.meta.env is not available, so read .env with loadEnv.
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const apiPath = env.VITE_API_URL || "/api";

  return {
    base: env.VITE_BASE || "/",
    plugins: [react(), tailwindcss()],
    server: {
      open: true,
      // json-server rewrites db.json on every POST/PUT/DELETE. Without this, Vite would reload the page each time.
      watch: { ignored: ["**/db.json", "**/db.seed.json"] },
      proxy: {
        [apiPath]: {
          target: env.VITE_API_PROXY_TARGET || "http://localhost:3001",
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(`^${apiPath}`), ""),
        },
      },
    },
  };
});
