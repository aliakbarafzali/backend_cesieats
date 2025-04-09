import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getAllCategories = async (req, res) => {
  try {
    const { restaurant_id } = req.query;

    const categories = await prisma.category.findMany({
      where: restaurant_id ? { restaurant_id } : {},
      orderBy: { name: 'asc' }
    });

    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des catégories' });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.findUnique({
      where: { category_id: id },
      include: { articles: { select: { article_id: true } } }
    });
    if (!category) return res.status(404).json({ error: 'Catégorie non trouvée' });
    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name, restaurant_id } = req.body;

    // Validation simple
    if (!name || !restaurant_id) {
      return res.status(400).json({ error: 'Nom et restaurant_id sont requis.' });
    }

    // Vérifie si le restaurant existe
    const restaurant = await prisma.restaurant.findUnique({
      where: { restaurant_id },
    });

    if (!restaurant) {
      return res.status(404).json({ error: "Le restaurant n'existe pas." });
    }

    // Création de la catégorie
    const newCategory = await prisma.category.create({
      data: {
        name,
        restaurant_id
      }
    });

    res.status(201).json(newCategory);

  } catch (error) {
    console.error('Erreur dans createCategory:', error);

    // Gestion spécifique des erreurs Prisma
    if (error.code === 'P2003') {
      return res.status(400).json({ error: "La clé étrangère 'restaurant_id' n'est pas valide." });
    }

    res.status(500).json({ error: 'Erreur serveur lors de la création de la catégorie.' });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updated = await prisma.category.update({
      where: { category_id: parseInt(id) },
      data: { name }
    });

    res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour' });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.category.delete({
      where: { category_id: parseInt(id) }
    });
    res.status(200).json({ message: 'Catégorie supprimée' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la suppression' });
  }
};

const deleteAllCategories = async (req, res) => {
  try {
    console.log('DELETE /categories hit');
    const result = await prisma.category.deleteMany();
    res.status(200).json({
      message: 'Toutes les catégories ont été supprimées.',
      deletedCount: result.count,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Erreur lors de la suppression des catégories.',
      details: error.message,
    });
  }
};

export {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  deleteAllCategories
};
