import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// ➕ Créer un article avec catégories et ingrédients
export const createArticle = async (req, res) => {
  try {
    const { name, desc, price, categoryIds, ingredients } = req.body;

    if (!name || !price) {
      return res.status(400).json({ error: 'Nom et prix sont requis.' });
    }

    const article = await prisma.article.create({
      data: {
        name,
        desc,
        price,
        categories: {
          connect: categoryIds?.map(id => ({ category_id: id })) || [],
        },
        ingredients: {
          create: ingredients?.map(i => ({
            ingredient: { connect: { ingredient_id: i.ingredient_id } },
            is_optional: i.is_optional ?? false,
            extra_price: i.extra_price ?? 0.0,
          })) || [],
        },
      },
      include: {
        categories: true,
        ingredients: {
          include: { ingredient: true },
        },
      },
    });

    const cleanArticle = {
      article_id: article.article_id,
      name: article.name,
      desc: article.desc,
      price: article.price,
      categories: article.categories.map(c => ({
        category_id: c.category_id,
        name: c.name
      })),
      ingredients: article.ingredients.map(i => ({
        is_optional: i.is_optional,
        extra_price: i.extra_price,
        ingredient: {
          ingredient_id: i.ingredient.ingredient_id,
          name: i.ingredient.name
        }
      }))
    };
    
    res.status(201).json(cleanArticle);
  } catch (error) {
    console.error('Erreur dans createArticle:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la création de l’article.' });
  }
};

// 📄 Obtenir tous les articles
export const getAllArticles = async (req, res) => {
  try {
    const articles = await prisma.article.findMany({
      include: {
        categories: true,
        ingredients: {
          include: { ingredient: true },
        },
      },
    });

    const formatted = articles.map(article => ({
      article_id: article.article_id,
      name: article.name,
      desc: article.desc,
      price: article.price,
      categories: article.categories.map(c => ({
        category_id: c.category_id,
        name: c.name,
      })),
      ingredients: article.ingredients.map(i => ({
        is_optional: i.is_optional,
        extra_price: i.extra_price,
        ingredient: {
          ingredient_id: i.ingredient.ingredient_id,
          name: i.ingredient.name,
        },
      })),
    }));

    res.json(formatted);
  } catch (error) {
    console.error('Erreur dans getAllArticles:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des articles.' });
  }
};


// 🔍 Obtenir un article par ID
export const getArticleById = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await prisma.article.findUnique({
      where: { article_id: id },
      include: {
        categories: true,
        ingredients: {
          include: { ingredient: true },
        },
      },
    });

    if (!article) {
      return res.status(404).json({ error: 'Article non trouvé.' });
    }

    res.json(article);
  } catch (error) {
    console.error('Erreur dans getArticleById:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération de l’article.' });
  }
};

// ✏️ Mettre à jour un article avec catégories et ingrédients
export const updateArticle = async (req, res) => {
  const { id } = req.params;
  const { name, desc, price, categoryIds, ingredients } = req.body;

  try {
    // Nettoyer les ingrédients liés existants
    await prisma.articleIngredient.deleteMany({
      where: { article_id: id }
    });

    const article = await prisma.article.update({
      where: { article_id: id },
      data: {
        name,
        desc,
        price,
        categories: categoryIds
          ? {
              set: [],
              connect: categoryIds.map(id => ({ category_id: id })),
            }
          : undefined,
        ingredients: {
          create: ingredients?.map(i => ({
            ingredient: { connect: { ingredient_id: i.ingredient_id } },
            is_optional: i.is_optional ?? false,
            extra_price: i.extra_price ?? 0.0,
          })) || [],
        },
      },
      include: {
        categories: true,
        ingredients: {
          include: { ingredient: true },
        },
      },
    });

    res.json(article);
  } catch (error) {
    console.error('Erreur dans updateArticle:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l’article.' });
  }
};

// ❌ Supprimer un article
export const deleteArticle = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.article.delete({
      where: { article_id: id },
    });

    res.json({ message: 'Article supprimé avec succès.' });
  } catch (error) {
    console.error('Erreur dans deleteArticle:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression de l’article.' });
  }
};
