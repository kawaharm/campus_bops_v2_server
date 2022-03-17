require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const db = require("./db");
const cors = require("cors");
const {
    School,
    Category,
    User,
    Song
} = require('./models');

// Logs response status and time (ms)
// app.use(morgan("dev"));

// Allow CORS
app.use(cors())
// Convert client's response from JSON to Javascript object
app.use(express.json());


// app.get('/', (req, res) => {
//     School.findAll()
//         .then(function (schoolList) {
//             res.render('homepage', { schools: schoolList })
//         })
//         .catch(function (err) {
//             console.log('ERROR', err);
//             res.json({ message: 'Error occured, please try again....' });
//         });
// })

// CONTROLLERS
app.use('/api/v1/schools', require('./controllers/schools'));


const port = process.env.PORT || 3006;
app.listen(port, () => {
    console.log(`You are listening on PORT ${port}`)
});