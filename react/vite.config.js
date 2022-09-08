import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: "/react/",
  // process.env.NODE_ENV === "production" ? "/react/" : "/",
  // base: process.env.NODE_ENV === "prod" ? "/" : "/react",
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "http://localhost:4000/socket",
  //       secure: false,
  //       ws: true,
  //     },
  //   },
  // },
});
