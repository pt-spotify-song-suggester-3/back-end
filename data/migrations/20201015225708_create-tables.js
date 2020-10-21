
exports.up = function(knex) {
  return knex.schema
  .createTable("users", tbl => {
      tbl.increments();
      tbl.string("username", 255).notNullable().unique();
      tbl.string("password", 255).notNullable().unique();
  })
  .createTable("playlists", tbl => {
    tbl.increments();
    tbl.string("name", 255).unique().notNullable();
    tbl.string("user_id", 255).notNullable();
  })
  .createTable("playlist-songs", tbl => {
    tbl.increments();
    tbl.string("playlist_id", 255).notNullable();
    tbl.string("song_id", 255).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists("users")
  .dropTableIfExists("playlists")
  .dropTableIfExists("playlist-songs");
};
