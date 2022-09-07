import React from "react";
import { socket } from "./main";

const useChannel = (topic, evt, callback) => {
  const [channel, setChannel] = React.useState(null);
  React.useEffect(() => {
    if (!socket) return null;
    const myChannel = socket.channel(topic, {});
    myChannel.join().receive("ok", () => {
      console.log("Joined successfully");
      setChannel(myChannel);
    });

    myChannel.on(evt, callback);

    return () => {
      console.log("closing channel");
      myChannel.leave();
    };
  }, []);
  return channel;
};

export { useChannel };
