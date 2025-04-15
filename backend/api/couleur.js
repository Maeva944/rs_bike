const express = require("express");
const pool = require("../db");

const router = express.Router();


router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM couleur ORDER BY id");
        res.json(result.rows);
    } catch (error) {
        console.error("❌ Erreur lors de la récupération des couleurs :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

module.exports = router;