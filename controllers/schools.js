const express = require("express");
const router = express.Router();
const { School, Category } = require("../models");

/**
 * =======================================================
 * Schools
 * =======================================================
 */

/**
 * GET ROUTES
 * */

// GET all schools
router.get("/", (req, res) => {
  School.findAll()
    .then((schoolList) => {
      res.status(200).json({
        status: "success",
        data: {
          schools: schoolList,
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// GET school by ID
router.get("/:id", (req, res) => {
  School.findByPk(req.params.id)
    .then((school) => {
      if (school) {
        // Show all categories associated with school
        school
          .getCategories()
          .then((categories) => {
            res.status(200).json({
              status: "success",
              school,
              categories,
            });
          })
          .catch(function (err) {
            console.log("Error finding categories in school", err);
          });
      } else {
        console.log("This school does not exist");
        // render a 404 page
        res.render("404", { message: "This school does not exist" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

/**
 * POST ROUTES
 * */

// CREATE a school
router.post("/", (req, res) => {
  console.log("REQ BODY", req.body);
  console.log("REQ BODY NAME", req.body.name);
  School.create({
    name: req.body.name,
  })
    .then((newSchool) => {
      console.log("NEW SCHOOL", newSchool.toJSON());
      res.status(201).json({
        status: "success",
        data: {
          school: newSchool,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.render("404", {
        message: "School was not added please try again...",
      });
    });
});

// CREATE new category associated with school id
router.post("/:id/addCategory", (req, res) => {
  Category.create({
    SchoolId: req.params.id,
    name: req.body.name,
  })
    .then((newCategory) => {
      console.log("New Category", newCategory.toJSON());
      res.status(201).json({
        status: "success",
        data: {
          category: newCategory,
        },
      });
    })
    .catch((err) => {
      console.log("ERROR: ", err);
    });
});

/**
 * PUT ROUTES
 * */

router.put("/:id", (req, res) => {
  School.update(
    {
      name: req.body.name,
    },
    { where: { id: req.params.id } }
  )
    .then((response) => {
      console.log("AFTER UPDATE", response);
      res.status(200).json({
        status: "success",
        data: {
          school: response,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.render("404", {
        message: "Update was not successful. Please try again.",
      });
    });
});

/**
 * DELETE ROUTES
 * */

router.delete("/:id", (req, res) => {
  School.destroy({ where: { id: req.params.id } })
    .then((response) => {
      console.log("SCHOOL DELETED", response);
      res.status(200).json({
        status: "success",
      });
    })
    .catch((err) => {
      console.log(err);
      res.render("404", {
        message: "School was not deleted, please try again...",
      });
    });
});

module.exports = router;
