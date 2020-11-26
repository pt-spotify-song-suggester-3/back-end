const User = require("./user-model");
const db = require("../data/dbConfig");

describe("user model", () => {
    describe("add", () => {
        beforeEach(async() => {
            await db("users").truncate();
        })
        it("should have the correct length after insertion", async() => {
            await User.add({username: "test1", password: "test1"});
            await User.add({username: "test2", password: "test2"});

            const users = await db("users");
            expect(users).toHaveLength(2);
        })
        it("should return the user object", async() => {
            testObj = await User.add({username: "test", password: "test_password1"});
            
            expect(testObj).toEqual({id: 1, username: "test", password: "test_password1"});
        })
    })

    beforeEach(async() => {
        await db("users").truncate();
        await User.add({username: "test1", password: "test1"});
        await User.add({username: "test2", password: "test2"});
    })

    describe("findBy", () => {
        it("should return user based on any part of user object", async() => {
            const foundName = await User.findBy({username: "test1"});

            expect(foundName).toEqual({id: 1, username: "test1", password: "test1"});

            const foundId = await User.findBy({id: 2});

            expect(foundId).toEqual({id: 2, username: "test2", password: "test2"});
        })
    })

    describe("update", () => {
        it("should update and return updated object", async() => {
            const updated = await User.update(1, {username: "updated1"});

            expect(updated).toEqual({id: 1, username: "updated1", password: "test1"});
        })
    })

    describe("remove", () => {
        it("should remove user and return number", async() => {
            const deleted = await User.remove(1);

            expect(deleted).toBe(1);
        })
    })

    beforeEach(async() => {
        await db("playlists").truncate();
    })

    describe("createPlaylist", () => {
        it("should take user id and create a new playlist entry and return the id", async() => {
            playlist = await User.createPlaylist({name: "test playlist1", user_id: 1})
            expect(playlist).toStrictEqual([1])
        })

        describe("findUserPlaylistById", () => {
            it("should find all playlists associated with user id", async() => {
                await User.createPlaylist({name: "test playlist1", user_id: 1});
                await User.createPlaylist({name: "test playlist2", user_id: 1});

                const userPlaylist = await User.findUserPlaylistsById(1);

                expect(userPlaylist).toHaveLength(2)
            })
            it("should return and array of playlist name objects", async() => {
                await User.createPlaylist({name: "test playlist1", user_id: 1});
                await User.createPlaylist({name: "test playlist2", user_id: 1});
                const userPlaylist = await User.findUserPlaylistsById(1);

                expect(userPlaylist[0]).toEqual({name: "test playlist1"})
            })
        })
    })
})