const express = require("express");
const pool = require("../db");
const router = express.Router();


router.post("/reservation", async (req, res) => {
    const { id_user, id_creneau, id_etat, id_vehicule } = req.body;
  
    if (!id_user || !id_creneau || !id_etat || !id_vehicule) {
      return res.status(400).json({ error: "Tous les champs sont nécessaires." });
    }
  
    try {
      const checkAvailability = await pool.query("SELECT is_available FROM creneaux WHERE id = $1", [id_creneau]);
      if (!checkAvailability.rows[0].is_available) {
        return res.status(400).json({ error: "Ce créneau n'est plus disponible." });
      }
  
   
      const result = await pool.query(`
        INSERT INTO reservation (id_user, id_creneau, id_etat, id_vehicule)
        VALUES ($1, $2, $3, $4) RETURNING *
      `, [id_user, id_creneau, id_etat, id_vehicule]);
  

      await pool.query("UPDATE creneaux SET is_available = FALSE WHERE id = $1", [id_creneau]);
  
      res.status(201).json(result.rows[0]); 
    } catch (error) {
      console.error("Erreur lors de la réservation du créneau :", error);
      res.status(500).json({ error: "Erreur serveur." });
    }
});

  
  
  
router.get("/reservations/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await pool.query(`
        SELECT r.id, r.id_user, r.id_etat, r.id_vehicule, r.id_creneau, c.date_ AS reservation_date, c.time_ AS reservation_time, 
        v.nom AS vehicule, e.nom AS etat
        FROM reservation r
        JOIN creneaux c ON r.id_creneau = c.id
        JOIN vehicule v ON r.id_vehicule = v.id
        JOIN etat e ON r.id_etat = e.id
        WHERE r.id_user = $1
      `, [id]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Aucune réservation trouvée." });
      }
  
      res.json(result.rows);
    } catch (error) {
      console.error("Erreur lors de la récupération des réservations :", error);
      res.status(500).json({ error: "Erreur serveur." });
    }
  });
  
  
router.delete("/reservation/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      
      const reservationResult = await pool.query("SELECT id_creneau FROM reservation WHERE id = $1", [id]);
  
      if (reservationResult.rows.length === 0) {
        return res.status(404).json({ error: "Réservation non trouvée." });
      }
  
      const idCreneau = reservationResult.rows[0].id_creneau;
  
      await pool.query("DELETE FROM reservation WHERE id = $1", [id]);
  
      
      await pool.query("UPDATE creneaux SET is_available = TRUE WHERE id = $1", [idCreneau]);
  
      res.json({ success: true, message: "Réservation annulée avec succès et créneau rendu disponible." });
    } catch (error) {
      console.error("Erreur lors de l'annulation de la réservation :", error);
      res.status(500).json({ error: "Erreur serveur." });
    }
  });
  
  router.get('/all-reservation', async (req, res) =>{
    try{
      const result2 = await pool.query(`
      SELECT r.id, r.id_user, r.id_etat, r.id_vehicule, r.id_creneau, c.date_ AS reservation_date, c.time_ AS reservation_time, 
      v.nom AS vehicule, e.nom AS etat,
      u.email as email
      FROM reservation r
      JOIN creneaux c ON r.id_creneau = c.id
      JOIN vehicule v ON r.id_vehicule = v.id
      JOIN etat e ON r.id_etat = e.id
      JOIN users u ON r.id_user = u.id`);

      if(result2.rows === 0){
        return res.status(404).json({ error: "Aucune réservation trouvée." });
      }
      res.json(result2.rows);
    }catch(error){
      console.error("Erreur lors de l'annulation de la réservation :", error);
      res.status(500).json({ error: "Erreur serveur." });
    }

  })

  module.exports = router;
  