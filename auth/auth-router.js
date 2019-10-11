const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const restricted = require('./restricted-middleware');
const Users = require("../users/users-model");
const secrets = require("../config/secret");

function generateToken(user) {
  const payload = {
    subject: user.id, // sub in payload is what the token is about
    username: user.username
  };

  const options = {
    expiresIn: "1h" // show other available options in the library's documentation
  };
  // extract the secret away so it can be required and used where needed
  return jwt.sign(payload, secrets.jwt, options); // this method is synchronous
}

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  Users.add(user)
    .then(saved => {
      const token = generateToken(saved);

      res.status(201).json({
        message: `Welcome ${saved.username}!`,
        authToken: token
      });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//authenticate and log in existing user
router.post("/login", (req, res) => {
  //destructure username and password
  let { username, password } = req.body;
  //use findby method in model to username from req.body
  Users.findBy({ username })
    .first()
    .then(user => {
      //compare the hashed password in the database against the incoming password
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        req.headers.authorization = token;

        res.status(200).json({ message: `Welcome ${user.username}!`, token });
      } else {
        res.status(401).json({ message: `new phone who this` });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
