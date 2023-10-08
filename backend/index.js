import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import connect from "./connect.js";
import cookieParser from "cookie-parser";
import ws from "ws";
import jwt from "jsonwebtoken";
import authRoutes from "./routes/auth/auth.routes.js";
import lawyerRoutes from "./routes/lawyers.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import userModel from "./models/user.model.js";
import appintmentRoutes from "./routes/appointment.route.js";

const PORT = 5000;
const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json("Hello World");
});

app.use("/api/auth", authRoutes);
app.use("/api/lawyers", lawyerRoutes);
app.use("/api/write-review", reviewRoutes);
app.use("/api/appointment", appintmentRoutes);

const server = app.listen(PORT, () => {
  connect();
  console.log(`Server is running on port ${PORT}`);
});

// socket.io
// websockets server //
const io = new Server(server, {
  secure: true,
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.use((socket, next) => {
  const fname = socket.handshake.auth.fname;
  if (!fname) return next(new Error("Authentication error"));
  // jwt.verify(token, "secret", (err, decoded) => {
  //   if (err) return next(new Error("Authentication error"));
  //   socket.decoded = decoded;
  //   next();
  // });
  socket.fname = fname;
  socket.userId = socket.handshake.auth.userId;
  next();
});

io.on("connection", async (socket) => {
  const users = [];

  for (let [id, socket] of io.of("/").sockets) {
    console.log("socket", socket);
    users.push({
      userId: socket.userId,
      fname: socket.fname,
      isProvider: socket.isProvider,
    });
  }
  console.log("users", users);
  socket.emit("users", users);

  socket.emit("session", {
    userId: socket.userId,
    fname: socket.fname,
    isProvider: socket.isProvider,
  });

  socket.broadcast.emit("user connected", {
    userId: socket.userId,
    fname: socket.fname,
    isProvider: socket.isProvider,
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.userId, socket.fname);
    socket.broadcast.emit("user disconnected", {
      userId: socket.userId,
      fname: socket.fname,
      isProvider: socket.isProvider,
    });
  });
});

