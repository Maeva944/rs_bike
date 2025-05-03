const express = require('express');
const router = express.Router();
const pool = require('../db'); 
const verifyToken = require('../middleware/auth'); 

router.post('/', verifyToken, async (req, res) => {
  const { vehicule_id, creneau_id, montant } = req.body;
  const user_id = req.user.id;

  try {
    const creneau = await pool.query(
      'SELECT * FROM creneaux WHERE id = $1 AND dispo = true',
      [creneau_id]
    );

    if (creneau.rowCount === 0) {
      return res.status(400).json({ error: 'Créneau non disponible' });
    }

    const newReservation = await pool.query(
      `INSERT INTO reservations (user_id, vehicule_id, creneau_id)
       VALUES ($1, $2, $3) RETURNING *`,
      [user_id, vehicule_id, creneau_id]
    );

    await pool.query(
      'UPDATE creneaux SET dispo = false WHERE id = $1',
      [creneau_id]
    );

    // Ajouter le paiement simulé
    await pool.query(
      `INSERT INTO paiements (reservation_id, montant, statut)
       VALUES ($1, $2, 'payé')`,
      [newReservation.rows[0].id, montant]
    );

    res.status(201).json({ msg: 'Réservation confirmée ✅', reservation: newReservation.rows[0] });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Erreur serveur' });
  }
});

module.exports = router;

