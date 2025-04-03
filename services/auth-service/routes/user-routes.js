import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authentificateToken } from '../middleware/authorization.js';

const prisma = new PrismaClient();
const router = express.Router();

router.get('/user-types', async (req, res) => {
  try {
    const types = await prisma.user_types.findMany();
    res.status(200).json(types);
  } catch (error) {
    console.error(error); // Ajoute ça pour debug
    res.status(500).json({ error: 'Erreur lors de la récupération des types utilisateurs' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const user = await prisma.users.findUnique({
      where: { user_id: req.params.id },
    });

    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await prisma.users.findMany({
      include: {
        user_types: true, // Affiche aussi le label du type si dispo
        address: true, // Affiche aussi l'adresse si dispo
      }
    });
    res.status(200).json({ users });
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error.message);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;
