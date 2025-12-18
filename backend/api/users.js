const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db");
const router = express.Router();

router.get("/", async (req, res) => {
    try{
        const users = pool.query(`SELECT * FROM users`)
    }catch(error){

    }
})