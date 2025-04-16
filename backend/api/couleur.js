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

router.post("/add", async (req, res) => {
    const { nom } = req.body;
    console.log(nom);
    try {
      const result = await pool.query("INSERT INTO couleur (nom) VALUES ($1) RETURNING *", [nom]);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error("Erreur lors de l'ajout du couleur:", error);
      res.status(500).json({ error: "Erreur serveur." });
    }
  });
  
  // Modifier un centre
  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { nom } = req.body;
    try {
      const result = await pool.query("UPDATE couleur SET nom = $1 WHERE id = $2 RETURNING *", [nom, id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "couleur non trouvé." });
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
      const result = await pool.query("DELETE FROM couleur WHERE id = $1 RETURNING *", [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "couleur non trouvé." });
      }
      res.json({ success: true, message: "couleur supprimé avec succès." });
    } catch (error) {
      console.error("Erreur lors de la suppression du couleur:", error);
      res.status(500).json({ error: "Erreur serveur." });
    }
  });


module.exports = router;