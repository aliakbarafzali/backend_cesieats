import express from 'express';
import { createReview, getRestaurantReviews, updateReview, deleteReview, getUserReviews } from '../controllers/reviewController.js';
import { authentificateToken } from '../middleware/authorization.js';

const router = express.Router();

// Créer un nouvel avis
router.post('/:restaurant_id', authentificateToken, createReview);

// Obtenir tous les avis d'un restaurant
router.get('/:restaurant_id', getRestaurantReviews);

// Obtenir tous les avis d'un utilisateur
router.get('/user/:user_id', getUserReviews);

// Mettre à jour un avis
router.put('/:id', authentificateToken, updateReview);

// Supprimer un avis
router.delete('/:id', authentificateToken, deleteReview);

export default router; 