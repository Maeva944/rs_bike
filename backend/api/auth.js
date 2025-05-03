const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db");
require('dotenv').config();
const router = express.Router();

router.post("/", async (req, res) => { 
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email et mot de passe requis." });
    }

    email = email.toLowerCase().trim();

    const isUserInputValid = (email) => {
      const pattern = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      return pattern.test(email);
    };

    if (!isUserInputValid(email)) {
      return res.status(401).json({ error: "Format d'email invalide." });
    }

    const result = await pool.query(`
      SELECT u.id, u.email, u.nom, u.prenom, u.tel, u.id_role AS roles, u.password
      FROM Users u
      JOIN Roles r ON u.id_role = r.id
      WHERE u.email = $1;
    `, [email]);

    if (result.rows.length === 0) {
      console.log("⛔ Utilisateur non trouvé :", email);
      return res.status(401).json({ error: "Email ou mot de passe incorrect." });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Mot de passe incorrect pour :", email);
      return res.status(401).json({ error: "Mot de passe incorrect." });
    }

    const token = jwt.sign(
      { id: user.id, role_id: user.roles },
      process.env.JWT_SECRET
    );
    
    res.json({ token });
    
  } catch (error) {
    console.error("Erreur de connexion :", error);
    res.status(500).json({ error: "Erreur serveur." });
  }
});

module.exports = router;




