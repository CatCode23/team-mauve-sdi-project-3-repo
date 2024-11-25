/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("user_profile", (table) => {
      table.increments("id");
      table.integer("id_workout")
      table.foreign("id_workout").references("workout_data.id")
      table.integer("id_workout_schedule")
      table.foreign("id_workout_schedule").references("workout_schedule.id")
       
    });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
      .alterTable("user_profile", (table) => {
        table.dropForeign("id_workout");
        table.dropForeign("id_workout_schedule");
      })
      .then(() => {
        return knex.schema.dropTableIfExists("user_profile");
      });
  };