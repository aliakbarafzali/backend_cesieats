import express from 'express';
import {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
} from '../controllers/articleController.js';
import { uploadArticleImage } from '../middleware/multer.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Article:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - restaurant_id
 *       properties:
 *         article_id:
 *           type: string
 *           description: L'ID unique de l'article
 *         name:
 *           type: string
 *           description: Le nom de l'article
 *         price:
 *           type: number
 *           description: Le prix de l'article
 *         desc:
 *           type: string
 *           description: La description de l'article
 *         image:
 *           type: string
 *           description: URL de l'image de l'article
 *         restaurant_id:
 *           type: string
 *           description: ID du restaurant
 *         has_offer:
 *           type: boolean
 *           description: Indique si l'article a une offre
 *         offer_type:
 *           type: string
 *           description: Type d'offre (discount ou free_product)
 *         discount_percent:
 *           type: number
 *           description: Pourcentage de réduction
 *         free_product_id:
 *           type: string
 *           description: ID du produit gratuit
 */

/**
 * @swagger
 * /api/articles:
 *   post:
 *     summary: Créer un nouvel article
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - restaurant_id
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               desc:
 *                 type: string
 *               restaurant_id:
 *                 type: string
 *               article_image:
 *                 type: string
 *                 format: binary
 *               categories:
 *                 type: string
 *                 description: Liste des IDs de catégories séparés par des virgules
 *               ingredients:
 *                 type: string
 *                 description: Liste des IDs d'ingrédients séparés par des virgules
 *               has_offer:
 *                 type: boolean
 *               offer_type:
 *                 type: string
 *               discount_percent:
 *                 type: number
 *               free_product_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Article créé avec succès
 *       400:
 *         description: Données invalides
 */
router.post('/', uploadArticleImage, createArticle);

/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Récupérer tous les articles
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: restaurant_id
 *         schema:
 *           type: string
 *         description: ID du restaurant pour filtrer les articles
 *       - in: query
 *         name: category_id
 *         schema:
 *           type: string
 *         description: ID de la catégorie pour filtrer les articles
 *     responses:
 *       200:
 *         description: Liste des articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 */
router.get('/', getAllArticles);

/**
 * @swagger
 * /api/articles/{id}:
 *   get:
 *     summary: Récupérer un article par son ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'article
 *     responses:
 *       200:
 *         description: Détails de l'article
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       404:
 *         description: Article non trouvé
 */
router.get('/:id', getArticleById);

/**
 * @swagger
 * /api/articles/{id}:
 *   put:
 *     summary: Mettre à jour un article
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'article
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               desc:
 *                 type: string
 *               article_image:
 *                 type: string
 *                 format: binary
 *               categories:
 *                 type: string
 *               ingredients:
 *                 type: string
 *               has_offer:
 *                 type: boolean
 *               offer_type:
 *                 type: string
 *               discount_percent:
 *                 type: number
 *               free_product_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Article mis à jour avec succès
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Article non trouvé
 */
router.put('/:id', uploadArticleImage, updateArticle);

/**
 * @swagger
 * /api/articles/{id}:
 *   delete:
 *     summary: Supprimer un article
 *     tags: [Articles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'article
 *     responses:
 *       200:
 *         description: Article supprimé avec succès
 *       404:
 *         description: Article non trouvé
 */
router.delete('/:id', deleteArticle);

export default router;
