import { Server } from "socket.io";
const PORT = 9000;

const io = new Server(PORT, {
  cors: {
    origin: "http://localhost:3000",
  },
});

//to add users
let users = [];

const addUser = (userId, socketId) => {
  //any already exitisng id of users
  !users.some(user => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter(user => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log("user connected");

  //connect
  socket.on("addUser", userId => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //to send message to user
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    //to send message to sender
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //when user gets disconnected
  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
