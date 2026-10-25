import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// The browser talks to /api/*, Vite forwards it to json-server (npm run api, port 3001).
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    open: true,
    // json-server rewrites db.json on every POST/PUT/DELETE. Without this, Vite would reload the page each time.
    watch: { ignored: ["**/db.json", "**/db.seed.json"] },
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
