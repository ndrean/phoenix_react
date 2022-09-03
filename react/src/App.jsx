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
};
const liStyle = {
  display: "inline",
  borderStyle: "solid",
  padding: "20px",
  borderRadius: "10px",
};

function App({ socket }) {
  return (
    <BrowserRouter basename="app">
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
            <a href="http://localhost:4000" style={liStyle}>
              Phoenix API
            </a>
          </li>
        </ul>
        <br />
      </nav>
      <Routes>
        <Route path="/" element={<Home socket={socket} />} />
        <Route path="p" element={<Page socket={socket} />} />
      </Routes>
    </BrowserRouter>
  );
}

function Home({ socket }) {
  const [count, setCount] = useState(0);
  const [msg, setMsg] = useState(0);

  const myCallback = (resp) => setMsg(resp.count);

  const channel = useChannel(socket, "counter:lobby", "shout", myCallback);

  function handleClick() {
    setCount((count) => count + 1);
    channel.push("count", { count: count + 1 });
  }

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="http://localhost:4000" title="phoenix">
          <img src={phoenixLogo} className="logo" alt="Phoenix logo" />
        </a>
        <p className="read-the-docs">Click on the Phoenix logo to go the API</p>
        <hr />
      </div>
      <h1>Phoenix, React, Vite</h1>
      <hr />
      <div className="card">Total clicks received: {msg}</div>
      <div className="card">
        <button onClick={handleClick}>count is {count}</button>
      </div>
    </div>
  );
}

function Page({ socket }) {
  const [msg, setMsg] = useState(0);

  function myCallback(resp) {
    setMsg(resp.count);
  }
  useChannel(socket, "counter:lobby", "shout", myCallback);

  return <h1>Page: {msg}</h1>;
}

export default App;
