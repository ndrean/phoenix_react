import React, { useState } from "react";
import { useChannel } from "./channel";

export default function Page() {
  const [msg, setMsg] = useState(0);

  function myCallback(resp) {
    setMsg(resp.count);
  }

  useChannel("counter:lobby", "shout", myCallback);

  return <h1>Total clicks received: {msg}</h1>;
}
