const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");;
const path = require("path");

// const userRoute = require("./routes/users");
// const authRoute = require("./routes/auth");
// const postRoute = require("./routes/posts");
// const conversationRoute = require("./routes/conversations");
// const messageRoute = require("./routes/messages");

const app = express();

require("dotenv").config({
  path: path.join(__dirname, "config.env"),
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

// app.use("/api/auth", authRoute);
// app.use("/api/users", userRoute);
// app.use("/api/posts", postRoute);
// app.use("/api/conversations", conversationRoute);
// app.use("/api/messages", messageRoute);

//todo error controller

const server = app.listen(PORT || 8000, () => {
  console.log(`Server is up at http://${DOMAIN}:${PORT}`);
});
