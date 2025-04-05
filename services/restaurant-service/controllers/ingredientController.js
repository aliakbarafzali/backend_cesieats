import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Créer un ingrédient
export const createIngredient = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Le nom est requis.' });

    const ingredient = await prisma.ingredient.create({
      data: { name },
    });

    res.status(201).json(ingredient);
  } catch (error) {
    console.error('Erreur lors de la création de l’ingrédient :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Récupérer tous les ingrédients
export const getAllIngredients = async (req, res) => {
  try {
    const ingredients = await prisma.ingredient.findMany();
    res.status(200).json(ingredients);
  } catch (error) {
    console.error('Erreur lors de la récupération des ingrédients :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Récupérer un ingrédient par ID
export const getIngredientById = async (req, res) => {
  try {
    const { id } = req.params;

    const ingredient = await prisma.ingredient.findUnique({
      where: { ingredient_id: parseInt(id) },
    });

    if (!ingredient) return res.status(404).json({ error: 'Ingrédient non trouvé.' });

    res.status(200).json(ingredient);
  } catch (error) {
    console.error('Erreur :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
