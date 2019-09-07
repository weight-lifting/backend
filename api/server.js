const express = require("express");
const server = express();
const configureMiddleware = require('./middleware.js');
//const authRouter = require('../auth/auth-router.js');
//const usersRouter = require('../users/users-router.js');

configureMiddleware(server);

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
