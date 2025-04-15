const express = require("express");
const pool = require("../db");

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const search = req.query.search || "";
        const searchTerm = search ? `%${search}%` : "%";

        const vehicule = await pool.query(`
            SELECT * FROM vehicule
            WHERE LOWER(nom) LIKE LOWER($1)
        `, [searchTerm]);

        res.json(vehicule.rows);
    } catch (error) {
        console.error("Erreur lors de la récupération des véhicules :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

router.get('/vehiculedetail/:id', async (req, res) => {
    const { id } = req.params;

    try{
        const result = await pool.query(`
        SELECT v.nom,
        v.cylindre,
        v.moteur,
        v.niveau_de_bruit,
        v.prix,
        v.puissance_maxi,
        v.photo,
        t.nom AS type,
        m.nom AS marque,
        c.nom AS couleur
        FROM vehicule v
        INNER JOIN type_vehicule t ON v.id_type = t.id
        INNER JOIN marque m ON v.id_marque = m.id
        INNER JOIN couleur c ON v.id_couleur = c.id
        WHERE v.id = $1;
        `
        [id]);

        if(!result.rows.length > 0){
            return res.status(404).json({ error: "Véhicule non trouvé" });
        }
    }catch (error) {
        console.error("Erreur lors de la récupération du technicien :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
})
module.exports = router;
