// routes/orderRoutes.js
import express from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder
} from '../controllers/orderController.js';

const router = express.Router();

// 🆕 Créer une commande
router.post('/', createOrder);

// 📄 Obtenir toutes les commandes
router.get('/', getAllOrders);

// 🔍 Obtenir une commande par son ID
router.get('/:id', getOrderById);

// 🛠️ Modifier une commande
router.put('/:id', updateOrder);

// ❌ Supprimer une commande
router.delete('/:id', deleteOrder);

export default router;
