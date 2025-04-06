import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// ➕ Créer un ingrédient
export const createIngredient = async (req, res) => {
  try {
    const { name, restaurant_id } = req.body;

    if (!name || !restaurant_id) {
      return res.status(400).json({ error: 'Nom et restaurant_id sont requis.' });
    }

    // Vérifie que le restaurant existe
    const restaurant = await prisma.restaurant.findUnique({
      where: { restaurant_id },
    });

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant introuvable.' });
    }

    const ingredient = await prisma.ingredient.create({
      data: {
        name,
        restaurant_id,
      },
    });

    res.status(201).json(ingredient);
  } catch (error) {
    console.error('Erreur dans createIngredient:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la création.' });
  }
};

// 📄 Liste tous les ingrédients
export const getAllIngredients = async (req, res) => {
  try {
    const ingredients = await prisma.ingredient.findMany({
      include: { restaurant: true },
    });
    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des ingrédients.' });
  }
};

// 🔍 Obtenir un ingrédient par ID
export const getIngredientById = async (req, res) => {
  const { id } = req.params;
  try {
    const ingredient = await prisma.ingredient.findUnique({
      where: { ingredient_id: id },
      include: { restaurant: true },
    });

    if (!ingredient) {
      return res.status(404).json({ error: 'Ingrédient non trouvé.' });
    }

    res.json(ingredient);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur.' });
  }
};

// ✏️ Mettre à jour un ingrédient
export const updateIngredient = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const ingredient = await prisma.ingredient.update({
      where: { ingredient_id: id },
      data: { name },
    });

    res.json(ingredient);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour.' });
  }
};

// ❌ Supprimer un ingrédient
export const deleteIngredient = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.ingredient.delete({
      where: { ingredient_id: id },
    });

    res.json({ message: 'Ingrédient supprimé.' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression.' });
  }
};
