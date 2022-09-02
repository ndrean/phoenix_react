import React from "react";
import { Socket } from "phoenix";

function useChannel(topic, event, callback) {
  const [channel, setChannel] = React.useState(null);
  React.useEffect(() => {
    const socket = new Socket("ws://localhost:4000/socket");
    socket.connect();
    const myChannel = socket.channel(topic, {});
    setChannel(myChannel);
    myChannel
      .join()
      .receive("ok", (resp) => {
        console.log("Joined successfully", resp);
      })
      .receive("error", (resp) => {
        console.log("Unable to join", resp);
      });

    myChannel.on(event, callback);
    myChannel.on(event, callback);
    return () => myChannel.leave();
  }, []);
  return channel;
}

export { useChannel };
