import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // dev mode only: React request to localhost:3000/api forwarded to localhost:4000
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        secure: false,
        ws: true,
      },
    },
  },
  base: process.env.NODE_ENV === "production" ? "/webapp/" : "/",
});

// using the `webapp` base path for production builds
// So we can leverage Phoenix static assets plug to deliver
// our React app directly from our final Elixir app,
// Serving all files from the `priv/static/webapp` folder.
// NOTE: Remember to move the frontend build files to the
// `priv` folder during the application build process in CI
