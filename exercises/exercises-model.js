const db = require("../data/config.js");

module.exports = {
  add,
  find,
  findBy,
  findById
};

function find() {
  return db("exercises").select("id");
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
    .select("id")
    .where({ id })
    .first();
}
