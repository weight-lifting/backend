const express = require("express");
const server = express();
const configureMiddleware = require('./middleware.js');
const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

configureMiddleware(server);


server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get("/", (req, res) => {
  res.send("Hello from GET /");
});


module.exports = server;
