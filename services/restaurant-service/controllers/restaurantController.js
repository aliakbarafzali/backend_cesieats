import { PrismaClient } from '@prisma/client';
import { uploadImage, deleteImage } from '../utils/firebaseStorage.js';
import ERROR_CODES from '../utils/errorCodes.js';

const prisma = new PrismaClient();

const createRestaurant = async (req, res, next) => {
  try {
    const {
      restaurant_name,
      address,
      restaurant_phone,
      restaurant_email,
      opening_hours,
      restaurant_type,
      owner_id
    } = req.body;

    if (!restaurant_name || !address || !owner_id) {
      return res.status(400).json({
        error: {
          code: ERROR_CODES.INVALID_RESTAURANT_DATA.code,
          message: ERROR_CODES.INVALID_RESTAURANT_DATA.message,
          details: 'Les champs name, address et owner_id sont requis'
        }
      });
    }

    // Vérifie le type d'utilisateur
    const userResponse = await fetch(`http://auth-service:5000/api/users/${owner_id}`);
    const userData = await userResponse.json();
    if (!userResponse.ok || userData.user_type !== 3) {
      return res.status(403).json({
        error: {
          code: ERROR_CODES.FORBIDDEN.code,
          message: ERROR_CODES.FORBIDDEN.message,
          details: "Seuls les restaurateurs peuvent créer des restaurants"
        }
      });
    }

    // Vérifie si l'adresse existe déjà
    let newAddress = null;
    if (address.mapbox_id) {
      const existingAddress = await prisma.address.findUnique({
        where: { place_id: address.mapbox_id }
      });
      if (existingAddress) {
        newAddress = existingAddress;
      }
    }

    // Création de l'adresse si elle n'existe pas
    if (!newAddress) {
      newAddress = await prisma.address.create({
        data: {
          place_id: address.mapbox_id,
          street: address.name_preferred || "",
          city: address.context?.place?.name || "",
          postcode: address.context?.postcode?.name || "",
          country: address.context?.country?.name || "",
          lat: address.coordinates?.latitude?.toString() || "",
          lon: address.coordinates?.longitude?.toString() || ""
        }
      });
    }

    // Conversion string -> tableau -> connectOrCreate
    const typesArray = restaurant_type ? restaurant_type.split(',').map(t => t.trim()) : [];
    const connectOrCreateTypes = typesArray.map(name => ({
      where: { name },
      create: { name }
    }));

    const newRestaurant = await prisma.restaurant.create({
      data: {
        restaurant_name,
        restaurant_phone,
        restaurant_email,
        opening_hours,
        owner_id,
        address_id: newAddress.id,
        restaurant_type: {
          connectOrCreate: connectOrCreateTypes
        }
      },
      include: {
        restaurant_type: true,
        address: true
      }
    });

    res.status(201).json(newRestaurant);

  } catch (error) {
    next(error);
  }
};

const getAllRestaurants = async (req, res, next) => {
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
          : true,
        address: true
      }
    });

    res.status(200).json(restaurants);
  } catch (error) {
    next(error);
  }
};

const getRestaurantById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const restaurant = await prisma.restaurant.findUnique({
      where: { restaurant_id: id },
      include: { 
        restaurant_type: true,
        address: true,
        articles: true,
        categories: true,
      },
    });
    if (!restaurant) return res.status(404).json({
      error: {
        code: ERROR_CODES.RESTAURANT_NOT_FOUND.code,
        message: ERROR_CODES.RESTAURANT_NOT_FOUND.message,
        details: `Le restaurant avec l'ID ${id} n'existe pas`
      }
    });
    res.json(restaurant);
  } catch (error) {
    next(error);
  }
};

const updateRestaurant = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { address, ...restaurantData } = req.body;

    let updatedData = { ...restaurantData };

    // Gestion des images
    if (req.files) {
      if (req.files.banner_image) {
        const bannerPath = `restaurants/${id}/banner_${Date.now()}`;
        updatedData.banner_image_url = await uploadImage(req.files.banner_image[0], bannerPath);
      }
      if (req.files.logo_image) {
        const logoPath = `restaurants/${id}/logo_${Date.now()}`;
        updatedData.image_url = await uploadImage(req.files.logo_image[0], logoPath);
      }
    }

    // Si une nouvelle adresse est fournie
    if (address) {
      let updatedAddress = null;
      
      // Vérifie si l'adresse existe déjà
      if (address.mapbox_id) {
        const existingAddress = await prisma.address.findUnique({
          where: { place_id: address.mapbox_id }
        });
        if (existingAddress) {
          updatedAddress = existingAddress;
        }
      }

      // Création ou mise à jour de l'adresse
      if (!updatedAddress) {
        updatedAddress = await prisma.address.create({
          data: {
            place_id: address.mapbox_id,
            street: address.name_preferred || "",
            city: address.context?.place?.name || "",
            postcode: address.context?.postcode?.name || "",
            country: address.context?.country?.name || "",
            lat: address.coordinates?.latitude?.toString() || "",
            lon: address.coordinates?.longitude?.toString() || ""
          }
        });
      }

      updatedData.address_id = updatedAddress.id;
    }

    const updated = await prisma.restaurant.update({
      where: { restaurant_id: id },
      data: updatedData,
      include: {
        address: true,
        restaurant_type: true
      }
    });
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

const deleteRestaurant = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Récupérer le restaurant avec ses images
    const restaurant = await prisma.restaurant.findUnique({
      where: { restaurant_id: id },
      include: { address: true }
    });

    if (!restaurant) {
      return res.status(404).json({
        error: {
          code: ERROR_CODES.RESTAURANT_NOT_FOUND.code,
          message: ERROR_CODES.RESTAURANT_NOT_FOUND.message,
          details: `Le restaurant avec l'ID ${id} n'existe pas`
        }
      });
    }

    // Supprimer les images de Firebase si elles existent
    if (restaurant.banner_image_url) {
      await deleteImage(restaurant.banner_image_url);
    }
    if (restaurant.image_url) {
      await deleteImage(restaurant.image_url);
    }

    // Supprimer le restaurant
    await prisma.restaurant.delete({
      where: { restaurant_id: id },
    });

    // Supprimer l'adresse associée
    if (restaurant.address) {
      await prisma.address.delete({
        where: { id: restaurant.address.id }
      });
    }

    res.json({ message: 'Restaurant supprimé' });
  } catch (error) {
    next(error);
  }
};

export { createRestaurant, getAllRestaurants, getRestaurantById, updateRestaurant, deleteRestaurant };