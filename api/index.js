const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");;
const path = require("path");

const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");
const conversationRouter = require("./routes/conversationRouter");
const messageRouter = require("./routes/messageRouter");

const app = express();

require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

const { PORT, DOMAIN, MONGODB } = process.env;

mongoose.connect(
  MONGODB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

//middleware
app.use(express.json());
app.use(morgan("dev"));

app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/conversation", conversationRouter);
app.use("/api/message", messageRouter);

//todo error controller

const server = app.listen(PORT || 8000, () => {
  console.log(`Server is up at http://${DOMAIN}:${PORT}`);
});

