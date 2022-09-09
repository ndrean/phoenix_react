import React from "react";
import { useState } from "react";
import { useChannel } from "./channel";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import phoenixLogo from "./assets/phoenix.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";

const navStyle = { display: "flex" };
const ulStyle = {
  display: "flex",
  listStyleType: "none",
  justifyContent: "space-around",
  gap: "30px",
  width: "80%",
};
const liStyle = {
  display: "inline",
  borderStyle: "solid",
  padding: "20px",
  borderRadius: "10px",
};

const LHome = React.lazy(() => import("./Home"));
const SLHome = () => (
  <React.Suspense fallback={<p>L</p>}>
    <LHome />
  </React.Suspense>
);

const LPage = React.lazy(() => import("./Page"));
const SLPage = () => (
  <React.Suspense fallback={<p>L</p>}>
    <LPage />
  </React.Suspense>
);

export default function App() {
  // const params = new URLSearchParams(window.location.pathname);
  // console.log(params);
  return (
    <BrowserRouter basename="react">
      <nav style={navStyle}>
        <ul style={ulStyle}>
          <li>
            <Link style={liStyle} to="/">
              SPA Home
            </Link>
          </li>
          <li>
            <Link style={liStyle} to="/p">
              Page
            </Link>
          </li>
          <li>
            <a href="http://localhost:80" style={liStyle}>
              Phoenix API
            </a>
          </li>
        </ul>
      </nav>
      <br />
      <hr />
      <Routes>
        <Route path="/" element={<SLHome />} />
        <Route path="p" element={<SLPage />} />
      </Routes>
    </BrowserRouter>
  );
}
