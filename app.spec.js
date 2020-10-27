const request = require("supertest");
const app = require("./app");
const db = require("./data/dbConfig");

//correct user object based on database schema
const testUser = {
    username: "Test",
    password: "Password"
};

//incorrect user object to test fail routes
const failUser = {
    name: "Incorrect",
    password: undefined
};

describe("app.js", () => {
    describe("User Router", () => {
        describe("register endpoint", () => {
            it("should return status code 201 on testUser", async() => {
                await db("users").truncate();

                const res = await request(app).post("/api/user/register").send(testUser);
                expect(res.status).toBe(201)
            });
            it("should return 500 for invalid user", async() => {
                const res = await request(app).post("/api/user/register").send(failUser)
                expect(res.status).toBe(500)
            });
        });
        describe("login endpoint", () => {
            it("should return status code 201 on testUser", async() => {
                const res = await request(app).post("/api/user/login").send(testUser); 
                expect(res.status).toBe(200)
            });
            it("should return 500 for invalid user", async() => {
                const res = await request(app).post("/api/user/login").send(failUser)
                expect(res.status).toBe(500)
            });
        })
        describe("get user endpoint", () => {
            it("should fail with 401 without authorization header", async() => {
                const res = await request(app).get("/api/user/1")
                expect(res.status).toBe(401)
            });
            it("should return json", async() => {
                const res = await request(app).get("/api/user/1");
                expect(res.type).toBe("application/json");
            });
        });
    });
});