const express = require("express");
const pool = require("../db");

const router = express.Router();


router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM categorie ORDER BY id");
        res.json(result.rows);
    } catch (error) {
        console.error("❌ Erreur lors de la récupération des catégories :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

router.get("/vehicule/categorie/:id", async (req, res) => {
    const { id } = req.params;
    const { id_marque, id_type } = req.query;

    try {
        let query = `
            SELECT v.*, c.nom AS categorie, m.nom AS marque 
            FROM vehicule v
            INNER JOIN categorie c ON v.id_categorie = c.id
            INNER JOIN marque m ON v.id_marque = m.id
            WHERE v.id_categorie = $1
        `;
        let params = [id];

        if (id_marque) {
            query += " AND v.id_marque = $2";
            params.push(id_marque);
        }

        if (id_type) {
            query += " AND v.id_type = $3";
            params.push(id_type);
        }

        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (error) {
        console.error("❌ Erreur lors de la récupération des véhicules :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
});



module.exports = router;