import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { validate as isUUID } from 'uuid';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
const prisma = new PrismaClient();


export const createOrder = async (req, res) => {
  try {
    const { user_id, promoCodeId, articles } = req.body;

    if (!user_id || !Array.isArray(articles) || articles.length === 0) {
      return res.status(400).json({ error: 'user_id et articles sont requis' });
    }

    // ✅ Vérifie que l’utilisateur existe dans auth-service
    try {
      await axios.get(`http://auth-service:5000/api/users/${user_id}`);
    } catch (err) {
      return res.status(404).json({ error: 'Utilisateur introuvable' });
    }

    let total = 0;

    // ✅ Calculer le total + construire les données pour OrderArticle
    const orderArticlesData = [];

    for (const article of articles) {
      const {
        article_id,
        quantity,
        name,
        price,
        image,
        restaurant_id,
        restaurant_name,
        supplements = [],
        removed_ingredients = [],
        selectedOptions = [],
      } = article;

      const subtotal = price * quantity;
      total += subtotal;

      orderArticlesData.push({
        id: uuidv4(),
        articleId: article_id,
        quantity,
        name,
        price,
        image,
        restaurant_id,
        restaurant_name,
        supplements: {
          create: supplements.map(s => ({
            name: s.name,
            extra_price: s.extra_price
          }))
        },
        removed_ingredients: {
          create: removed_ingredients.map(i => ({
            name: i.name
          }))
        },
        selected_options: {
          create: selectedOptions.map(o => ({
            name: o.name,
            value: o.value,
            extra_price: o.extra_price
          }))
        }
      });
    }

    // ✅ Appliquer la réduction du promoCode
    if (promoCodeId) {
      const promo = await prisma.promoCode.findUnique({ where: { id: promoCodeId } });
      if (promo && promo.discount) {
        total = total * (1 - promo.discount / 100);
      }
    }

    // ✅ Créer la commande
    const order = await prisma.order.create({
      data: {
        user_id,
        promoCodeId,
        total,
        articles: {
          create: orderArticlesData
        }
      },
      include: {
        articles: {
          include: {
            supplements: true,
            removed_ingredients: true,
            selected_options: true
          }
        },
        promoCode: true
      }
    });

    res.status(201).json(order);
  } catch (error) {
    console.error('Erreur lors de la création de la commande :', error);
    res.status(500).json({ error: 'Erreur lors de la création de la commande' });
  }
};
// 📄 Obtenir toutes les commandes
export const getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        articles: true,
        promoCode: true
      }
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des commandes' });
  }
};

// 🔍 Obtenir une commande par ID
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await prisma.order.findUnique({
      where: { order_id: id },
      include: {
        articles: true,
        promoCode: true
      }
    });

    if (!order) {
      return res.status(404).json({ error: 'Commande non trouvée' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de la commande' });
  }
};

// 🛠️ Mettre à jour une commande (modification simple, par ex. du code promo)
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { promoCodeId } = req.body;

    const order = await prisma.order.update({
      where: { order_id: id },
      data: { promoCodeId },
      include: {
        articles: true,
        promoCode: true
      }
    });

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la commande' });
  }
};

// ❌ Supprimer une commande
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    // Supprimer les articles liés à la commande
    await prisma.orderArticle.deleteMany({
      where: { order_id: id }
    });

    await prisma.order.delete({
      where: { order_id: id }
    });

    res.json({ message: 'Commande supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de la commande' });
  }
};

