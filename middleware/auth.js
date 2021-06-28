const jwt = require("jsonwebtoken");
require("dotenv").config();

let jwtSecret = process.env.JWTSECRET;

module.exports = async function (req, res, next) {
  const token = req.header("x-auth-token") || req.body["x-auth-token"];

  if (!token) {
    return res.status(401).json({ msg: "Tentando autenticar sem token!" });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    console.log("decoded");
    console.log(decoded);

    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ msg: "Token inválido!" });
  }
};
