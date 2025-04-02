import geocodeAddress from '../utils/geocode.js';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const createRestaurant = async (req, res) => {
  try {
    const {
      restaurant_name,
      restaurant_address,
      restaurant_phone,
      restaurant_email,
      opening_hours,
      restaurant_type, // ex: "Italien, Halal"
      owner_id
    } = req.body;

    if (!restaurant_name || !restaurant_address || !owner_id) {
      return res.status(400).json({ error: "Champs requis manquants." });
    }

    // Vérifie le type d'utilisateur (mock ou appel réel à ton service d'auth)
    const userResponse = await fetch(`http://auth-service:5000/api/users/${owner_id}`);
    const userData = await userResponse.json();
    if (!userResponse.ok || userData.user_type !== 3) {
      return res.status(403).json({ error: "L'utilisateur n'est pas autorisé à créer un restaurant." });
    }

    // Géolocalisation
    const { latitude, longitude } = await geocodeAddress(restaurant_address);

    // Conversion string -> tableau -> connectOrCreate
    const typesArray = restaurant_type ? restaurant_type.split(',').map(t => t.trim()) : [];
    const connectOrCreateTypes = typesArray.map(name => ({
      where: { name },
      create: { name }
    }));

    const newRestaurant = await prisma.restaurant.create({
      data: {
        restaurant_name,
        restaurant_address,
        restaurant_phone,
        restaurant_email,
        latitude,
        longitude,
        opening_hours,
        owner_id,
        restaurant_type: {
          connectOrCreate: connectOrCreateTypes
        }
      },
      include: {
        restaurant_type: true
      }
    });

    res.status(201).json(newRestaurant);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la création du restaurant." });
  }
};

const getAllRestaurants = async (req, res) => {
    try {
      const { owner, name, type } = req.query;
  
      const filters = {};
  
      if (owner) filters.owner_id = owner;
  
      if (name) {
        filters.restaurant_name = {
          contains: name,
          mode: 'insensitive'
        };
      }
  
      const restaurants = await prisma.restaurant.findMany({
        where: filters,
        include: {
          restaurant_type: type
            ? {
                where: {
                  name: {
                    contains: type,
                    mode: 'insensitive'
                  }
                }
              }
            : true
        }
      });
  
      res.status(200).json(restaurants);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la récupération des restaurants' });
    }
  };

const getRestaurantById = async (req, res) => {
    try {
      const { id } = req.params;
      const restaurant = await prisma.restaurant.findUnique({
        where: { restaurant_id: id },
        include: { restaurant_type: true },
      });
      if (!restaurant) return res.status(404).json({ error: 'Restaurant non trouvé' });
      res.json(restaurant);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  };

  const updateRestaurant = async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const updated = await prisma.restaurant.update({
        where: { restaurant_id: id },
        data,
      });
      res.json(updated);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la mise à jour' });
    }
  };
  
  const deleteRestaurant = async (req, res) => {
    try {
      const { id } = req.params;
      await prisma.restaurant.delete({
        where: { restaurant_id: id },
      });
      res.json({ message: 'Restaurant supprimé' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur lors de la suppression' });
    }
  };

export { createRestaurant, getAllRestaurants, getRestaurantById, deleteRestaurant, updateRestaurant };