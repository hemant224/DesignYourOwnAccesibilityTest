if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const authRouters = require("./routes/auth-routes");
require("./config/passport-setup");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const cors = require("cors");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// set up session cookies
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.cookieKey],
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

//connect to mongodb

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "front/build")));

app.use("/", indexRouter);
app.use("/auth", authRouters);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
