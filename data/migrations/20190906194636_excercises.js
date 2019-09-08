
exports.up = function(knex) {
  return knex.schema.createTable("excercises", excerciseColumn => {
      //creates a primary key called id
      excerciseColumn.increments();
      excerciseColumn.text("title").notNullable();
      excerciseColumn.integer("reps_complted").notNullable();
      excerciseColumn.timestamp("date").notNullable();
      excerciseColumn.text("targeted_area").notNullable();
      excercsieColumn.integer("user_id")
        //forces integer to be positive
        .unsigned()
        .notNullable()
        .references("id")
        // this table must exist already
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('excercises');
};
