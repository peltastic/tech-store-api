const bcrypt = require("bcrypt");
const roles = require("../../config/roles");
const DB = require("../../db");
const jwtToken = require("../utils/generateJwt");
const refreshUtils = require("../utils/refresh");
const { v4 } = require("uuid");
const { QueryTypes } = require("sequelize");
const authConfig = require("../../config/auth");

const sign_user_up = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  if (!name || !email || !password) {
    console.log(name, email, password);
    return res.status(400).json({ error: "Enter Required Fields" });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: "Password too short" });
  }
  let user;
  try {
    const user_email = await DB.sequelize.query("SELECT email FROM users", {
      type: QueryTypes.SELECT,
    });
    const email_exists = user_email.find((query) => query.email === email);
    if (email_exists) {
      return res.status(409).json({ error: "email already exists" });
    }
    const hash = await bcrypt.hash(password, 14);
    user = await DB.User.create({
      user_id: v4(),
      user_name: name,
      password: hash,
      email: email,
      user_role: roles.Roles["User"],
    });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
  return res.status(200).json("success");
};

const login_user = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  if (password.length < 6) {
    return res.status(400).json({ error: "Password too short" });
  }
  let user_data;
  let refreshToken;
  let generate_token;

  try {
    user_data = await DB.sequelize.query(
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
    generate_token = await jwtToken.generateJwt(
      user_data[0].email,
      user_data[0].user_id
    );

    const isRefresh = await DB.sequelize.query(
      "SELECT id, token FROM refreshes where id = ?",
      {
        replacements: [user_data[0].user_id],
        type: QueryTypes.SELECT,
      }
    );
    if (!isRefresh) {
      refreshToken = await refreshUtils.createToken(user_data[0]);
    } else {
      refreshToken = isRefresh[0].token;
    }

    if (generate_token.error) {
      return res.status(400).send({
        message: "unable to generate access token",
      });
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
  return res
    .cookie("token", generate_token.token, 
      // httpOnly: true,
      // sameSite: "none",
      // secure: false,
      // expires: new Date(Date.now() + 3600000),
      // domain: "http://localhost:3000",
    )
    .status(200)
    .json({ message: "done" });
};

const user = async (req, res) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.sendStatus(400);
  }
  const decoded = await jwtToken.verifyJwt(token);
  if (decoded.error) {
    return res.status(400).json({ error: decoded.error });
  }
  const userId = decoded.decoded.id;
  const userinfo = await DB.sequelize.query(
    "SELECT email, user_name, user_role, user_id from users WHERE user_id = ?",
    {
      replacements: [userId],
      type: QueryTypes.SELECT,
    }
  );
  res.status(200).send(userinfo[0]);
};
const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(403).json({ message: "Refresh Token is Required" });
  }
  let refreshTokenDB;
  let user;
  try {
    refreshTokenDB = await DB.sequelize.query(
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
    user = await DB.sequelize.query("SELECT * FROM users WHERE user_id = ?", {
      replacements: [refreshTokenDB[0].id],
      type: QueryTypes.SELECT,
    });
  } catch (err) {
    return res.status(400).json({ error: err, message: "shhshsh" });
  }
  let { error, token } = await jwtToken.generateJwt(
    user[0].email,
    user[0].user_id
  );
  if (error) {
    return res.send(400).json(error, "refresh failed");
  }
  return res.status(200).json({
    accessToken: token,
    refreshToken: refreshTokenDB[0].token,
  });
};

const logout = async (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.sendStatus(403);
  await DB.Refresh.destroy({
    where: {
      id: userId,
    },
  });
  return res.sendStatus(200);
};

module.exports = {
  sign_user_up,
  login_user,
  user,
  refreshToken,
  logout,
};
