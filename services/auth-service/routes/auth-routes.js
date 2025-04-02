import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtTokens } from '../utils/jwt-helpers.js';
import { authentificateToken } from '../middleware/authorization.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password, type } = req.body;

    const existingUser = await prisma.users.findUnique({ where: { user_email: email } });
    if (existingUser) return res.status(400).json({ error: 'Cet email est déjà utilisé.' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.users.create({
      data: {
        user_name: name,
        user_email: email,
        user_phone: phone,
        user_password: hashedPassword,
        user_type: type
      }
    });

    const tokens = jwtTokens(newUser);
    res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true });

    return res.status(201).json({ message: "Utilisateur enregistré avec succès", tokens });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.users.findUnique({ where: { user_email: email } });
    if (!user) return res.status(401).json({ error: "Email incorrect" });

    const validPassword = await bcrypt.compare(password, user.user_password);
    if (!validPassword) return res.status(401).json({ error: "Mot de passe incorrect" });

    const tokens = jwtTokens(user);
    res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true });

    return res.status(200).json(tokens);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get('/refresh_token', (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) return res.sendStatus(401);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
      if (error) return res.status(403).json({ error: error.message });
      const tokens = jwtTokens(user);
      res.cookie('refresh_token', tokens.refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        ...(process.env.COOKIE_DOMAIN && { domain: process.env.COOKIE_DOMAIN })
      });
      return res.json(tokens);
    });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('refresh_token');
  return res.status(200).json({ message: 'Déconnexion réussie' });
});

router.post('/change-password', authentificateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await prisma.users.findUnique({ where: { user_id: req.user.user_id } });
    if (!user) return res.status(404).json({ error: 'Utilisateur introuvable' });

    const validPassword = await bcrypt.compare(oldPassword, user.user_password);
    if (!validPassword) return res.status(403).json({ error: 'Mot de passe incorrect' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.users.update({
      where: { user_id: user.user_id },
      data: { user_password: hashedPassword }
    });

    return res.status(200).json({ message: 'Mot de passe mis à jour' });
  } catch (error) {
    return res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.delete('/refresh_token', (req, res) => {
  try {
    res.clearCookie('refresh_token');
    return res.status(200).json({ message: 'Refresh token deleted.' });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
});

export default router;
