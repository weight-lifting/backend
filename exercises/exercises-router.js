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
});

//POST to EXERCISE table
router.post("/", async (req, res) => {
  try {
    const exercise = await Exercise.add(req.body);
    if (exercise) {
      res.status(201).json(exercise);
    } else {
      res.status(404).json({ message: "exercise could not be added" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET EXERCISE table with ID

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const exercise = await Exercise.findById(id);

    if (exercise) {
      res.json(exercise);
    } else {
      res.status(404).json({ message: "could not find exercise" });
    }
  } catch (err) {
    res.status(500).json({ message: "failed to get exercise" });
  }
});

// DEL request to with ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Exercise.remove(id);

    if (deleted) {
      res.json({ removed: deleted });
    } else {
      res
        .status(404)
        .json({ message: "could not find exercise with given id" });
    }
  } catch (err) {
    res.status(500).json({ message: "failed to delete exercise" });
  }

  // db("exercises")
  //   .where({ id: req.params.id })
  //   .del()
  //   .then(count => {
  //     if (count > 0) {
  //       res.status(200).json({
  //         message: `${count} ${
  //           count > 1 ? "records DELETED" : "record DELETED"
  //         }`
  //       });
  //     } else {
  //       res.status(404).json({ message: "Exercise does not exist" });
  //     }
  //   })
  //   .catch(error => {
  //     res.status(500).json(error);
  //   });
});

router.get("/now", (req, res) => {
  const now = new Date().toISOString();
  res.send(now);
});

module.exports = router;
