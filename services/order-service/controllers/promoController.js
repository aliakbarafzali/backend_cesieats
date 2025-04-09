import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// ➕ Créer un code promo
export const createPromo = async (req, res) => {
  try {
    const { id, code, discount, validUntil } = req.body;

    if (!id || !code || discount === undefined || !validUntil) {
      return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }

    const newPromo = await prisma.promoCode.create({
      data: {
        id,
        code,
        discount,
        validUntil: new Date(validUntil)
      }
    });

    res.status(201).json(newPromo);
  } catch (error) {
    console.error('Erreur création promo:', error);
    res.status(500).json({ error: 'Erreur lors de la création du code promo.' });
  }
};

// 📥 Obtenir tous les codes promo
export const getAllPromos = async (req, res) => {
  try {
    const promos = await prisma.promoCode.findMany();
    res.status(200).json(promos);
  } catch (error) {
    console.error('Erreur récupération promos:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des codes promo.' });
  }
};

// 🔍 Obtenir un code promo par ID
export const getPromoById = async (req, res) => {
  try {
    const promo = await prisma.promoCode.findUnique({
      where: { id: req.params.id }
    });

    if (!promo) return res.status(404).json({ error: 'Code promo non trouvé.' });

    res.status(200).json(promo);
  } catch (error) {
    console.error('Erreur récupération promo par ID:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération du code promo.' });
  }
};

// ✏️ Mettre à jour un code promo
export const updatePromo = async (req, res) => {
  try {
    const { code, discount, validUntil } = req.body;

    const updatedPromo = await prisma.promoCode.update({
      where: { id: req.params.id },
      data: {
        code,
        discount,
        validUntil: new Date(validUntil)
      }
    });

    res.status(200).json(updatedPromo);
  } catch (error) {
    console.error('Erreur mise à jour promo:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du code promo.' });
  }
};

// ❌ Supprimer un code promo
export const deletePromo = async (req, res) => {
  try {
    await prisma.promoCode.delete({
      where: { id: req.params.id }
    });
    res.status(204).send();
  } catch (error) {
    console.error('Erreur suppression promo:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression du code promo.' });
  }
};
