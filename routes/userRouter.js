const express = require("express");
const UserSchema = require("../models/userSchema");
const auth = require("../middleware/auth");
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator/check");
require("dotenv").config();

let jwtSecret = process.env.JWTSECRET;

//user details
app.get("/auth", auth, async (req, res) => {
  console.log(req.user.id);
  try {
    let user = await UserSchema.findOne({ _id: req.user.id });
    let isAdminFromEnvironment = user.email === process.env.ADMEMAIL;
    user = {
      name: user.name,
      email: user.email,
      username: user.username,
      admin: isAdminFromEnvironment,
    };
    res.status(200).send(user);

    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erro interno");
  }
});

//login
app.post(
  "/login",
  [
    check("email", "Inclua um e-mail válido").isEmail(),
    check("password", "Senha deve ter ao menos 6 caracteres").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      let user = await UserSchema.findOne({ email });
      if (!user) {
        return res.status(400).json({ errors: [{ msg: "Email inválido" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: "Senha inválida" }] });
      }
      let isAdminFromEnvironment = email === process.env.ADMEMAIL;

      const payload = {
        id: user._id,
      };

      jwt.sign(payload, jwtSecret, { expiresIn: 3600000 }, (err, token) => {
        if (err) throw err;
        res.status(200).send({ token, admin: isAdminFromEnvironment });

        res.status(200).json({ token, admin: isAdminFromEnvironment });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Erro interno");
    }
  }
);

app.post(
  "/register",
  [
    check("name", "Nome deve ser preenchido").not().isEmpty(),
    check("username", "Username deve ser preenchido").not().isEmpty(),
    check("email", "Email precisa ser válido").isEmail(),
    check("password", "Senha deve ter ao menos 6 caracteres").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    console.log("hit");
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, username } = req.body;

    try {
      let user = await UserSchema.findOne({ $or: [{ username, email }] });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Usuário/email já cadastrado" }] });
      }

      //Set a default admin from .env file
      let isAdminFromEnvironment = email === process.env.ADMEMAIL;
      user = {
        name,
        email,
        username,
        password,
        productCRUD: isAdminFromEnvironment,
        admin: isAdminFromEnvironment,
      };

      user.password = await bcrypt.hash(password, 10);
      const registeredUser = new UserSchema(user);
      console.log(user.password);

      try {
        let userSaved = await registeredUser.save();
        console.log("userSaved");
        console.log(userSaved);

        const payload = {
          id: userSaved._id,
        };
        console.log("will sign");

        jwt.sign(payload, jwtSecret, { expiresIn: 3600000 }, (err, token) => {
          if (err) throw err;
          console.log("sign");
          console.log(payload);
          console.log({ token, isAdminFromEnvironment });
          res.status(200).send({ token, admin: isAdminFromEnvironment });
          res.status(200).json({ token, admin: isAdminFromEnvironment });
        });
        // res.send(registeredUser);
      } catch (error) {
        console.log(error);
        console.error(error.message);

        res.status(500).send(error);
      }
    } catch (err) {
      console.log(err);
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = app;
