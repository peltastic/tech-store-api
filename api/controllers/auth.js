// const dotenv = require('dotenv')
// const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt");
const roles = require("../config/roles");
const User = require("../../db");
const sequelizeInstance = require("../../db");
const jwtToken = require('../utils/generateJwt')
const { uuid } = require("uuidv4");
const { QueryTypes } = require("sequelize");

const test_func = async (req, res, next) => {
  const users = await sequelizeInstance.sequelize.query(
    "SELECT email FROM users",
    { type: QueryTypes.SELECT }
  );
  // const users_emails = User.User.findAll({
  //     attributes: ['email']
  // })

  console.log(users);
  return res.status(200).json(users);
};

const sign_user_up = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user_email = await sequelizeInstance.sequelize.query(
    "SELECT email FROM users",
    { type: QueryTypes.SELECT }
  );
  const email_exists = user_email.find((query) => query.email === email);
  console.log(email_exists);
  if (email_exists) {
    return res.status(409).json({ error: "email already exists" });
  }
  const hash = await bcrypt.hash(password, 14);
  const user = await User.User.create({
    userID: uuid(),
    userName: name,
    password: hash,
    email: email,
    userRole: roles.Roles["User"],
  });
  return res.status(200).json(user);
};
const login_user = async (req, res, next) => {
  const { email, password } = req.body;
  if (!user || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  const user_data = await sequelizeInstance.sequelize.query(
    "SELECT * FROM users WHERE email = ?",
    { 
        replacements: [email],
        type: QueryTypes.SELECT
     }
  );
  const email_exists = user_data.find((query) => query.email === email);
  if (!email_exists)
    return res.status(401).json({ error: "user not found please signup" });

  const passwordValid = bcrypt.compare('password', user_data.password)
  if (!passwordValid) {
      return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
      })
  }
  var {err, token} = jwtToken.generateJwt(user_data,email, user_data.userID)
};
module.exports = { sign_user_up, test_func };
