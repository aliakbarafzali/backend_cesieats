import express from 'express';
import {
  createPromo,
  getAllPromos,
  getPromoById,
  updatePromo,
  deletePromo
} from '../controllers/promoController.js';

const router = express.Router();

router.post('/', createPromo);
router.get('/', getAllPromos);
router.get('/:id', getPromoById);
router.put('/:id', updatePromo);
router.delete('/:id', deletePromo);

export default router;
