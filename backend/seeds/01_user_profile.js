/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("user_profile").del();
  const workouts1 = await knex("workout_data")
    .select("id")
    .orderByRaw("RANDOM()")
    .limit(10);

  const workouts2 = await knex("workout_data")
    .select("id")
    .orderByRaw("RANDOM()")
    .limit(10);

  const seedData = [
    ...workouts1.map((workout) => ({
      user_id: 1,
      id_workout: workout.id,
      id_workout_schedule: null,
    })),
    ...workouts2.map((workout) => ({
      user_id: 2,
      id_workout: workout.id,
      id_workout_schedule: null,
    })),
  ];
  await knex("user_profile").insert(seedData);
};
