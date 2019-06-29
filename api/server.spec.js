const request = require("supertest");
const server = require("./server.js");

describe("GET /games", () => {
  it("should return 200", async () => {
    const res = await request(server).get("/games");
    expect(res.status).toBe(200);
  });
  it("should return json", async () => {
    const res = await request(server).get("/games");
    expect(res.type).toBe("application/json");
  });
  it("should return an array", async () => {
    const res = await request(server).get("/games");
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe("POST /games", () => {
  it("should accept a Game object", async () => {
    const res = await request(server)
      .post("/games")
      .send({ title: "Pacman", genre: "Arcade", releaseYear: 1980 });
    expect(res.status).toBe(200);
  });
  it("should return an array", async () => {
    const res = await request(server)
      .post("/games")
      .send({ title: "Megaman", genre: "Platformer", releaseYear: 1987 });
    expect(Array.isArray(res.body)).toBe(true);
  });
  it("should return an array cotaining the Game object sent", async () => {
    const res = await request(server)
      .post("/games")
      .send({ title: "Chrono Trigger", genre: "RPG", releaseYear: 1995 });
    expect(res.body).toContainEqual({
      title: "Chrono Trigger",
      genre: "RPG",
      releaseYear: 1995
    });
  });
  it("should return a 422 when we give it an invalid Game object", async () => {
    const res = await request(server)
      .post("/games")
      .send({
        bookTitle: "Little Women",
        bookkGenre: "Coming of Age Story",
        releaseYear: 1868
      });
    expect(res.status).toBe(422);
  });
  it("should return a 405 when we give it dupliccate title", async () => {
    await request(server)
      .post("/games")
      .send({
        title: "Secret of Evermore",
        genre: "Action RPG",
        releaseYear: 1995
      });
    const res = await request(server)
      .post("/games")
      .send({
        title: "Secret of Evermore",
        genre: "Action RPG",
        releaseYear: 1995
      });
    expect(res.status).toBe(405);
  });
});
