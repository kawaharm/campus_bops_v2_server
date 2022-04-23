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

app.use(bodyParser.json());

// TEST TEST TEST
app.post("/api/server", (req, res) => {
  // const user = req.query.user || "kawaharm";
  // axios.get(`https://api.github.com/users/${user}`).then((response) => {
  //   res.json({
  //     user: response.data,
  //   });
  // });
  try {
    // console.log("API REQ BODY", req.body);
    // console.log("REQ BODY TO JSON", req.body.toJSON());
    // res.status(201).json({
    //   status: "success",
    //   data: {
    //     school: newSchool,
    //   },
    // });
    let stringConstructor = "test".constructor;
    let arrayConstructor = [].constructor;
    let objectConstructor = {}.constructor;

    function whatIsIt(object) {
      if (object === null) {
        console.log("this object is null");
      }
      if (object === undefined) {
        console.log("this object is undefined");
      }
      if (object.constructor === stringConstructor) {
        console.log("this object is string");
      }
      if (object.constructor === arrayConstructor) {
        console.log("this object is array");
      }
      if (object.constructor === objectConstructor) {
        console.log("this object is object");
        console.log(req.body);
      }
      {
        console.log("dont know");
      }
    }

    whatIsIt(req.body);
  } catch (err) {
    console.log("CATCH ERROR IN API POST", err);
  }
});

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
// app.use(express.static(path.join(__dirname, "client/public")));

// //BUILD mode
// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client/public/index.html"));
// });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`You are listening on PORT ${port}`);
});
