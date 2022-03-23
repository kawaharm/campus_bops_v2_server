const express = require('express');
const router = express.Router();
const {
    Category,
    Song
} = require('../models');

/**
 * =======================================================
 * Categories
 * =======================================================
*/

/**
 * GET ROUTES
 * */

// GET all categories
router.get("/", async (req, res) => {
    Category.findAll()
        .then(categoryList => {
            res.status(200).json({
                status: "success",
                data: {
                    categories: categoryList
                }
            })
        })
        .catch(err => {
            console.log(err);
        })
});

// GET category by ID
router.get("/:id", async (req, res) => {
    Category.findByPk(req.params.id)
        .then(category => {
            if (category) {
                res.status(200).json({
                    status: "success",
                    data: {
                        category
                    }
                })
            } else {
                console.log('This category does not exist');
                // render a 404 page
                res.render('404', { message: 'This category does not exist' });
            }
        })
        .catch(err => {
            console.log(err);
        })
});


/**
 * POST ROUTES
 * */

router.post("/", (req, res) => {
    Category.create({
        name: req.body.name,
    })
        .then(newCategory => {
            res.status(201).json({
                status: "success",
                data: {
                    category: newCategory
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.render('404', { message: 'Category was not added please try again...' });
        });
});

// CREATE new song associated with category id
router.post("/:id/addSong", (req, res) => {
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
        })
})


/**
 * PUT ROUTES
 * */

router.put('/:id', function (req, res) {
    Category.update({
        name: req.body.name
    }, { where: { id: req.params.id } })
        .then(response => {
            console.log('AFTER UPDATE', response);
            res.status(200).json({
                status: "success",
                data: {
                    category: response
                },
            })
        })
        .catch(err => {
            console.log(err);
            res.render('404', { message: 'Update was not successful. Please try again.' })
        });
});


/**
 * DELETE ROUTES
 * */

router.delete('/:id', function (req, res) {
    Category.destroy({ where: { id: req.params.id } })
        .then(response => {
            console.log('SCHOOL DELETED', response);
            res.status(200).json({
                status: "success",
            })
        })
        .catch(err => {
            console.log(err);
            res.render('404', { message: 'Category was not deleted, please try again...' });
        })
});

module.exports = router;
