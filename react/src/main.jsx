import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Socket } from "phoenix";

const socket = new Socket("ws://localhost/socket", {
  params: { token: window.userToken },
});
socket.connect();
export { socket };

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
