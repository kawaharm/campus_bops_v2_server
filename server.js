require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const db = require("./db");
const cors = require("cors");
const path = require("path");
const querystring = require("querystring");
const { School, Category, User, Song } = require("./models");
const res = require("express/lib/response");

// Code for Spotify API
let buff = new Buffer.from(
  `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
);
let authKey = buff.toString("base64");
let headers = {
  Authorization: `Basic ${authKey}`,
};

// // TEST TEST TEST
// app.get("/test", (req, res) => {
//   res.json({
//     people: "i just came to say hello",
//   });
// });

// Logs response status and time (ms)
// app.use(morgan("dev"));

// // Allow CORS for client-side requests
app.use(cors());

// Serve static files from the React app
app.use(express.json());
app.use(express.static(path.join(__dirname, "client/public")));

// CONTROLLERS
// *** Keep this above app.get("*") ***
app.use("/api/v1/schools", require("./controllers/schools"));
app.use("/api/v1/categories", require("./controllers/categories"));
app.use("/api/v1/songs", require("./controllers/songs"));

//PRODUCTION mode
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  });
}
//BUILD mode
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/public/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`You are listening on PORT ${port}`);
});
