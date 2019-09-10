require("dotenv").config();
const knex = require("knex");
const knexConfig = require("../knexfile");

const Exercise = require("./exercises-model.js");

// connect database to knex
const database = knex(knexConfig.development);

const express = require("express");

const router = express();
router.use(express.json());

// GET EXERCISE table
router.get("/", async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  // database("exercises")
  //   .then(exercise => {
  //     res.status(200).json(exercises);
  //   })
  //   .catch(error => {
  //     console.log(error);
  //     res.status(500).json(error);
  //   });
});

//POST to EXERCISE table
router.post("/", (req, res) => {
  database("exercises")
    .insert(req.body, ["id", "name"])
    .then(ids => {
      database("exercises")
        .where({ id: ids[0] })
        .first()
        .then(r => {
          res.status(200).json(r);
        });
    })
    .catch(error => {
      res.status(500).json({ error: "POST ERROR!" });
    });
});

// GET EXERCISE table with ID

router.get("/:id", (req, res) => {
  database("exercises")
    .where({ id: req.params.id })
    .first()
    .then(specificExerciseID => {
      if (specificExerciseID) {
        res.status(200).json(specificExerciseID);
      } else {
        res.status(404).json({ message: "Exercise Id not found" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// DEL request to with ID
router.delete("/:id", (req, res) => {
  db("exercises")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(200).json({
          message: `${count} ${
            count > 1 ? "records DELETED" : "record DELETED"
          }`
        });
      } else {
        res.status(404).json({ message: "Exercise does not exist" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/now", (req, res) => {
  const now = new Date().toISOString();
  res.send(now);
});

module.exports = router;
