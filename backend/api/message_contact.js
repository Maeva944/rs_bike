// backend/routes/messages.js
const express = require("express");
const pool = require("../db");

const router = express.Router();


const isAdmin = (req, res, next) => {
    if (req.user && req.user.role_id === 1) {  
        return next();
    }
    res.status(403).json({ error: "Accès interdit" }); 
};


router.get("/message/:id", isAdmin, async (req, res) => {
    const { id } = req.params;  
    try {
        const result = await pool.query(`
            SELECT m.id, 
                   m.messages, 
                   m.objects, 
                   m.id_user, 
                   u.nom AS nom_utilisateur, 
                   u.prenom AS prenom_utilisateur, 
                   u.email AS email_utilisateur
            FROM message_contact m
            INNER JOIN users u ON m.id_user = u.id
            WHERE m.id_user = $1;
        `, [id]);  
        res.json(result.rows);  
    } catch (error) {
        console.error("❌ Erreur lors de la récupération des messages :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
});


router.post("/message/:id/reponse", isAdmin, async (req, res) => {
    const { id } = req.params;
    const { reponse } = req.body;
    const { user_id } = req.user;  

    try {
        
        const result = await pool.query(`
            INSERT INTO reponse_message_contact (message_contact_id, id_admin, reponse, date_reponse)
            VALUES ($1, $2, $3, NOW()) RETURNING id;
        `, [id, user_id, reponse]);

        res.json({ message: "Réponse envoyée", id_reponse: result.rows[0].id });
    } catch (error) {
        console.error("❌ Erreur lors de l'envoi de la réponse :", error);
        res.status(500).json({ error: "Erreur serveur" });
    }
});

module.exports = router;
