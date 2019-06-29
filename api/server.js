const express = require("express");

const server = express();

server.use(express.json());

let Games = [];

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/games", (req, res) => {
  res.status(200).json(Games);
});

server.post("/games", (req, res) => {
  const { title, genre, releaseYear } = req.body;
  const newGame = { title, genre, releaseYear };
  if (!title || !genre) {
    res.status(422);
    res.json({ Error: "please include both a title and genre" });
  }
  const findGameByTitle = game => {
    return game.title === title;
  };
  if (Games.find(findGameByTitle)) {
    res.status(405);
    res.json({ Error: "a game with this name already exists in the db" });
  }

  Games.push(newGame);
  res.json(Games);
});

module.exports = server;
