import { Socket } from "phoenix";

const socket = new Socket("ws://localhost:4000/socket");
socket.connect();

let channel = socket.channel("counter:lobby", {});
channel
  .join()
  .receive("ok", (resp) => {
    console.log("Joined successfully", resp);
  })
  .receive("error", (resp) => {
    console.log("Unable to join", resp);
  });

console.log(channel);
export { channel };
