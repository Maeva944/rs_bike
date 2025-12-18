const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const router = express.Router();

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET manquant");
}

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: "Trop de tentatives. Réessayez plus tard." }
});

router.post("/", loginLimiter, async (req, res) => {
  try {
    let { email, password } = req.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      email.length > 255 ||
      password.length > 128
    ) {
      return res.status(400).json({ error: "Identifiants invalides." });
    }

    email = email.toLowerCase().trim();

    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailRegex.test(email)) {
      return res.status(401).json({ error: "Identifiants invalides." });
    }

    const result = await pool.query(
      "SELECT id, password FROM Users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Identifiants invalides." });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Identifiants invalides." });
    }

    const token = jwt.sign(
  {
    id: user.id,
    role: user.id_role
  },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);


    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur." });
  }
});

module.exports = router;




