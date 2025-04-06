import express from 'express';
import {
    createRestaurant,
    getAllRestaurants,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant
  } from '../controllers/restaurantController.js';
import { uploadRestaurantImages } from '../middleware/multer.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Restaurant:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - owner_id
 *       properties:
 *         restaurant_id:
 *           type: string
 *           description: L'ID unique du restaurant
 *         name:
 *           type: string
 *           description: Le nom du restaurant
 *         banner_image_url:
 *           type: string
 *           description: URL de l'image bannière
 *         image_url:
 *           type: string
 *           description: URL de l'image logo
 *         owner_id:
 *           type: string
 *           description: ID du propriétaire du restaurant
 *         address:
 *           type: object
 *           properties:
 *             street:
 *               type: string
 *             city:
 *               type: string
 *             postcode:
 *               type: string
 *             country:
 *               type: string
 *             lat:
 *               type: string
 *             lon:
 *               type: string
 */

/**
 * @swagger
 * /api/restaurants:
 *   post:
 *     summary: Créer un nouveau restaurant
 *     tags: [Restaurants]
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
 *               - address
 *               - owner_id
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: object
 *               owner_id:
 *                 type: string
 *               banner_image:
 *                 type: string
 *                 format: binary
 *               logo_image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Restaurant créé avec succès
 *       400:
 *         description: Données invalides
 *       403:
 *         description: Non autorisé
 */
router.post('/', uploadRestaurantImages, createRestaurant);

/**
 * @swagger
 * /api/restaurants:
 *   get:
 *     summary: Récupérer tous les restaurants
 *     tags: [Restaurants]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Type de restaurant à filtrer
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Terme de recherche
 *     responses:
 *       200:
 *         description: Liste des restaurants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Restaurant'
 */
router.get('/', getAllRestaurants);

/**
 * @swagger
 * /api/restaurants/{id}:
 *   get:
 *     summary: Récupérer un restaurant par son ID
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du restaurant
 *     responses:
 *       200:
 *         description: Détails du restaurant
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurant'
 *       404:
 *         description: Restaurant non trouvé
 */
router.get('/:id', getRestaurantById);

/**
 * @swagger
 * /api/restaurants/{id}:
 *   put:
 *     summary: Mettre à jour un restaurant
 *     tags: [Restaurants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du restaurant
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: object
 *               banner_image:
 *                 type: string
 *                 format: binary
 *               logo_image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Restaurant mis à jour avec succès
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Restaurant non trouvé
 */
router.put('/:id', uploadRestaurantImages, updateRestaurant);

/**
 * @swagger
 * /api/restaurants/{id}:
 *   delete:
 *     summary: Supprimer un restaurant
 *     tags: [Restaurants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du restaurant
 *     responses:
 *       200:
 *         description: Restaurant supprimé avec succès
 *       404:
 *         description: Restaurant non trouvé
 */
router.delete('/:id', deleteRestaurant);

export default router;
