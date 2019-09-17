const jwt = require("jsonwebtoken");

const secrets = require("../config/secret");
// const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);

  if (token) {
    jwt.verify(token, secrets.jwt, (err, payload) => {
      if (err) {
        res.status(403).json({ message: "you are not authorized" });
      } else {
        req.subject = payload.subject;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "No credentials provided" });
  }
};
