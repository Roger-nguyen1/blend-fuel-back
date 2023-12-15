require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var db = require("./models/connection");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

const cors = require("cors");
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

async function startServer() {
  try {
    await db.connect();
    console.log("La connexion à la base de données a réussi !");
  } catch (err) {
    console.error("La connexion à la base de données a échoué", err);
  }
}

startServer();

module.exports = app;
