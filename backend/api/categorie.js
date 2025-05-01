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
            SELECT v.*, c.nom AS categorie, m.nom AS marque, t.nom AS type_vehicule 
            FROM vehicule v
            INNER JOIN categorie c ON v.id_categorie = c.id
            INNER JOIN marque m ON v.id_marque = m.id
            INNER JOIN type_vehicule t ON v.id_type = t.id
            WHERE v.id_categorie = $1
        `;
        let params = [id];

        if (id_marque && !id_type) {
            query += " AND v.id_marque = $2";
            params.push(id_marque);
        }

        if (id_type && !id_marque) {
            query += " AND v.id_type = $2";
            params.push(id_type);
        }
        
        if(id_type && id_marque){
          query += "AND v.id_marque = $2 AND v.id_type = $3";
          params.push(id_marque, id_type)
        }
        

        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (error) {
        console.error("❌ Erreur lors de la récupération des véhicules :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
});


router.post("/add", async (req, res) => {
    const { nom } = req.body;
    console.log(nom);
    try {
      const result = await pool.query("INSERT INTO categorie (nom) VALUES ($1) RETURNING *", [nom]);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error("Erreur lors de l'ajout du categorie:", error);
      res.status(500).json({ error: "Erreur serveur." });
    }
  });
  
  // Modifier un centre
  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { nom } = req.body;
    try {
      const result = await pool.query("UPDATE categorie SET nom = $1 WHERE id = $2 RETURNING *", [nom, id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "categorie non trouvé." });
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du centre:", error);
      res.status(500).json({ error: "Erreur serveur." });
    }
  });
  
  // Supprimer un centre
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const result = await pool.query("DELETE FROM categorie WHERE id = $1 RETURNING *", [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "categorie non trouvé." });
      }
      res.json({ success: true, message: "categorie supprimé avec succès." });
    } catch (error) {
      console.error("Erreur lors de la suppression du categorie:", error);
      res.status(500).json({ error: "Erreur serveur." });
    }
  });


module.exports = router;