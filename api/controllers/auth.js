const bcrypt = require("bcrypt");
const roles = require("../../config/roles");
const DB = require("../../db");
const sequelizeInstance = require("../../db");
const jwtToken = require("../utils/generateJwt");
const { v4 } = require("uuid");
const { QueryTypes } = require("sequelize");
const refreshUtils = require("../utils/refresh");
const authConfig = require("../../config/auth")

const sign_user_up = async (req, res) => {
  const { name, email, password } = req.body;
  const user_email = await sequelizeInstance.sequelize.query(
    "SELECT email FROM users",
    { type: QueryTypes.SELECT }
  );
  const email_exists = user_email.find((query) => query.email === email);
  if (email_exists) {
    return res.status(409).json({ error: "email already exists" });
  }
  const hash = await bcrypt.hash(password, 14);
  const user = await DB.User.create({
    user_id: v4(),
    user_name: name,
    password: hash,
    email: email,
    user_role: roles.Roles["User"],
  });
  return res.status(200).json(user);
};
const login_user = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  const user_data = await sequelizeInstance.sequelize.query(
    "SELECT * FROM users WHERE email = ?",
    {
      replacements: [email],
      type: QueryTypes.SELECT,
    }
  );
  const email_exists = user_data.find((query) => query.email === email);
  if (!email_exists)
    return res.status(401).json({ error: "user not found please signup" });
  var passwordIsValid = bcrypt.compareSync(password, user_data[0].password);
  if (!passwordIsValid) {
    return res.status(401).send({
      accessToken: null,
      message: "Invalid Password!",
    });
  }
  const { error, token } = await jwtToken.generateJwt(
    user_data[0].email,
    user_data[0].user_id
  );
  let refreshToken = await refreshUtils.createToken(user_data[0]);

  if (error) {
    return res.status(400).send({
      message: "unable to generate access token",
    });
  }

  return res.status(200).send({
    id: user_data[0].user_id,
    username: user_data[0].user_name,
    email: user_data[0].email,
    role: user_data[0].user_role,
    accessToken: token,
    refreshToken: refreshToken,
  });
};

const is_logged_in = async (req, res, next) => {
  res.status(200).send({
    message: "user logged in can see user content",
  });
};
const is_logged_in_admin = async (req, res, next) => {
  res.status(200).send({
    message: "admin logged in can see admin content",
  });
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (refreshToken == null) {
    return res.status(403).json({ message: "Refresh Token is Required" });
  }
  let refreshTokenDB = await sequelizeInstance.sequelize.query(
    "SELECT * FROM refreshes WHERE token = ?",
    {
      replacements: [refreshToken],
      type: QueryTypes.SELECT,
    }
  );
  if (!refreshTokenDB) {
    res.status(403).json({ message: "Refresh token is not in database!" });
    return;
  }
  if (refreshUtils.verifyExpiration(refreshTokenDB[0])) {
    await DB.Refresh.destroy({ where: { id: refreshTokenDB[0].id } });
    res.status(403).json({
      message: "Refresh token was expired. Please make a new signin request",
    });
    return;
  }
  const user = await sequelizeInstance.sequelize.query(
    "SELECT * FROM users WHERE user_id = ?",
    {
      replacements: [refreshTokenDB[0].id],
      type: QueryTypes.SELECT,
    }
  );
  let { token } = await jwtToken.generateJwt(user[0].email, user[0].user_id);
  return res.status(200).json({
    accessToken: token,
    refreshToken: refreshTokenDB[0].token,
  });
};

const logout = async (req, res) => {
  const {userId} = req.body
  if (!userId) return res.sendStatus(403)
  await DB.Refresh.destroy({where: {
    id: userId 
  }})
  return res.sendStatus(200)
}

module.exports = {
  sign_user_up,
  login_user,
  is_logged_in,
  is_logged_in_admin,
  refreshToken,
  logout
};
