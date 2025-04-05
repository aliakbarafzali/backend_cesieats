import express from 'express';
import {
  createIngredient,
  getAllIngredients,
  getIngredientById
} from '../controllers/ingredientController.js';

const router = express.Router();

router.post('/', createIngredient);
router.get('/', getAllIngredients);
router.get('/:id', getIngredientById);

export default router;
