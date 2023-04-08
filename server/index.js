const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { userRouter } = require("./routes/user.routes");
const { connection } = require("./db");
app.use(cors());
app.use(express.json())
const server = http.createServer(app);
app.use("/users", userRouter)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
    console.log("send_message", data)
  })

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(3001, async () => {
  try {
    await connection;
    console.log("Serveer connected to database");
  } catch (err) {
    console.log(err);
  }
  console.log("Server running at http://localhost:3001");
});
