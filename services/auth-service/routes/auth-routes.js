import express from 'express';
import pool from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {jwtTokens} from '../utils/jwt-helpers.js';
import { authentificateToken } from '../middleware/authorization.js';

const router = express.Router();


router.post('/register', async (req, res) => {
  try {
      const { name, email, phone, password, type } = req.body;

      // Vérifier si l'utilisateur existe déjà
      const userExists = await pool.query('SELECT * FROM users WHERE user_email = $1', [email]);
      if (userExists.rows.length > 0) {
          return res.status(400).json({ error: 'Cet email est déjà utilisé.' });
      }

      // Hasher le mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insérer le nouvel utilisateur
      const newUser = await pool.query(
          `INSERT INTO users (user_name, user_email, user_phone, user_password, user_type)
           VALUES ($1, $2, $3, $4, $5) RETURNING *`,
          [name, email, phone, hashedPassword, type]
      );

      // Générer les tokens
      const tokens = jwtTokens(newUser.rows[0]);
      res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true });

      return res.status(201).json({ message: "Utilisateur enregistré avec succès", tokens });

  } catch (error) {
      console.error(error.message);
      return res.status(500).json({ error: 'Erreur serveur' });
  }
});


router.post('/login', async (req,res) => {
    try {
        const {email,password} = req.body;
        const users = await pool.query('SELECT * FROM users WHERE user_email = $1', [email]);
        if(users.rows.length === 0) return res.status(401).json({error : "Email is incorrect"});
        // vérif MDP
        const validPassword = await bcrypt.compare(password,users.rows[0].user_password);
        if(!validPassword) return res.status(401).json({error:"Incorrect password"});
        
        // JWT
        let tokens = jwtTokens(users.rows[0]);
        res.cookie('refresh_token',tokens.refreshToken,{httpOnly:true});
        res.json(tokens);
        
    } catch (error) {
      res.status(401).json({error: error.message});  
    }
  });


router.get('/refresh_token', (req,res) => {
    try {
      const refreshToken = req.cookies.refresh_token;
      console.log(req.cookies);
      if (refreshToken === null) return res.sendStatus(401);
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
        if (error) return res.status(403).json({error:error.message});
        let tokens = jwtTokens(user);
        res.cookie('refresh_token', tokens.refreshToken, {...(process.env.COOKIE_DOMAIN && {domain: process.env.COOKIE_DOMAIN}) , httpOnly: true,sameSite: 'none', secure: true});
        return res.json(tokens);
      });
    } catch (error) {
      res.status(401).json({error: error.message});
    }

});

router.post('/logout', (req, res) => {
  res.clearCookie('refresh_token');
  return res.status(200).json({ message: 'Déconnexion réussie' });
});

router.post('/change-password', authentificateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const userId = req.user.user_id;

    // Vérifie le mot de passe actuel
    const user = await pool.query('SELECT * FROM users WHERE user_id = $1', [userId]);
    if (user.rows.length === 0) return res.status(404).json({ error: 'Utilisateur introuvable' });

    const validPassword = await bcrypt.compare(oldPassword, user.rows[0].user_password);
    if (!validPassword) return res.status(403).json({ error: 'Ancien mot de passe incorrect' });

    // Hashe et met à jour le nouveau mot de passe
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await pool.query('UPDATE users SET user_password = $1 WHERE user_id = $2', [hashedPassword, userId]);

    return res.status(200).json({ message: 'Mot de passe mis à jour avec succès' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
});




router.delete('/refresh_token', (req, res) => {
  try {
    res.clearCookie('refresh_token');
    return res.status(200).json({message:'Refresh token deleted.'});
  } catch (error) {
    res.status(401).json({error: error.message});
  }
});


export default router;