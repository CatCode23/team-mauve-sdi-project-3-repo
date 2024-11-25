const { parse } = require("../node_modules/csv-parse/dist/cjs/sync.d.cts");
const fs = require("fs");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = async function (knex) {
  await knex.schema.createTable("workout_data", (table) => {
    table.increments("id");
    table.date("activity_day");
    table.string("workout_type", 50);
    table.decimal("distance", 10, 2);
    table.integer("time");
    table.integer("calories");
    table.decimal("total_steps", 10, 0);
    table.decimal("avg_speed", 10, 2);
    table.decimal("avg_cadence", 10, 2);
    table.decimal("max_cadence", 10, 2);
    table.specificType("avg_pace", "INTERVAL");
    table.specificType("max_pace", "INTERVAL");
    table.specificType("min_pace", "INTERVAL");
    table.decimal("avg_heart_rate", 5, 1);
    table.decimal("max_heart_rate", 5, 1);
    table.decimal("min_heart_rate", 5, 1);
    table.decimal("vo2_max", 5, 1);
    table.decimal("aerobic", 5, 1);
    table.decimal("anaerobic", 5, 1);
    table.decimal("intensive", 5, 1);
    table.decimal("light", 5, 1);
  });

  const data = fs.readFileSync("./data/Activity_Dataset_V1.csv");
  const records = parse(data, {
    columns: true,
    skip_empty_lines: true,
  });

  for (const row of records) {
    await knex("workout_data").insert({
      activity_day: row.activity_day,
      workout_type: row.workout_type,
      distance: row.distance || null,
      time: row.time || null,
      calories: row.calories || null,
      total_steps: row.total_steps || null,
      avg_speed: row.avg_speed || null,
      avg_cadence: row.avg_cadence || null,
      max_cadence: row.max_cadence || null,
      avg_pace: row.avg_pace === "nan" ? null : row.avg_pace,
      max_pace: row.max_pace === "nan" ? null : row.max_pace,
      min_pace: row.min_pace === "nan" ? null : row.min_pace,
      avg_heart_rate: row.avg_heart_rate || null,
      max_heart_rate: row.max_heart_rate || null,
      min_heart_rate: row.min_heart_rate || null,
      vo2_max: row.vo2_max || null,
      aerobic: row.aerobic || null,
      anaerobic: row.anaerobic || null,
      intensive: row.intensive || null,
      light: row.light || null,
    });
  }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("workout_data");
};
