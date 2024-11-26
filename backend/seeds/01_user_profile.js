/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("user_profile").del();
  await knex("users").del(); // Make sure to clear the users table as well

  // Insert seed data into users table
  await knex("users").insert([
    { id: 1, username: 'user_one', email: 'user.one@example.com', password: 'password1' },
    { id: 2, username: 'user_two', email: 'user.two@example.com', password: 'password2' }
  ]);

  // Fetch workout IDs for seeding purposes
  const workouts1 = await knex("workout_data")
    .select("id")
    .orderByRaw("RANDOM()")
    .limit(10);
  const workouts2 = await knex("workout_data")
    .select("id")
    .orderByRaw("RANDOM()")
    .limit(10);

  // Prepare seed data for user_profile
  const seedData = [
    ...workouts1.map((workout) => ({
      user_id: 1,
      id_workout: workout.id,
      id_workout_schedule: null,
      email: 'user.one@example.com',
    })),
    ...workouts2.map((workout) => ({
      user_id: 2,
      id_workout: workout.id,
      id_workout_schedule: null,
      email: 'user.two@example.com',
    })),
  ];

  // Insert the seed data into user_profile table
  await knex("user_profile").insert(seedData);
};
