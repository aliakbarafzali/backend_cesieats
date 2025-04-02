import express from 'express';
import {
    createRestaurant,
    getAllRestaurants,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant
  } from '../controllers/restaurantController.js';

const router = express.Router();

// Création
router.post('/', createRestaurant);

// Lecture
router.get('/', getAllRestaurants);
router.get('/:id', getRestaurantById);

// Mise à jour
router.put('/:id', updateRestaurant);

// Suppression
router.delete('/:id', deleteRestaurant);


export default router;
