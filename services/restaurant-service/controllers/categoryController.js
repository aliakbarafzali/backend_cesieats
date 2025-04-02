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
      where: { category_id: parseInt(id) }
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
    if (!name || !restaurant_id) {
      return res.status(400).json({ error: 'Nom et restaurant_id sont requis' });
    }

    const newCategory = await prisma.category.create({
      data: {
        name,
        restaurant_id
      }
    });

    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la création de la catégorie' });
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

export {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};
