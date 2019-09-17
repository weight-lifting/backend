require("dotenv").config();
module.exports = {
  jwt: process.env.JWT_SECRET || "try this one"
};
