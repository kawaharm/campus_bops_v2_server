const express = require('express');
const router = express.Router();
const {
    School,
    Category,
    Song
} = require('../models');

/**
 * ============================
 * Schools
 * ============================
*/

/**
 * GET ROUTES
 * */

// GET all schools
router.get("/", async (req, res) => {
    School.findAll()
        .then(schoolList => {
            res.status(200).json({
                status: "success",
                results: schoolList
            })
        })
        .catch(err => {
            console.log(err);
        })
});

// GET school by ID
router.get("/:id", async (req, res) => {
    School.findByPk(req.params.id)
        .then(school => {
            if (school) {
                res.status(200).json({
                    status: "success",
                    results: school
                })
            } else {
                console.log('This school does not exist');
                // render a 404 page
                res.render('404', { message: 'This school does not exist' });
            }
        })
        .catch(err => {
            console.log(err);
        })
});


/**
 * POST ROUTES
 * */

// CREATE a school
router.post("/", (req, res) => {
    School.create({
        name: req.body.name,
    })
        .then(newSchool => {
            console.log('NEW SCHOOL', newSchool.toJSON());
            res.status(201).json({
                status: "success",
                data: {
                    school: newSchool
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.render('404', { message: 'School was not added please try again...' });
        });
});


/**
 * PUT ROUTES
 * */

router.put('/:id', function (req, res) {
    School.update({
        name: req.body.name
    }, { where: { id: req.params.id } })
        .then(response => {
            console.log('AFTER UPDATE', response);
            res.status(200).json({
                status: "success",
                data: {
                    school: response
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
    School.destroy({ where: { id: req.params.id } })
        .then(response => {
            console.log('SCHOOL DELETED', response);
            res.status(200).json({
                status: "success",
            })
        })
        .catch(err => {
            console.log(err);
            res.render('404', { message: 'School was not deleted, please try again...' });
        })
});

module.exports = router;
