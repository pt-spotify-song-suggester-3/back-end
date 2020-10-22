const { where } = require("../data/dbConfig");
const db = require("../data/dbConfig");

async function add(data) {
    const [id] = await db("users").insert(data);

    return findById(id)
}

// function add(data) {
//     return db("users").insert(data);
// }

function findBy(filter) {
    return db("users").where(filter).first();
}

function findById(id) {
    return db("users").where({id}).first();
}

function update(id, data) {
    return db("users").update(data).where({id});
}

function remove(id) {
    return db("users").where({id}).del();
}

function findUserPlaylistsById(id) {
    return db("playlists")
        .join("users", "users.id", "playlists.user_id")
        .select("*")
        .where({user_id: id});
}

function createPlaylist(data) {
    return db("playlists").insert(data);
}


module.exports = {
    add,
    findBy,
    findById,
    update,
    remove,
    findUserPlaylistsById,
    createPlaylist
}