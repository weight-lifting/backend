require("dotenv").config();

const knex = require("knex");
const knexConfig = require("../knexfile");
const restricted = require("../auth/restricted-middleware");

const Exercise = require("./exercises-model.js");


const express = require("express");

const router = express();
router.use(express.json());

// GET EXERCISE table
router.get("/", restricted, async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//POST to EXERCISE table
router.post("/", restricted, async (req, res) => {
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

router.get("/:id", restricted, async (req, res) => {
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
router.delete("/:id", restricted, async (req, res) => {
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
});

router.put("/:id", restricted, async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    const exercise = await Exercise.findById(id);

    if (exercise) {
      const updatedExercise = await Exercise.update(changes, id);
      console.log(exercise);

      res.json(updatedExercise);
    } else {
      res
        .status(404)
        .json({ message: "could not find exercise with given id" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to update exercise" });
  }
});

router.get("/now", (req, res) => {
  const now = new Date().toISOString();
  res.send(now);
});

module.exports = router;
