require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const db = require('./db');
const cors = require('cors');
const querystring = require('querystring');
const { School, Category, User, Song } = require('./models');

// Code for Spotify API
let buff = new Buffer.from(
  `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
);
let authKey = buff.toString('base64');
let headers = {
  Authorization: `Basic ${authKey}`,
};

// Logs response status and time (ms)
// app.use(morgan("dev"));

// // Allow CORS for client-side requests
// app.use(cors({
//     origin: "https://campus-bops.netlify.app/",
// }));
app.options('*',cors());

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

// Convert client's response from JSON to Javascript object
app.use(express.json());

// CONTROLLERS
app.use('/api/v1/schools', require('./controllers/schools'));
app.use('/api/v1/categories', require('./controllers/categories'));
app.use('/api/v1/songs', require('./controllers/songs'));

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
  }
}

const port = process.env.PORT || 3006;
app.listen(port, () => {
  console.log(`You are listening on PORT ${port}`);
});
