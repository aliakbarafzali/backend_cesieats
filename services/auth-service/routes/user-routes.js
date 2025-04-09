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
      include: {
        address: true, // Affiche aussi l'adresse si dispo
      }
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

/**
 * Mise à jour du profil utilisateur
 * Route : PUT /api/profile
 * L'utilisateur à mettre à jour est déterminé via req.user.user_id (injecté par authentificateToken)
 */
router.put('/:id', authentificateToken, async (req, res) => {
  try {
    const { user_name, user_email, user_phone, user_password, address } = req.body;
    const userId = req.user.user_id; // Assurez-vous que votre middleware place cette valeur dans req.user

    // Construction de l'objet de données à mettre à jour
    const updateData = {
      user_name,
      user_email,
      user_phone,
    };

    // Si un mot de passe est fourni, on le met à jour
    // Pensez à le hacher avant de le sauvegarder en production !
    if (user_password && user_password.trim() !== '') {
      updateData.user_password = user_password;
    }

    // Si une adresse est fournie, on effectue une opération upsert sur la relation
    if (address) {
      updateData.address = {
        upsert: {
          update: {
            street: address.street,
            city: address.city,
            postcode: address.postcode,
            country: address.country,
            lat: address.lat,
            lon: address.lon,
          },
          create: {
            place_id: address.place_id,
            street: address.street,
            city: address.city,
            postcode: address.postcode,
            country: address.country,
            lat: address.lat,
            lon: address.lon,
          }
        }
      };
    }

    const updatedUser = await prisma.users.update({
      where: { user_id: userId },
      data: updateData,
      include: {
        address: true, // Inclut l'adresse mise à jour
        user_types: true,
      },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du profil :", error);
    res.status(500).json({ error: "Erreur lors de la mise à jour du profil" });
  }
});

/**
 * Suppression du compte utilisateur
 * Route : DELETE /api/profile
 * L'utilisateur à supprimer est déterminé via req.user.user_id
 */
router.delete('/:id', authentificateToken, async (req, res) => {
  try {
    const userId = req.user.user_id;
    await prisma.users.delete({
      where: { user_id: userId },
    });
    res.status(200).json({ message: "Compte supprimé avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression du compte :", error);
    res.status(500).json({ error: "Erreur lors de la suppression du compte" });
  }
});

export default router;
