const express = require("express");
const bcrypt = require("bcryptjs");
const pool = require("../db");
const router = express.Router();

router.post("/", async (req, res) => {
    try{
        let {nom, prenom, email, password, tel } = req.body;

        if(!nom || !prenom || !email || !password || !tel ){
            return res.status(400).json({ error : "Tous les champs sont requis."});
        }

        email = email.toLowerCase().trim();

        const isUserInputValid = (email) => {
            const pattern = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            return pattern.test(email);
        };

        const hashedPassword = await bcrypt.hash(password, 10);

        if (!isUserInputValid(email)) {
            return res.status(401).json({ error: "Format d'email invalide." });
        }

        const result = await pool.query(`
            INSERT INTO users(nom, prenom, email, password, tel, id_role) VALUES ($1, $2, $3, $4, $5, $6)`,
            [nom, prenom, email, hashedPassword, tel, 2]
        );

        return res.status(201).json({ message: "Inscription réussie !" }); 

    }catch(error){
        console.log("Erreur lors de l'inscription:", error);
        res.status(500).json({ error: "Erreur serveur."})
    }


})

module.exports = router;