exports.up = function(knex) {
    return knex.schema.table('user_profile', function(table) {
      table.string('email').notNullable(); // Add email column to user_profile
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('user_profile', function(table) {
      table.dropColumn('email'); // Rollback if necessary
    });
  };
  