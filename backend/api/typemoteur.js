// routes/brands.js
const express = require('express');
const router = express.Router();
const pool = require('../db');
const verifyToken = require('../middleware/auth');

// GET all brands
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM brands ORDER BY nom');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ msg: 'Erreur serveur' });
  }
});

// POST create a brand (admin)
router.post('/', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Accès refusé' });
  const { nom } = req.body;

  try {
    const result = await pool.query('INSERT INTO brands (nom) VALUES ($1) RETURNING *', [nom]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') {
      res.status(400).json({ msg: 'Marque déjà existante' });
    } else {
      res.status(500).json({ msg: 'Erreur serveur' });
    }
  }
});

// DELETE a brand
router.delete('/:id', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Accès refusé' });

  try {
    await pool.query('DELETE FROM brands WHERE id = $1', [req.params.id]);
    res.json({ msg: 'Marque supprimée' });
  } catch (err) {
    res.status(500).json({ msg: 'Erreur serveur' });
  }
});

module.exports = router;
