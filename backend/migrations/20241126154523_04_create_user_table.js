/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('role', function(table) {
      table.increments('id');
      table.string('role_name');
    })
    .createTable('team', function (table) {
      table.increments('id');
      table.string('team_name');
    })
    .createTable('users', function (table) {
      table.increments('id');
      table.string('username');
      table.string('password')
      table.string('first_name');
      table.string('last_name');
      table.integer('role_id');
      table.foreign('role_id').references('id').inTable('role').onDelete('cascade')
      table.integer('team_id');
      table.foreign('team_id').references('id').inTable('team').onDelete('cascade')
      table.integer('user_workout_data_id');
      table.foreign('user_workout_data_id').references('id').inTable('workout_schedule').onDelete('cascade')
      table.integer('user_workout_schedule_id');
      table.foreign('user_workout_schedule_id').references('id').inTable('workout_schedule').onDelete('cascade')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .alterTable('users', function (table) {
      table.dropForeign('role_id')
      table.dropForeign('team_id')
      //table.dropForeign('user_profile_id')
      table.dropForeign('user_workout_data_id')
      table.dropForeign('user_workout_schedule_id')
    })
    .then( function () {
      return knex.schema
        .dropTableIfExists('role')
        .dropTableIfExists('team')
        .dropTableIfExists('users')
    })

};
