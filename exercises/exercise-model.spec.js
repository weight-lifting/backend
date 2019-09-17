const db = require("../data/config");
const Exercises = require("./exercises-model");

describe("exercises model", () => {
  describe("add", () => {
    afterEach(async () => {
      //clean up
      await db("exercises").truncate();
    });
    it("should insert a exercise into the db", async () => {
      //using our model method
      await Exercises.add({
        id: 0,
        title: "planks",
        reps_completed: 1,
        date: "2020-01-15",
        targeted_area: "neck",
        user_id: 0
      });
      await Exercises.add({
        id: 1,
        title: "planksss",
        reps_completed: 11,
        date: "2020-01-13",
        targeted_area: "brain",
        user_id: 1
      });

      //confirm with knex
      const exercises = await db("exercises");

      expect(exercises).toHaveLength(2);
    });
    it("should return new exercise on insert", async () => {
      const exercise = await Exercises.add({
        id: 1,
        title: "planks",
        reps_completed: 1,
        date: "2020-01-15",
        targeted_area: "neck",
        user_id: 0
      });

      expect(exercise).toEqual({
        id: 1,
        title: "planks",
        reps_completed: 1,
        date: "2020-01-15",
        targeted_area: "neck",
        user_id: 0
      });
    });
  });

  describe("findById", () => {
    afterEach(async () => {
      //clean up
      await db("exercises").truncate();
    });

    it("finds a exercise by id", async () => {
      //set up
      await Exercises.add({
        id: 0,
        title: "planks",
        reps_completed: 1,
        date: "2020-01-15",
        targeted_area: "neck",
        user_id: 0
      });
      await Exercises.add({
        id: 1,
        title: "planksss",
        reps_completed: 11,
        date: "2020-01-13",
        targeted_area: "brain",
        user_id: 1
      });

      const exercises = await Exercises.findById(2);

      expect(exercises).toBe();
    });

    it("returns undefined on invalid id", async () => {
      const exercises = await Exercises.findById(2);

      expect(exercises).toBeUndefined();
    });
  });

  describe("find", () => {
    afterEach(async () => {
      //clean up
      await db("exercises").truncate();
    });
    it("should return all exercises", async () => {
      //using our model method
      await Exercises.add({
        id: 0,
        title: "planks",
        reps_completed: 1,
        date: "2020-01-15",
        targeted_area: "neck",
        user_id: 0
      });
      await Exercises.add({
        id: 1,
        title: "planksss",
        reps_completed: 11,
        date: "2020-01-13",
        targeted_area: "brain",
        user_id: 1
      });

      //confirm with knex
      const exercises = await Exercises.find();
      expect(exercises).toHaveLength(2);
    });
  });

  describe("remove", () => {
    afterEach(async () => {
      //clean up
      await db("exercises").truncate();
    });
    it("removes specific exercise", async () => {
      //using our model method
      await Exercises.add({
        id: 0,
        title: "planks",
        reps_completed: 1,
        date: "2020-01-15",
        targeted_area: "neck",
        user_id: 0
      });
      await Exercises.add({
        id: 1,
        title: "planksss",
        reps_completed: 11,
        date: "2020-01-13",
        targeted_area: "brain",
        user_id: 1
      });

      //confirm with knex

      await Exercises.remove(1);
      const exercises = await db("exercises");
      expect(exercises).toHaveLength(1);
    });
  });

  describe("update", () => {
    afterEach(async () => {
      //clean up
      await db("exercises").truncate();
    });
    it("updates specific exercises", async () => {
      //using our model method

      const exercise_1 = {
        id: 0,
        title: "planks",
        reps_completed: 1,
        date: "2020-01-15",
        targeted_area: "neck",
        user_id: 0
      };
      const exercise_2 = {
        id: 1,
        title: "planksss",
        reps_completed: 11,
        date: "2020-01-13",
        targeted_area: "brain",
        user_id: 1
      };

      await Exercises.add(exercise_1);
      await Exercises.add(exercise_2);
      //confirm with knex
      const changes = {
        id: 1,
        title: "pl",
        reps_completed: 1,
        date: "2020-01-1",
        targeted_area: "br",
        user_id: 1
      };
      await Exercises.update(changes, 1);
      const exercises = await Exercises.findById(1);
      expect(exercises.id).toEqual(changes.id);
    });
  });
});
