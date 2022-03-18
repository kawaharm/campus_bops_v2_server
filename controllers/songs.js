const express = require('express');
const router = express.Router();
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
