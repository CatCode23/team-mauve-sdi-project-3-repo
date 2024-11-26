const bcrypt = require('bcryptjs');
var passHash = bcrypt.hashSync('test', 10)

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('role').del()
  await knex('team').del()
  await knex('workout_schedule').del()
  await knex('user_profile').del()
  await knex('users').del()


  await knex('role').insert([
    {id: 1, role_name: 'user'},
    {id: 2, role_name: 'leader'},
    {id: 3, role_name: 'admin'}
  ]);
  await knex('team').insert([
    {id: 1, team_name: 'Team 1'}
  ]);
  await knex('workout_schedule').insert([
    {date: '2024-11-01', time:'06:30'},
    {date: '2024-11-01', time:'07:30'},
    {date: '2024-11-02', time:'08:00'},
  ]);
  // await knex('user_profile').insert([
  //   {id_workout: 1, id_workout_schedule: 1},
  //   {id_workout: 2, id_workout_schedule: 2},
  //   {id_workout: 4, id_workout_schedule: 3},
  //   {id_workout: 1, id_workout_schedule: 4},
  //   {id_workout: 4, id_workout_schedule: 5},
  //   {id_workout: 12, id_workout_schedule: 6},
  //   {id_workout: 8, id_workout_schedule: 7},
  //   {id_workout: 16, id_workout_schedule: 8},
  //   {id_workout: 19, id_workout_schedule: 9},
  //   {id_workout: 50, id_workout_schedule: 10},
  //   {id_workout_schedule: 11}
  //]);
  await knex('users').insert([
    {username: 'test', password: passHash, first_name: 'Joe', last_name: 'Snuffy', role_id: 1, team_id: 1, user_workout_data_id: 1, user_workout_schedule_id: 1},
    {username: 'test1', password: passHash, first_name: 'Billy', last_name: 'Bob', role_id: 2, team_id: 1, user_workout_data_id: 2, user_workout_schedule_id: 2},
    {username: 'test2', password: passHash, first_name: 'Jack', last_name: 'Bauer', role_id: 3, team_id: 1, user_workout_data_id: 3, user_workout_schedule_id: 3},
  ])
};
