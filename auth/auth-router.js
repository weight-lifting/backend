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

router.post("/register", async (req, res) => {
  const userInfo = req.body;
  //generate the hash
  const hash = bcrypt.hashSync(userInfo.password, 12);
  //set the user password to our new hashed value
  userInfo.password = hash;

  try {
    if (userInfo) {
      const newUser = await Users.addUser(userInfo);

      if (newUser) {
        res.status(201).json(newUser);
      } else {
        res.status(400).json({
          message: "Error Adding the User to the database"
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      message: "Error"
    });
  }
});

//authenticate and log in existing user
router.post("/login", (req, res) => {
  //destructure username and password
  let { username, password } = req.body;
  const activeToken = req.headers.authorization;
  //use findby method in model to username from req.body
  Users.findBy({ username })
    .first()
    .then(user => {
      //compare the hashed password in the database against the incoming password
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

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
