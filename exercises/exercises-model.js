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
  return db("exercise").where(filter);
}

async function add(user) {
  const [id] = await db("exercise").insert(user);

  return findById(id);
}

function findById(id) {
  return db("exercise")
    .select("id")
    .where({ id })
    .first();
}
