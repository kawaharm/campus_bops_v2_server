require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const path = require("path");
const { School, Category, User, Song } = require("./models");
const axios = require("axios");
const bodyParser = require("body-parser");

// Code for Spotify API
let buff = new Buffer.from(
  `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
);
let authKey = buff.toString("base64");
let headers = {
  Authorization: `Basic ${authKey}`,
};

// Logs response status and time (ms)
// app.use(morgan("dev"));

// // Allow CORS for client-side requests
app.use(cors());

// Parse JSON object from frontend. Need for POST requests
app.use(bodyParser.json());

// CONTROLLERS
// *** Keep this above app.get("*") ***
app.use("/api/v1/schools", require("./controllers/schools"));
app.use("/api/v1/categories", require("./controllers/categories"));
app.use("/api/v1/songs", require("./controllers/songs"));

//PRODUCTION mode
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Configuring the server to work with form submissions and json files
app.use(express.json());

// //BUILD mode
// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client/public/index.html"));
// });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`You are listening on PORT ${port}`);
});
