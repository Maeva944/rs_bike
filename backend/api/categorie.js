const express = require("express");
const pool = require("../db");
const xss = require("xss");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, nom FROM categorie ORDER BY id"
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.get("/vehicule/categorie/:id", async (req, res) => {
  const categorieId = parseInt(req.params.id, 10);
  const id_marque = req.query.id_marque ? parseInt(req.query.id_marque, 10) : null;
  const id_type = req.query.id_type ? parseInt(req.query.id_type, 10) : null;

  if (isNaN(categorieId)) {
    return res.status(400).json({ error: "ID invalide" });
  }

  try {
    let query = `
      SELECT 
        v.id, v.nom, v.prix, v.photo,
        c.nom AS categorie,
        m.nom AS marque,
        t.nom AS type_vehicule
      FROM vehicule v
      INNER JOIN categorie c ON v.id_categorie = c.id
      INNER JOIN marque m ON v.id_marque = m.id
      INNER JOIN type_vehicule t ON v.id_type = t.id
      WHERE v.id_categorie = $1
    `;

    const params = [categorieId];

    if (id_marque) {
      query += " AND v.id_marque = $" + (params.length + 1);
      params.push(id_marque);
    }

    if (id_type) {
      query += " AND v.id_type = $" + (params.length + 1);
      params.push(id_type);
    }

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.post("/add", async (req, res) => {
  const nom = xss(req.body.nom);

  if (!nom || typeof nom !== "string") {
    return res.status(400).json({ error: "Nom invalide" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO categorie (nom) VALUES ($1) RETURNING id, nom",
      [nom]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const nom = xss(req.body.nom);

  if (isNaN(id) || !nom) {
    return res.status(400).json({ error: "Données invalides" });
  }

  try {
    const result = await pool.query(
      "UPDATE categorie SET nom = $1 WHERE id = $2 RETURNING id, nom",
      [nom, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Catégorie non trouvée" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID invalide" });
  }

  try {
    const result = await pool.query(
      "DELETE FROM categorie WHERE id = $1 RETURNING id",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Catégorie non trouvée" });
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;
