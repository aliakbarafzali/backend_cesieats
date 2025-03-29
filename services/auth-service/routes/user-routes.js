import express from 'express';
import pool from '../db.js';
import bcrypt from 'bcrypt';
import { authentificateToken } from '../middleware/authorization.js';


const router = express.Router()


// Get tous les users
router.get('/', authentificateToken, async(req, res) => {
    try {
        const users = await pool.query("SELECT * FROM users");
        res.json({users : users.rows});
    } catch (error) {
    res.status(500).json({error:error.message});
    }
});


// Get les types de user
router.get('/user-types', async (req, res) => {
    try {
        const types = await pool.query('SELECT * FROM user_types');
        res.status(200).json(types.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Erreur lors de la récupération des types utilisateurs' });
    }
});

// Get les infos d'un user

export default router;