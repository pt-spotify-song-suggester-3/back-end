const db = require("../data/dbConfig");

async function add(data) {
    const [id] = await db("users").insert(data, "id");

    return findBy({id})
}

function findBy(filter) {
    return db("users").where(filter).first();
}

function findAllBy(filter) {
    return db("users").where(filter);
}

async function update(id, data) {
     await db("users").update(data).where({id});

     return findBy({id});
}

function remove(id) {
    return db("users").where({id}).del();
}

function findUserPlaylistsById(id) {
    return db("playlists")
        .join("users", "users.id", "playlists.user_id")
        .select("name")
        .where({user_id: id});
}

function createPlaylist(data) {
    return db("playlists").insert(data);
}


module.exports = {
    add,
    findBy,
    findAllBy,
    update,
    remove,
    findUserPlaylistsById,
    createPlaylist
}