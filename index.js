const express = require("express");
const path = require("path");
const dbconfig = require("./config/dbconfig");

// controllers
const {
  createShortUrl,
  getUrlData,
  redirect,
} = require("./controllers/urlsController");

require("dotenv").config();

// initilizing server
const app = express();

// connecting database
dbconfig(process.env.DBURL);

// setting middlware for parsing data
app.use(express.urlencoded({ extended: false }));

// setting error middlware
app.use((err, req, res, next) => {
  console.log(err.stack);
});

// setting view engine
app.set("view engine", "ejs");

// setting path to views folder
app.set("views", path.resolve("./views"));

app.get("/", getUrlData);
app.post("/shorten", createShortUrl);
app.get("/id/:shortid", redirect);

// starting server at port 5000
app.listen(process.env.PORT || 5000, (err) => {
  if (err) {
    console.log(err.stack);
  }
  console.log("server started at port " + process.env.PORT);
});
