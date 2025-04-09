import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtTokens } from '../utils/jwt-helpers.js';
import { authentificateToken } from '../middleware/authorization.js';
import { PrismaClient } from '@prisma/client';
import { EMAIL_ALREADY_EXISTS_CODE, INCORRECT_EMAIL_CODE, INCORRECT_PASSWORD_CODE, TECHNICAL_ERROR_CODE } from '../utils/globals.js';

const prisma = new PrismaClient();
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password, type, address } = req.body;

    const existingUser = await prisma.users.findUnique({ where: { user_email: email } });
    if (existingUser)
      return res.status(400).json({ error: 'Cet email est déjà utilisé.' });

    let newAddress = null;
    if (address) {
      let existingAddress = await prisma.address.findUnique({
        where: { place_id: address.place_id }
      });
      if (existingAddress) {
        newAddress = existingAddress;
      } else {
        newAddress = await prisma.address.create({
          data: {
            place_id: address.place_id,
            street: address.street || "",
            city: address.city || "",
            postcode: address.postcode || "",
            country: address.country || "",
            lat: address.lat.toString() || "",
            lon: address.lon.toString() || ""
          }
        });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer le nouvel utilisateur
    const newUser = await prisma.users.create({
      data: {
        user_name: name,
        user_email: email,
        user_phone: phone,
        user_password: hashedPassword,
        user_types: type ? { connect: { type_id: type } } : undefined,
        address: newAddress ? { connect: { id: newAddress.id } } : undefined,
      },
      include: { address: true }
    });

    // Vérifier si une demande de parrainage existe pour cet email
    const referral = await prisma.referral.findFirst({
      where: { refereeEmail: email, refereeId: null }
    });
    if (referral) {
      // Mettre à jour l'enregistrement de parrainage pour lier l'utilisateur inscrit
      await prisma.referral.update({
        where: { id: referral.id },
        data: { refereeId: newUser.user_id }
      });
    }

    const tokens = jwtTokens(newUser);
    // Configuration du cookie, etc.
    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 2 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({ accessToken: tokens.accessToken, user: newUser });
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error.message);
    return res.status(500).json({ error: error.message });
  }
});



router.post('/login', async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;

    const user = await prisma.users.findUnique({ where: { user_email: email }, include: { address: true } });
    if (!user) return res.status(401).json({ error: "Email incorrect", code: INCORRECT_EMAIL_CODE });

    const validPassword = await bcrypt.compare(password, user.user_password);
    if (!validPassword) return res.status(401).json({ error: "Mot de passe incorrect", code: INCORRECT_PASSWORD_CODE });

    const tokens = jwtTokens(user);
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    };

    if (rememberMe) {
      cookieOptions.maxAge = 7 * 24 * 60 * 60 * 1000; // 7 jours
    } else {
      cookieOptions.maxAge = 60 * 60 * 1000; // 15 minutes
    }

    res.cookie('refresh_token', tokens.refreshToken, cookieOptions);

    // On renvoie l'access token dans le body pour l'utiliser côté client (par exemple dans le header Authorization)
    return res.status(200).json({ accessToken: tokens.accessToken, user: user });
  } catch (error) {
    return res.status(500).json({ error: error.message, code: TECHNICAL_ERROR_CODE });
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
      return res.json({ accessToken: tokens.accessToken, refreshToken: tokens.refreshToken, userId: user.user_id });
    });
  } catch (error) {
    return res.status(401).json({ error: error.message, code: TECHNICAL_ERROR_CODE });
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
    return res.status(500).json({ error: error.message, code: TECHNICAL_ERROR_CODE });
  }
});

router.delete('/refresh_token', (req, res) => {
  try {
    res.clearCookie('refresh_token');
    return res.status(200).json({ message: 'Refresh token deleted.' });
  } catch (error) {
    return res.status(401).json({ error: error.message, code: TECHNICAL_ERROR_CODE });
  }
});

export default router;
