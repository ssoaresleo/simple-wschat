import { io } from "./server";

io.on("connection", (socket) => {
  console.log("New client connected " + socket.id);

  socket.on("message", (data) => {
    io.emit("message", data);
  });
});
