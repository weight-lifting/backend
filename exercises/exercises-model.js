const db = require("../data/config.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
  remove,
  update
};

function find() {
  return db("exercises");
}

function findBy(filter) {
  return db("exercises").where(filter);
}

async function add(exercise) {
  const [id] = await db("exercises").insert(exercise);

  return findById(id);
}

function findById(id) {
  return db("exercises")
    .where({ id })
    .first();
}

async function remove(id) {
  try {
    deletedExercise = await findById(id);
    const getExercise = await db("exercises")
      .where({ id })
      .del();
    return getExercise ? getExercise : null;
  } catch {
    throw new Error(err);
  }
}

// async function update(exercise, id) {
//   try {
//     const updateExercise = await db("exercises")
//       .where({ id })
//       .update(exercise);
//     return updateExercise;
//   } catch {
//     throw new Error(err);
//   }
// }

function update(id, exercise) {
  return db('exercises')
  .where({ id })
  .update(exercise, '*')
}
