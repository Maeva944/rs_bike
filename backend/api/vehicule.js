const express = require("express");
const pool = require("../db");

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const search = req.query.search || "";
        const searchTerm = search ? `%${search}%` : "%";

        const vehicule = await pool.query(`
            SELECT nom FROM vehicule
            WHERE LOWER(nom) LIKE LOWER($1)
        `, [searchTerm]);

        res.json(vehicule.rows);
    } catch (error) {
        console.error("Erreur lors de la récupération des véhicules :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

module.exports = router;
