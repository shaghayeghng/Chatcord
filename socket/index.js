const io = require("socket.io")(8080, {
  //*note: by default it does not allow anyone to connect this server
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
    console.log("a user connected!")
})