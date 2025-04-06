import { PrismaClient } from '@prisma/client';
import { uploadImage, deleteImage } from '../utils/firebaseStorage.js';
import { updateRestaurantOffersStatus } from '../utils/offerUtils.js';
import ERROR_CODES from '../utils/errorCodes.js';

const prisma = new PrismaClient();

// ➕ Créer un article avec catégories et ingrédients
export const createArticle = async (req, res, next) => {
  try {
    const {
      name,
      price,
      desc,
      restaurant_id,
      categories,
      ingredients,
      has_offer,
      offer_type,
      discount_percent,
      free_product_id
    } = req.body;

    if (!name || !price || !restaurant_id) {
      return res.status(400).json({
        error: {
          code: ERROR_CODES.INVALID_ARTICLE_DATA.code,
          message: ERROR_CODES.INVALID_ARTICLE_DATA.message,
          details: 'Les champs name, price et restaurant_id sont requis'
        }
      });
    }

    // Gestion de l'image
    let image = null;
    if (req.files && req.files.article_image) {
      const imagePath = `restaurants/${restaurant_id}/articles/${Date.now()}`;
      image = await uploadImage(req.files.article_image[0], imagePath);
    }

    const newArticle = await prisma.article.create({
      data: {
        name,
        price: parseFloat(price),
        desc,
        image,
        restaurant_id,
        has_offer: has_offer === 'true',
        offer_type,
        discount_percent: discount_percent ? parseFloat(discount_percent) : null,
        free_product_id,
        categories: {
          connect: categories?.map(id => ({ category_id: id })) || [],
        },
        ingredients: {
          create: ingredients?.map(i => ({
            name: i.name,
            removable: i.removable ?? true
          })) || [],
        },
      },
      include: {
        categories: true,
        ingredients: true
      },
    });

    // Mettre à jour le statut des offres du restaurant
    await updateRestaurantOffersStatus(restaurant_id);

    res.status(201).json(newArticle);
  } catch (error) {
    next(error);
  }
};

// 📄 Obtenir tous les articles
export const getAllArticles = async (req, res, next) => {
  try {
    const { restaurant_id, category_id } = req.query;
    const where = {};

    if (restaurant_id) {
      where.restaurant_id = restaurant_id;
    }

    if (category_id) {
      where.categories = {
        some: {
          category_id: category_id
        }
      };
    }

    const articles = await prisma.article.findMany({
      where,
      include: {
        categories: true,
        ingredients: true
      }
    });

    res.json(articles);
  } catch (error) {
    next(error);
  }
};

// 🔍 Obtenir un article par ID
export const getArticleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const article = await prisma.article.findUnique({
      where: { article_id: id },
      include: {
        categories: true,
        ingredients: true
      }
    });

    if (!article) {
      return res.status(404).json({
        error: {
          code: ERROR_CODES.ARTICLE_NOT_FOUND.code,
          message: ERROR_CODES.ARTICLE_NOT_FOUND.message,
          details: `L'article avec l'ID ${id} n'existe pas`
        }
      });
    }

    res.json(article);
  } catch (error) {
    next(error);
  }
};

// ✏️ Mettre à jour un article avec catégories et ingrédients
export const updateArticle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      price,
      desc,
      categories,
      ingredients,
      has_offer,
      offer_type,
      discount_percent,
      free_product_id
    } = req.body;

    // Récupérer l'article existant
    const existingArticle = await prisma.article.findUnique({
      where: { article_id: id }
    });

    if (!existingArticle) {
      return res.status(404).json({
        error: {
          code: ERROR_CODES.ARTICLE_NOT_FOUND.code,
          message: ERROR_CODES.ARTICLE_NOT_FOUND.message,
          details: `L'article avec l'ID ${id} n'existe pas`
        }
      });
    }

    // Gestion de l'image
    let image = existingArticle.image;
    if (req.files && req.files.article_image) {
      // Supprimer l'ancienne image si elle existe
      if (image) {
        await deleteImage(image);
      }
      // Uploader la nouvelle image
      const imagePath = `restaurants/${existingArticle.restaurant_id}/articles/${Date.now()}`;
      image = await uploadImage(req.files.article_image[0], imagePath);
    }

    const updatedArticle = await prisma.article.update({
      where: { article_id: id },
      data: {
        name,
        price: price ? parseFloat(price) : undefined,
        desc,
        image,
        has_offer: has_offer === 'true',
        offer_type,
        discount_percent: discount_percent ? parseFloat(discount_percent) : null,
        free_product_id,
        categories: categories
          ? {
              set: [],
              connect: categories.map(id => ({ category_id: id })),
            }
          : undefined,
        ingredients: {
          create: ingredients?.map(i => ({
            name: i.name,
            removable: i.removable ?? true
          })) || [],
        },
      },
      include: {
        categories: true,
        ingredients: true
      },
    });

    // Mettre à jour le statut des offres du restaurant
    await updateRestaurantOffersStatus(existingArticle.restaurant_id);

    res.json(updatedArticle);
  } catch (error) {
    next(error);
  }
};

// ❌ Supprimer un article
export const deleteArticle = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Récupérer l'article pour avoir l'URL de l'image
    const article = await prisma.article.findUnique({
      where: { article_id: id }
    });

    if (!article) {
      return res.status(404).json({
        error: {
          code: ERROR_CODES.ARTICLE_NOT_FOUND.code,
          message: ERROR_CODES.ARTICLE_NOT_FOUND.message,
          details: `L'article avec l'ID ${id} n'existe pas`
        }
      });
    }

    // Supprimer l'image si elle existe
    if (article.image) {
      await deleteImage(article.image);
    }

    await prisma.article.delete({
      where: { article_id: id }
    });

    // Mettre à jour le statut des offres du restaurant
    await updateRestaurantOffersStatus(article.restaurant_id);

    res.json({ message: 'Article supprimé avec succès' });
  } catch (error) {
    next(error);
  }
};
