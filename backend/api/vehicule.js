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
    console.log('ID du véhicule:', id);
  
    try {
      const vehiculeId = parseInt(id, 10);
      if (isNaN(vehiculeId)) {
        return res.status(400).json({ error: "L'ID du véhicule est invalide" });
      }
  
      const result = await pool.query(`
        SELECT 
          v.nom,
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
      `, [vehiculeId]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Véhicule non trouvé" });
      }
  
      res.json(result.rows[0]);
    } catch (error) {
      console.error("Erreur lors de la récupération du véhicule:", error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  });
  
  
router.post("/add", async (req, res) => {
    const { nom, cylindre, moteur, niveau_de_bruit, prix, puissance_maxi, photo, id_type, id_marque, id_couleur } = req.body;
  
    try {
      const result = await pool.query(
        `INSERT INTO vehicule (nom, cylindre, moteur, niveau_de_bruit, prix, puissance_maxi, photo, id_type, id_marque, id_couleur) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
        [nom, cylindre, moteur, niveau_de_bruit, prix, puissance_maxi, photo, id_type, id_marque, id_couleur]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error("Erreur lors de l'ajout du véhicule:", error);
      res.status(500).json({ error: "Erreur serveur." });
    }
  });
  
  
  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { nom, cylindre, moteur, niveau_de_bruit, prix, puissance_maxi, photo, id_type, id_marque, id_couleur } = req.body;
  
    try {
      const result = await pool.query(
        `UPDATE vehicule 
        SET nom = $1, cylindre = $2, moteur = $3, niveau_de_bruit = $4, prix = $5, puissance_maxi = $6, photo = $7, 
        id_type = $8, id_marque = $9, id_couleur = $10
        WHERE id = $11 RETURNING *`,
        [nom, cylindre, moteur, niveau_de_bruit, prix, puissance_maxi, photo, id_type, id_marque, id_couleur, id]
      );
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Véhicule non trouvé." });
      }
  
      res.json(result.rows[0]);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du véhicule:", error);
      res.status(500).json({ error: "Erreur serveur." });
    }
  });
  
  // Supprimer un véhicule
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await pool.query("DELETE FROM vehicule WHERE id = $1 RETURNING *", [id]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Véhicule non trouvé." });
      }
  
      res.json({ success: true, message: "Véhicule supprimé avec succès." });
    } catch (error) {
      console.error("Erreur lors de la suppression du véhicule:", error);
      res.status(500).json({ error: "Erreur serveur." });
    }
  });
  
module.exports = router;
