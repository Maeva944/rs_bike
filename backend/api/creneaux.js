const express = require("express");
const pool = require("../db");
const router = express.Router();

router.post("/creneaux/add-creneau", async (req, res) => {
    const { date_, time_, id_vehicule } = req.body;

    console.log('Données reçues :', { date_, time_, id_vehicule });
  
    if (!date_ || !time_ || !id_vehicule) {
      return res.status(400).json({ error: "Tous les champs sont nécessaires." });
    }
  
    try {
      const result = await pool.query(`
        INSERT INTO creneaux (date_, time_, id_vehicule)
        VALUES ($1, $2, $3) RETURNING *
      `, [date_, time_, id_vehicule]);
  
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error("Erreur lors de l'ajout du créneau horaire :", error);
      res.status(500).json({ error: "Erreur serveur." });
    }
  });
  router.get("/creneaux/:id_vehicule", async (req, res) => {
    const { id_vehicule } = req.params;
    try {
        const result = await pool.query("SELECT * FROM creneaux WHERE id_vehicule = $1", [id_vehicule]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Aucun créneau trouvé pour ce véhicule." });
        }
        res.json(result.rows);
    } catch (error) {
        console.error("Erreur lors de la récupération des créneaux :", error);
        res.status(500).json({ error: "Erreur serveur." });
    }
});


  // Réserver un créneau
router.post("/reservation", async (req, res) => {
    const { id_user, id_creneau, id_etat } = req.body;
  
    if (!id_user || !id_creneau || !id_etat) {
      return res.status(400).json({ error: "Tous les champs sont nécessaires." });
    }
  
    try {
      const result = await pool.query(`
        INSERT INTO reservation (id_user, id_creneau, id_etat)
        VALUES ($1, $2, $3) RETURNING *
      `, [id_user, id_creneau, id_etat]);
  
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error("Erreur lors de la réservation du créneau :", error);
      res.status(500).json({ error: "Erreur serveur." });
    }
  });
  
  module.exports = router; 