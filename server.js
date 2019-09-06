const express = require("express");
const server = express();

server.use(express.json());
server.use("/api", apiRouter)

server.get("/", (req, res) => {
  res.send("Hello from GET /");
});

// =============== REGISTER ===============
server.post("/api/register", (req, res) => {});

// =============== LOGIN ===============
server.post("/api/login", (req, res) => {});

module.exports = server;
