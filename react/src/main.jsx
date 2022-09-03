import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

import { Socket } from "phoenix";
const socket = new Socket("ws://localhost:4000/socket");
socket.connect();

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App socket={socket} />
  </React.StrictMode>
);
