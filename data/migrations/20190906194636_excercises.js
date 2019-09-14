exports.up = function(knex) {
  return knex.schema.createTable("exercises", exerciseColumn => {
    //creates a primary key called id
    exerciseColumn.increments();
    exerciseColumn.text("title").notNullable();
    exerciseColumn.integer("reps_completed").notNullable();
    exerciseColumn.timestamp("date").notNullable();
    exerciseColumn.text("targeted_area").notNullable();
    exerciseColumn
      .integer("user_id")
      //forces integer to be positive
      .unsigned()
      .notNullable()
      .references("id")
      // this table must exist already
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("exercises");
};
