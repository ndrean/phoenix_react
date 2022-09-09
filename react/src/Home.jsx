import React, { useState } from "react";
import { useChannel } from "./channel";
import viteLogo from "./assets/vite.svg";
import reactLogo from "./assets/react.svg";
import phoenixLogo from "./assets/phoenix.svg";

export default function Home() {
  const [count, setCount] = useState(0);
  const [msg, setMsg] = useState(0);

  const myCallback = (resp) => setMsg(resp.count);

  const channel = useChannel("counter:lobby", "shout", myCallback);

  function handleClick() {
    setCount((count) => count + 1);
    if (channel) channel.push("count", { count: count + 1 });
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
        <a href="http://localhost" title="phoenix">
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
      <p>User token: {window.userToken}</p>
    </div>
  );
}
