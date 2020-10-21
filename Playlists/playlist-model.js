const db = require("../data/dbConfig");

function findById(id) {
    return db("playlists").where({id})
}

function createPlaylist(data) {
    return db("playlists").insert(data);
}

function updatePlaylist(id, data) {
    return db("playlists").update(data).where({id});
}

function removePlaylist(id) {
    return db("playlists").where({id}).del();
}

function findUserPlaylistsById(id) {
    return db("playlists")
        .join("users", "users.id", "playlists.user_id")
        .select("*")
        .where({user_id: id});
}

function addSongToPlaylist(data) {
    return db("playlist-songs").insert(data);
}

function getSongsByPlaylist(id) {
    return db("playlists")
        .join("playlist-songs", "playlists.id", "playlist-songs.playlist_id")
        .select("*")
        .where({playlist_id: id});
}

module.exports = {
    findById,
    createPlaylist,
    updatePlaylist,
    removePlaylist,
    findUserPlaylistsById,
    addSongToPlaylist,
    getSongsByPlaylist
}