const express = require("express");
const routerConn = require("./routes/connexion.route");
const routerChat = require("./routes/chatbot.route");
const authRouter = require("./routes/auth.route");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET , POST , GET , UPDATE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );

  next();
});

app.use("/connexion", routerConn);

app.use("/auth", authRouter);

app.use("/chatbot", routerChat);

app.use("/image", express.static(path.join(__dirname, "images")));

module.exports = app;
