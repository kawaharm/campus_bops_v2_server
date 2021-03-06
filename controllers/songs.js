require("dotenv").config();
const express = require('express');
const axios = require('axios');
const router = express.Router();
const querystring = require('query-string');
let buff = new Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`);
let authKey = buff.toString('base64');
let headers = {
    Authorization: `Basic ${authKey}`
};
const {
    Song,
} = require('../models');

/**
 * =======================================================
 * Songs
 * =======================================================
*/

/**
 * GET ROUTES
 * */

// GET all songs
router.get("/", (req, res) => {
    Song.findAll()
        .then(songList => {
            res.status(200).json({
                status: "success",
                data: {
                    songs: songList
                }
            })
        })
        .catch(err => {
            console.log(err);
        })
});

// GET song by ID
router.get("/:id", (req, res) => {
    Song.findByPk(req.params.id)
        .then(song => {
            if (song) {
                res.status(200).json({
                    status: "success",
                    data: {
                        song
                    }
                })
            } else {
                console.log('This song does not exist');
                // render a 404 page
                res.render('404', { message: 'This song does not exist' });
            }
        })
        .catch(err => {
            console.log(err);
        })
});


/**
 * POST ROUTES
 * */

// CREATE a song entry
router.post("/", (req, res) => {
    Song.create({
        CategoryId: req.params.id,
        title: req.body.title,
        artist: req.body.artist,
        album: req.body.album,
        albumCover: req.body.albumCover,
        songPlayerId: req.body.songPlayerId,
    })
        .then(newSong => {
            res.status(201).json({
                status: "success",
                data: {
                    song: newSong
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.render('404', { message: 'Song was not added please try again...' });
        });
});

// SEARCH BY SONG
router.post('/search', (req, res) => {
    // Make a AXIOS call (POST) to submit CLIENT_ID and CLIENT_SECRET
    axios.post('https://accounts.spotify.com/api/token',
        querystring.stringify({ grant_type: 'client_credentials' }),
        {
            headers: headers
        })
        .then(response => {
            token = response.data.access_token
            console.log('TOKEN ', token)
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            // Search query id for song title
            let track = req.body.title;

            // Make another axios (GET) to retrieve song data 
            axios.get(`https://api.spotify.com/v1/search?q=${track}&type=track&offset=0&limit=12`, config)
                .then(response => {
                    if (response) {
                        let items = response.data.tracks.items; // Array of songs data
                        console.log(items[0].album.images[1].url)
                        let songArray = []; // Array of obj containing songs data

                        // Encapsulate each song data into an object and push into songArray
                        for (const item of items) {
                            let song = {};
                            const songTitle = item.name;
                            const artists = item.artists.map(artist => artist.name).toString();    // Map artist array to obtain all artists in song 
                            const albumName = item.album.name;
                            const albumCover = item.album.images[1].url;
                            const songPlayerId = item.id;   // For embedded player
                            song.title = songTitle;
                            song.artist = artists;
                            song.album = albumName;
                            song.albumCover = albumCover;
                            song.songPlayerId = songPlayerId;
                            songArray.push(song);
                        }

                        res.status(200).json({
                            status: "success",
                            song: songArray
                        })
                    }
                    else {
                        console.log('This song does not exist');
                        // render a 404 page
                        res.render('404', { message: 'This song does not exist' });
                    }
                })
                .catch(err => {
                    console.log(err);
                });

        })
        .catch(err => {
            console.log(err)
        })
});


/**
 * DELETE ROUTES
 * */

router.delete('/:id', (req, res) => {
    Song.destroy({ where: { id: req.params.id } })
        .then(response => {
            console.log('SONG DELETED', response);
            res.status(200).json({
                status: "success",
            })
        })
        .catch(err => {
            console.log(err);
            res.render('404', { message: 'Song was not deleted, please try again...' });
        })
});

module.exports = router;
