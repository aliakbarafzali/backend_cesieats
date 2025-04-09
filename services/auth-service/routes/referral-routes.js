// routes/referral.js
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authentificateToken } from '../middleware/authorization.js';

const prisma = new PrismaClient();
const router = express.Router();

/**
 * Enregistrer une demande de parrainage.
 * L'utilisateur authentifié fournit l'email de la personne qu'il souhaite parrainer.
 */
router.post('/', authentificateToken, async (req, res) => {
	const { email } = req.body;
	try {
		// Vérifier si un parrainage pour cet email existe déjà
		const existingReferral = await prisma.referral.findFirst({
			where: { refereeEmail: email }
		});
		if (existingReferral) {
			return res.status(400).json({ message: "Cet email a déjà été renseigné pour un parrainage." });
		}

		// Créer le parrainage en liant l'ID du parrain à l'email du parrainé
		const referral = await prisma.referral.create({
			data: {
				referrerId: req.user.user_id,
				refereeEmail: email,
			}
		});

		return res.status(201).json({ message: "Parrainage enregistré avec succès.", referral });
	} catch (error) {
		console.error("Erreur lors de la création du parrainage :", error);
		return res.status(500).json({ error: "Erreur lors de la création du parrainage." });
	}
});

export default router;
