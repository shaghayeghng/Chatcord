const io = require("socket.io")(8080, {
  //*note: by default it does not allow anyone to connect this server
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  if (!users.some((user) => user.userId === userId))
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  // when a user connected
  console.log("a user connected!");

  // to all connected clients
  // io.emit("welcome", "This is a message to all clients from socket server.");

  // take userId & socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  // send & get message
  socket.on("sendMessage", ({ senderId, recieverId, text }) => {
    const user = getUser(recieverId);
    console.log(user)
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  // when a user disconnected
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
