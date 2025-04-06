import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seeding...');

  // Nettoyage de la base de données
  console.log('🧹 Nettoyage de la base de données...');
  await prisma.review.deleteMany();
  await prisma.article.deleteMany();
  await prisma.category.deleteMany();
  await prisma.restaurant.deleteMany();
  await prisma.restaurantType.deleteMany();
  await prisma.address.deleteMany();

  // Création des types de restaurants
  console.log('🏪 Création des types de restaurants...');
  const types = await Promise.all([
    prisma.restaurantType.create({ data: { name: 'Petit-Dejeuner' } }),
    prisma.restaurantType.create({ data: { name: 'Fast Food' } }),
    prisma.restaurantType.create({ data: { name: 'Café' } }),
    prisma.restaurantType.create({ data: { name: 'Pizza' } }),
    prisma.restaurantType.create({ data: { name: 'Burgers' } }),
    prisma.restaurantType.create({ data: { name: 'Poulet' } }),
    prisma.restaurantType.create({ data: { name: 'Desserts' } }),
    prisma.restaurantType.create({ data: { name: 'Healthy' } }),
    prisma.restaurantType.create({ data: { name: 'Indien' } }),
    prisma.restaurantType.create({ data: { name: 'Halal' } }),
    prisma.restaurantType.create({ data: { name: 'Comfort Food' } }),
    prisma.restaurantType.create({ data: { name: 'Asiatique' } }),
    prisma.restaurantType.create({ data: { name: 'Chinois' } }),
    prisma.restaurantType.create({ data: { name: 'Grec' } }),
    prisma.restaurantType.create({ data: { name: 'Italien' } }),
    prisma.restaurantType.create({ data: { name: 'Japonais' } }),
    prisma.restaurantType.create({ data: { name: 'Kebab' } }),
    prisma.restaurantType.create({ data: { name: 'Koreen' } }),
    prisma.restaurantType.create({ data: { name: 'Moyen-Orient' } }),
    prisma.restaurantType.create({ data: { name: 'Sushi' } }),
    prisma.restaurantType.create({ data: { name: 'Thai' } })
  ]);

  // Création des adresses (une par restaurant)
  console.log('📍 Création des adresses...');
  const addresses = await Promise.all([
    prisma.address.create({
      data: {
        place_id: 'place_1',
        street: '23 Rue de la Paix',
        city: 'Paris',
        postcode: '75001',
        country: 'France',
        lat: '48.8566',
        lon: '2.3522'
      }
    }),
    prisma.address.create({
      data: {
        place_id: 'place_2',
        street: '140 Avenue des Champs-Élysées',
        city: 'Paris',
        postcode: '75008',
        country: 'France',
        lat: '48.8698',
        lon: '2.3079'
      }
    }),
    prisma.address.create({
      data: {
        place_id: 'place_3',
        street: '10 Rue de Rivoli',
        city: 'Paris',
        postcode: '75004',
        country: 'France',
        lat: '48.8556',
        lon: '2.3622'
      }
    }),
    prisma.address.create({
      data: {
        place_id: 'place_4',
        street: '5 Boulevard Haussmann',
        city: 'Paris',
        postcode: '75009',
        country: 'France',
        lat: '48.8700',
        lon: '2.3310'
      }
    }),
    prisma.address.create({
      data: {
        place_id: 'place_5',
        street: '18 Rue de la République',
        city: 'Paris',
        postcode: '75011',
        country: 'France',
        lat: '48.8530',
        lon: '2.3690'
      }
    })
  ]);

  // Création des adresses supplémentaires
  console.log('📍 Création des adresses supplémentaires...');
  const additionalAddresses = await Promise.all([
    prisma.address.create({
      data: {
        place_id: 'place_6',
        street: '45 Rue de la Paix',
        city: 'Paris',
        postcode: '75002',
        country: 'France',
        lat: '48.8666',
        lon: '2.3322'
      }
    }),
    prisma.address.create({
      data: {
        place_id: 'place_7',
        street: '78 Avenue des Champs-Élysées',
        city: 'Paris',
        postcode: '75008',
        country: 'France',
        lat: '48.8698',
        lon: '2.3079'
      }
    }),
    prisma.address.create({
      data: {
        place_id: 'place_8',
        street: '12 Rue de Rivoli',
        city: 'Paris',
        postcode: '75004',
        country: 'France',
        lat: '48.8556',
        lon: '2.3622'
      }
    }),
    prisma.address.create({
      data: {
        place_id: 'place_9',
        street: '32 Boulevard Haussmann',
        city: 'Paris',
        postcode: '75009',
        country: 'France',
        lat: '48.8700',
        lon: '2.3310'
      }
    }),
    prisma.address.create({
      data: {
        place_id: 'place_10',
        street: '56 Rue de la République',
        city: 'Paris',
        postcode: '75011',
        country: 'France',
        lat: '48.8530',
        lon: '2.3690'
      }
    })
  ]);

  // Création des restaurants
  console.log('🍽️ Création des restaurants...');
  const restaurants = await Promise.all([
    // Restaurant 1 : Burger King
    prisma.restaurant.create({
      data: {
        restaurant_name: 'Burger King',
        restaurant_phone: '+33123456789',
        restaurant_email: 'contact@burgerking.fr',
        image_url: 'https://example.com/burgerking.jpg',
        banner_image_url: 'https://example.com/burgerking-banner.jpg',
        owner_id: '550e8400-e29b-41d4-a716-446655440000',
        rating: 0,
        offers_available: true,
        address_id: addresses[0].id,
        restaurant_type: { connect: [{ name: 'Fast Food' }] },
        // Création imbriquée des horaires d'ouverture
        openingHours: {
          create: {
            monday: "07:00-23:30",
            tuesday: "07:00-23:30",
            wednesday: "07:00-23:30",
            thursday: "07:00-23:30",
            friday: "07:00-00:30",
            saturday: "07:00-00:30",
            sunday: "08:00-23:00"
          }
        }
      }
    }),
    // Restaurant 2 : Pizza Hut
    prisma.restaurant.create({
      data: {
        restaurant_name: 'Pizza Hut',
        restaurant_phone: '+33987654321',
        restaurant_email: 'contact@pizzahut.fr',
        image_url: 'https://example.com/pizzahut.jpg',
        banner_image_url: 'https://example.com/pizzahut-banner.jpg',
        owner_id: '550e8400-e29b-41d4-a716-446655440001',
        rating: 0,
        offers_available: true,
        address_id: addresses[1].id,
        restaurant_type: {
          connect: [{ name: 'Pizza' }, { name: 'Italien' }]
        },
        openingHours: {
          create: {
            monday: "07:00-23:30",
            tuesday: "07:00-23:30",
            wednesday: "07:00-23:30",
            thursday: "07:00-23:30",
            friday: "07:00-00:30",
            saturday: "07:00-00:30",
            sunday: "08:00-23:00"
          }
        }
      }
    }),
    // Restaurant 3 : Sushi World
    prisma.restaurant.create({
      data: {
        restaurant_name: 'Sushi World',
        restaurant_phone: '+33111222333',
        restaurant_email: 'contact@sushiworld.fr',
        image_url: 'https://example.com/sushiworld.jpg',
        banner_image_url: 'https://example.com/sushiworld-banner.jpg',
        owner_id: '550e8400-e29b-41d4-a716-446655440004',
        rating: 0,
        offers_available: false,
        address_id: addresses[2].id,
        restaurant_type: {
          connect: [{ name: 'Japonais' }]
        },
        openingHours: {
          create: {
            monday: "07:00-23:30",
            tuesday: "07:00-23:30",
            wednesday: "07:00-23:30",
            thursday: "07:00-23:30",
            friday: "07:00-00:30",
            saturday: "07:00-00:30",
            sunday: "08:00-23:00"
          }
        }
      }
    }),
    // Restaurant 4 : The Breakfast Club
    prisma.restaurant.create({
      data: {
        restaurant_name: 'The Breakfast Club',
        restaurant_phone: '+33144556677',
        restaurant_email: 'contact@breakfastclub.fr',
        image_url: 'https://example.com/breakfastclub.jpg',
        banner_image_url: 'https://example.com/breakfastclub-banner.jpg',
        owner_id: '550e8400-e29b-41d4-a716-446655440006',
        rating: 0,
        offers_available: true,
        address_id: addresses[3].id,
        restaurant_type: {
          connect: [{ name: 'Petit-Dejeuner' }, { name: 'Café' }]
        },
        openingHours: {
          create: {
            monday: "07:00-23:30",
            tuesday: "07:00-23:30",
            wednesday: "07:00-23:30",
            thursday: "07:00-23:30",
            friday: "07:00-00:30",
            saturday: "07:00-00:30",
            sunday: "08:00-23:00"
          }
        }
      }
    }),
    // Restaurant 5 : Spicy Chicken Express
    prisma.restaurant.create({
      data: {
        restaurant_name: 'Spicy Chicken Express',
        restaurant_phone: '+33155667788',
        restaurant_email: 'contact@spicychicken.fr',
        image_url: 'https://example.com/spicychicken.jpg',
        banner_image_url: 'https://example.com/spicychicken-banner.jpg',
        owner_id: '550e8400-e29b-41d4-a716-446655440007',
        rating: 0,
        offers_available: true,
        address_id: addresses[4].id,
        restaurant_type: {
          connect: [{ name: 'Poulet' }, { name: 'Halal' }]
        },
        openingHours: {
          create: {
            monday: "07:00-23:30",
            tuesday: "07:00-23:30",
            wednesday: "07:00-23:30",
            thursday: "07:00-23:30",
            friday: "07:00-00:30",
            saturday: "07:00-00:30",
            sunday: "08:00-23:00"
          }
        }
      }
    })
  ]);

  // Création des restaurants supplémentaires
  console.log('🍽️ Création des restaurants supplémentaires...');
  const additionalRestaurants = await Promise.all([
    // Restaurant Indien
    prisma.restaurant.create({
      data: {
        restaurant_name: 'Taj Mahal',
        restaurant_phone: '+33123456790',
        restaurant_email: 'contact@tajmahal.fr',
        image_url: 'https://example.com/tajmahal.jpg',
        banner_image_url: 'https://example.com/tajmahal-banner.jpg',
        owner_id: '550e8400-e29b-41d4-a716-446655440020',
        rating: 0,
        offers_available: true,
        address_id: additionalAddresses[0].id,
        restaurant_type: {
          connect: [{ name: 'Indien' }, { name: 'Halal' }]
        },
        openingHours: {
          create: {
            monday: "11:00-23:00",
            tuesday: "11:00-23:00",
            wednesday: "11:00-23:00",
            thursday: "11:00-23:00",
            friday: "11:00-00:00",
            saturday: "11:00-00:00",
            sunday: "11:00-23:00"
          }
        }
      }
    }),
    // Restaurant Chinois
    prisma.restaurant.create({
      data: {
        restaurant_name: 'Dragon d\'Or',
        restaurant_phone: '+33123456791',
        restaurant_email: 'contact@dragondor.fr',
        image_url: 'https://example.com/dragondor.jpg',
        banner_image_url: 'https://example.com/dragondor-banner.jpg',
        owner_id: '550e8400-e29b-41d4-a716-446655440021',
        rating: 0,
        offers_available: true,
        address_id: additionalAddresses[1].id,
        restaurant_type: {
          connect: [{ name: 'Chinois' }, { name: 'Asiatique' }]
        },
        openingHours: {
          create: {
            monday: "11:00-23:00",
            tuesday: "11:00-23:00",
            wednesday: "11:00-23:00",
            thursday: "11:00-23:00",
            friday: "11:00-00:00",
            saturday: "11:00-00:00",
            sunday: "11:00-23:00"
          }
        }
      }
    }),
    // Restaurant Grec
    prisma.restaurant.create({
      data: {
        restaurant_name: 'Ouzo',
        restaurant_phone: '+33123456792',
        restaurant_email: 'contact@ouzo.fr',
        image_url: 'https://example.com/ouzo.jpg',
        banner_image_url: 'https://example.com/ouzo-banner.jpg',
        owner_id: '550e8400-e29b-41d4-a716-446655440022',
        rating: 0,
        offers_available: true,
        address_id: additionalAddresses[2].id,
        restaurant_type: {
          connect: [{ name: 'Grec' }, { name: 'Moyen-Orient' }]
        },
        openingHours: {
          create: {
            monday: "11:00-23:00",
            tuesday: "11:00-23:00",
            wednesday: "11:00-23:00",
            thursday: "11:00-23:00",
            friday: "11:00-00:00",
            saturday: "11:00-00:00",
            sunday: "11:00-23:00"
          }
        }
      }
    }),
    // Restaurant Kebab
    prisma.restaurant.create({
      data: {
        restaurant_name: 'Sultan Kebab',
        restaurant_phone: '+33123456793',
        restaurant_email: 'contact@sultankebab.fr',
        image_url: 'https://example.com/sultankebab.jpg',
        banner_image_url: 'https://example.com/sultankebab-banner.jpg',
        owner_id: '550e8400-e29b-41d4-a716-446655440023',
        rating: 0,
        offers_available: true,
        address_id: additionalAddresses[3].id,
        restaurant_type: {
          connect: [{ name: 'Kebab' }, { name: 'Halal' }, { name: 'Fast Food' }]
        },
        openingHours: {
          create: {
            monday: "11:00-23:00",
            tuesday: "11:00-23:00",
            wednesday: "11:00-23:00",
            thursday: "11:00-23:00",
            friday: "11:00-00:00",
            saturday: "11:00-00:00",
            sunday: "11:00-23:00"
          }
        }
      }
    }),
    // Restaurant Coréen
    prisma.restaurant.create({
      data: {
        restaurant_name: 'Seoul Garden',
        restaurant_phone: '+33123456794',
        restaurant_email: 'contact@seoulgarden.fr',
        image_url: 'https://example.com/seoulgarden.jpg',
        banner_image_url: 'https://example.com/seoulgarden-banner.jpg',
        owner_id: '550e8400-e29b-41d4-a716-446655440024',
        rating: 0,
        offers_available: true,
        address_id: additionalAddresses[4].id,
        restaurant_type: {
          connect: [{ name: 'Koreen' }, { name: 'Asiatique' }]
        },
        openingHours: {
          create: {
            monday: "11:00-23:00",
            tuesday: "11:00-23:00",
            wednesday: "11:00-23:00",
            thursday: "11:00-23:00",
            friday: "11:00-00:00",
            saturday: "11:00-00:00",
            sunday: "11:00-23:00"
          }
        }
      }
    })
  ]);

  // --- Taj Mahal
  console.log('🍛 Création des catégories pour Taj Mahal...');
  const tajCategories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Entrées',
        restaurant_id: additionalRestaurants[1].restaurant_id
      }
    }),
    prisma.category.create({
      data: {
        name: 'Curries',
        restaurant_id: additionalRestaurants[1].restaurant_id
      }
    }),
    prisma.category.create({
      data: {
        name: 'Riz et Pains',
        restaurant_id: additionalRestaurants[1].restaurant_id
      }
    }),
    prisma.category.create({
      data: {
        name: 'Desserts',
        restaurant_id: additionalRestaurants[1].restaurant_id
      }
    })
  ]);

  // --- Ouzo
  console.log('🍽️ Création des catégories pour Ouzo...');
  const ouzoCategories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Mezzés',
        restaurant_id: additionalRestaurants[2].restaurant_id
      }
    }),
    prisma.category.create({
      data: {
        name: 'Entrées',
        restaurant_id: additionalRestaurants[2].restaurant_id
      }
    }),
    prisma.category.create({
      data: {
        name: 'Plats Principaux',
        restaurant_id: additionalRestaurants[2].restaurant_id
      }
    }),
    prisma.category.create({
      data: {
        name: 'Desserts',
        restaurant_id: additionalRestaurants[2].restaurant_id
      }
    }),
    prisma.category.create({
      data: {
        name: 'Boissons',
        restaurant_id: additionalRestaurants[2].restaurant_id
      }
    })
  ]);

  // --- Seoul Garden
  console.log('🍜 Création des catégories pour Seoul Garden...');
  const seoulCategories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Entrées',
        restaurant_id: additionalRestaurants[4].restaurant_id
      }
    }),
    prisma.category.create({
      data: {
        name: 'Plats Principaux',
        restaurant_id: additionalRestaurants[4].restaurant_id
      }
    }),
    prisma.category.create({
      data: {
        name: 'Soupes',
        restaurant_id: additionalRestaurants[4].restaurant_id
      }
    }),
    prisma.category.create({
      data: {
        name: 'Desserts',
        restaurant_id: additionalRestaurants[4].restaurant_id
      }
    }),
    prisma.category.create({
      data: {
        name: 'Boissons',
        restaurant_id: additionalRestaurants[4].restaurant_id
      }
    })
  ]);

  // --- Sultan Kebab
  console.log('🥙 Création des catégories pour Sultan Kebab...');
  const sultanCategories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Kebabs',
        restaurant_id: additionalRestaurants[3].restaurant_id
      }
    }),
    prisma.category.create({
      data: {
        name: 'Assiettes',
        restaurant_id: additionalRestaurants[3].restaurant_id
      }
    }),
    prisma.category.create({
      data: {
        name: 'Boissons',
        restaurant_id: additionalRestaurants[3].restaurant_id
      }
    })
  ]);

  // Création des articles pour chaque restaurant

  // --- Burger King
  console.log('🍔 Création des articles pour Burger King...');
  const bkCategories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Burgers',
        restaurant_id: additionalRestaurants[0].restaurant_id
      }
    }),
    prisma.category.create({
      data: {
        name: 'Sides',
        restaurant_id: additionalRestaurants[0].restaurant_id
      }
    }),
    prisma.category.create({
      data: {
        name: 'Desserts',
        restaurant_id: additionalRestaurants[0].restaurant_id
      }
    }),
    prisma.category.create({
      data: {
        name: 'Boissons',
        restaurant_id: additionalRestaurants[0].restaurant_id
      }
    })
  ]);

  // --- Pizza Hut
  console.log('🍕 Création des articles pour Pizza Hut...');
  const phCategories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Pizzas',
        restaurant_id: restaurants[1].restaurant_id
      }
    }),
    prisma.category.create({
      data: {
        name: 'Pastas',
        restaurant_id: restaurants[1].restaurant_id
      }
    }),
    prisma.category.create({
      data: {
        name: 'Desserts',
        restaurant_id: restaurants[1].restaurant_id
      }
    }),
    prisma.category.create({
      data: {
        name: 'Drinks',
        restaurant_id: restaurants[1].restaurant_id
      }
    })
  ]);

  // --- Sushi World
  console.log('🍣 Création des articles pour Sushi World...');
  const swCategories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Sushi',
        restaurant_id: restaurants[2].restaurant_id
      }
    }),
    prisma.category.create({
      data: {
        name: 'Ramen',
        restaurant_id: restaurants[2].restaurant_id
      }
    }),
    prisma.category.create({
      data: {
        name: 'Appetizers',
        restaurant_id: restaurants[2].restaurant_id
      }
    }),
    prisma.category.create({
      data: {
        name: 'Desserts',
        restaurant_id: restaurants[2].restaurant_id
      }
    }),
    prisma.category.create({
      data: {
        name: 'Drinks',
        restaurant_id: restaurants[2].restaurant_id
      }
    })
  ]);

  // --- The Breakfast Club
  console.log('🥞 Création des catégories pour The Breakfast Club...');
  const bcCategories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Breakfast',
        restaurant_id: restaurants[3].restaurant_id
      }
    }),
    prisma.category.create({
      data: {
        name: 'Coffee',
        restaurant_id: restaurants[3].restaurant_id
      }
    }),
    prisma.category.create({
      data: {
        name: 'Desserts',
        restaurant_id: restaurants[3].restaurant_id
      }
    })
  ]);

  // --- Spicy Chicken Express
  console.log('🍗 Création des catégories pour Spicy Chicken Express...');
  const sceCategories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Chicken',
        restaurant_id: restaurants[4].restaurant_id
      }
    }),
    prisma.category.create({
      data: {
        name: 'Sides',
        restaurant_id: restaurants[4].restaurant_id
      }
    }),
    prisma.category.create({
      data: {
        name: 'Drinks',
        restaurant_id: restaurants[4].restaurant_id
      }
    }),
    prisma.category.create({
      data: {
        name: 'Desserts',
        restaurant_id: restaurants[4].restaurant_id
      }
    })
  ]);

  await Promise.all([
    // Catégorie Burgers
    prisma.article.create({
      data: {
        name: 'Whopper',
        price: 8.99,
        desc: 'Burger signature avec viande de bœuf grillée',
        image: 'https://example.com/whopper.jpg',
        available: true,
        has_offer: true,
        offer_type: 'DISCOUNT',
        discount_percent: 20.00,
        restaurant_id: restaurants[0].restaurant_id,
        categories: { connect: [{ category_id: bkCategories[0].category_id }] },
        ingredients: {
          create: [
            { name: 'Pain', removable: false },
            { name: 'Viande de bœuf', removable: false },
            { name: 'Salade', removable: true },
            { name: 'Tomate', removable: true },
            { name: 'Oignon', removable: true },
            { name: 'Cornichon', removable: true }
          ]
        },
        supplements: {
          create: [
            { name: 'Double Viande', is_optional: true, extra_price: 2.50 },
            { name: 'Bacon', is_optional: true, extra_price: 1.50 },
            { name: 'Fromage', is_optional: true, extra_price: 1.00 }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Double Whopper',
        price: 8.99,
        desc: 'Double burger avec double viande',
        image: 'https://example.com/doublewhopper.jpg',
        available: true,
        restaurant_id: restaurants[0].restaurant_id,
        categories: {
          connect: {
            category_id: bkCategories[0].category_id
          }
        },
        options: {
          create: [
            { name: 'Cuisson', value: 'Bien cuit', is_default: true },
            { name: 'Cuisson', value: 'À point', is_default: false },
            { name: 'Cuisson', value: 'Saignant', is_default: false }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Chicken Royale',
        price: 7.99,
        desc: 'Burger au poulet pané',
        image: 'https://example.com/chickenroyale.jpg',
        available: true,
        restaurant_id: restaurants[0].restaurant_id,
        categories: {
          connect: {
            category_id: bkCategories[0].category_id
          }
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Veggie Burger',
        price: 7.49,
        desc: 'Burger végétarien avec galette de légumes',
        image: 'https://example.com/veggieburger.jpg',
        available: true,
        restaurant_id: restaurants[0].restaurant_id,
        categories: { connect: [{ category_id: bkCategories[0].category_id }] },
        ingredients: {
          create: [
            { name: 'Pain', removable: false },
            { name: 'Galette végétarienne', removable: false },
            { name: 'Salade', removable: true },
            { name: 'Tomate', removable: true },
            { name: 'Oignon', removable: true }
          ]
        },
        supplements: {
          create: [
            { name: 'Double Galette', is_optional: true, extra_price: 2.00 },
            { name: 'Fromage', is_optional: true, extra_price: 1.00 }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Bacon King',
        price: 9.99,
        desc: 'Burger avec double viande et double bacon',
        image: 'https://example.com/baconking.jpg',
        available: true,
        restaurant_id: restaurants[0].restaurant_id,
        categories: { connect: [{ category_id: bkCategories[0].category_id }] },
        ingredients: {
          create: [
            { name: 'Pain', removable: false },
            { name: 'Double Viande', removable: false },
            { name: 'Double Bacon', removable: false },
            { name: 'Fromage', removable: false },
            { name: 'Salade', removable: true },
            { name: 'Tomate', removable: true }
          ]
        },
        supplements: {
          create: [
            { name: 'Triple Viande', is_optional: true, extra_price: 2.50 },
            { name: 'Triple Bacon', is_optional: true, extra_price: 2.00 }
          ]
        }
      }
    }),
    // Catégorie Sides
    prisma.article.create({
      data: {
        name: 'Fries',
        price: 3.49,
        desc: 'Frites croustillantes',
        image: 'https://example.com/fries.jpg',
        available: true,
        restaurant_id: restaurants[0].restaurant_id,
        categories: { connect: [{ category_id: bkCategories[1].category_id }] },
        options: {
          create: [
            { name: 'Taille', value: 'Petite', is_default: true },
            { name: 'Taille', value: 'Moyenne', is_default: false, extra_price: 1.00 },
            { name: 'Taille', value: 'Grande', is_default: false, extra_price: 2.00 }
          ]
        },
        supplements: {
          create: [
            { name: 'Sel', is_optional: true, extra_price: 0.00 },
            { name: 'Ketchup', is_optional: true, extra_price: 0.50 },
            { name: 'Mayonnaise', is_optional: true, extra_price: 0.50 }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Onion Rings',
        price: 4.99,
        desc: 'Rondelles d\'oignon panées',
        image: 'https://example.com/onionrings.jpg',
        available: true,
        restaurant_id: restaurants[0].restaurant_id,
        categories: { connect: [{ category_id: bkCategories[1].category_id }] },
        options: {
          create: [
            { name: 'Taille', value: 'Petite', is_default: true },
            { name: 'Taille', value: 'Moyenne', is_default: false, extra_price: 1.00 },
            { name: 'Taille', value: 'Grande', is_default: false, extra_price: 2.00 }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Chicken Nuggets',
        price: 4.99,
        desc: 'Nuggets croustillants de poulet',
        image: 'https://example.com/nuggets.jpg',
        available: true,
        restaurant_id: restaurants[0].restaurant_id,
        categories: { connect: [{ category_id: bkCategories[1].category_id }] },
        options: {
          create: [
            { name: 'Quantité', value: '6 pièces', is_default: true },
            { name: 'Quantité', value: '9 pièces', is_default: false, extra_price: 2.00 },
            { name: 'Quantité', value: '12 pièces', is_default: false, extra_price: 4.00 }
          ]
        },
        supplements: {
          create: [
            { name: 'Sauce BBQ', is_optional: true, extra_price: 0.50 },
            { name: 'Sauce Piquante', is_optional: true, extra_price: 0.50 },
            { name: 'Sauce Moutarde', is_optional: true, extra_price: 0.50 }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Cheese Bites',
        price: 4.49,
        desc: 'Bouchées de fromage fondant',
        image: 'https://example.com/cheesebites.jpg',
        available: true,
        restaurant_id: restaurants[0].restaurant_id,
        categories: { connect: [{ category_id: bkCategories[1].category_id }] },
        options: {
          create: [
            { name: 'Quantité', value: '6 pièces', is_default: true },
            { name: 'Quantité', value: '9 pièces', is_default: false, extra_price: 2.00 }
          ]
        }
      }
    }),
    // Catégorie Drinks
    prisma.article.create({
      data: {
        name: 'Milkshake',
        price: 4.50,
        desc: 'Milkshake onctueux, saveur au choix',
        image: 'https://example.com/milkshake.jpg',
        available: true,
        restaurant_id: restaurants[0].restaurant_id,
        categories: { connect: [{ category_id: bkCategories[2].category_id }] },
        options: {
          create: [
            { name: 'Goût', value: 'Vanille', is_default: true },
            { name: 'Goût', value: 'Chocolat', is_default: false },
            { name: 'Goût', value: 'Fraise', is_default: false },
            { name: 'Goût', value: 'Caramel', is_default: false },
            { name: 'Taille', value: 'Moyenne', is_default: true },
            { name: 'Taille', value: 'Grande', is_default: false, extra_price: 1.00 }
          ]
        },
        supplements: {
          create: [
            { name: 'Chantilly', is_optional: true, extra_price: 0.50 },
            { name: 'Pépites de Chocolat', is_optional: true, extra_price: 0.50 }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Coke',
        price: 2.99,
        desc: 'Boisson gazeuse rafraîchissante',
        image: 'https://example.com/coke.jpg',
        available: true,
        restaurant_id: restaurants[0].restaurant_id,
        categories: { connect: [{ category_id: bkCategories[2].category_id }] },
        options: {
          create: [
            { name: 'Taille', value: 'Petite', is_default: true },
            { name: 'Taille', value: 'Moyenne', is_default: false, extra_price: 0.50 },
            { name: 'Taille', value: 'Grande', is_default: false, extra_price: 1.00 }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Fanta',
        price: 2.99,
        desc: 'Boisson fruitée et pétillante',
        image: 'https://example.com/fanta.jpg',
        available: true,
        restaurant_id: restaurants[0].restaurant_id,
        categories: { connect: [{ category_id: bkCategories[2].category_id }] },
        options: {
          create: [
            { name: 'Taille', value: 'Petite', is_default: true },
            { name: 'Taille', value: 'Moyenne', is_default: false, extra_price: 0.50 },
            { name: 'Taille', value: 'Grande', is_default: false, extra_price: 1.00 }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Ice Tea',
        price: 2.99,
        desc: 'Thé glacé rafraîchissant',
        image: 'https://example.com/icetea.jpg',
        available: true,
        restaurant_id: restaurants[0].restaurant_id,
        categories: { connect: [{ category_id: bkCategories[2].category_id }] },
        options: {
          create: [
            { name: 'Taille', value: 'Petite', is_default: true },
            { name: 'Taille', value: 'Moyenne', is_default: false, extra_price: 0.50 },
            { name: 'Taille', value: 'Grande', is_default: false, extra_price: 1.00 }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Water',
        price: 1.99,
        desc: 'Eau minérale',
        image: 'https://example.com/water.jpg',
        available: true,
        restaurant_id: restaurants[0].restaurant_id,
        categories: { connect: [{ category_id: bkCategories[2].category_id }] },
        options: {
          create: [
            { name: 'Taille', value: 'Petite', is_default: true },
            { name: 'Taille', value: 'Grande', is_default: false, extra_price: 0.50 }
          ]
        }
      }
    }),
    // Catégorie Burgers
    prisma.article.create({
      data: {
        name: 'Double Whopper',
        price: 8.99,
        desc: 'Double burger avec double viande',
        image: 'https://example.com/doublewhopper.jpg',
        available: true,
        restaurant_id: restaurants[0].restaurant_id,
        categories: {
          connect: {
            category_id: bkCategories[0].category_id
          }
        },
        options: {
          create: [
            { name: 'Cuisson', value: 'Bien cuit', is_default: true },
            { name: 'Cuisson', value: 'À point', is_default: false },
            { name: 'Cuisson', value: 'Saignant', is_default: false }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Chicken Royale',
        price: 7.99,
        desc: 'Burger au poulet pané',
        image: 'https://example.com/chickenroyale.jpg',
        available: true,
        restaurant_id: restaurants[0].restaurant_id,
        categories: {
          connect: {
            category_id: bkCategories[0].category_id
          }
        }
      }
    }),

    // Catégorie Accompagnements
    prisma.article.create({
      data: {
        name: 'Onion Rings',
        price: 4.99,
        desc: 'Rondelles d\'oignon panées',
        image: 'https://example.com/onionrings.jpg',
        available: true,
        restaurant_id: restaurants[0].restaurant_id,
        categories: {
          connect: {
            category_id: bkCategories[1].category_id
          }
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Salade César',
        price: 6.99,
        desc: 'Salade césar avec poulet',
        image: 'https://example.com/saladecesar.jpg',
        available: true,
        restaurant_id: restaurants[0].restaurant_id,
        categories: {
          connect: {
            category_id: bkCategories[1].category_id
          }
        }
      }
    }),

    // Catégorie Desserts
    prisma.article.create({
      data: {
        name: 'Sundae Caramel',
        price: 4.99,
        desc: 'Glace vanille avec caramel',
        image: 'https://example.com/sundaecaramel.jpg',
        available: true,
        restaurant_id: restaurants[0].restaurant_id,
        categories: {
          connect: {
            category_id: bkCategories[3].category_id
          }
        }
      }
    })
  ]);

  // --- Pizza Hut
  console.log('🍕 Création des articles pour Pizza Hut...');
  await Promise.all([
    // Catégorie Pizzas
    prisma.article.create({
      data: {
        name: 'Reine',
        price: 12.99,
        desc: 'Pizza classique avec jambon et champignons',
        image: 'https://example.com/reine.jpg',
        available: true,
        has_offer: true,
        offer_type: '2FOR1',
        restaurant_id: restaurants[1].restaurant_id,
        categories: { connect: [{ category_id: phCategories[0].category_id }] },
        ingredients: {
          create: [
            { name: 'Pâte', removable: false },
            { name: 'Sauce Tomate', removable: false },
            { name: 'Fromage', removable: false },
            { name: 'Jambon', removable: true },
            { name: 'Champignons', removable: true }
          ]
        },
        supplements: {
          create: [
            { name: 'Extra Fromage', is_optional: true, extra_price: 2.00 },
            { name: 'Champignons', is_optional: true, extra_price: 1.50 },
            { name: 'Olives', is_optional: true, extra_price: 1.00 }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Margherita',
        price: 10.99,
        desc: 'Pizza traditionnelle avec tomate et mozzarella',
        image: 'https://example.com/margherita.jpg',
        available: true,
        restaurant_id: restaurants[1].restaurant_id,
        categories: { connect: [{ category_id: phCategories[0].category_id }] },
        ingredients: {
          create: [
            { name: 'Pâte', removable: false },
            { name: 'Sauce Tomate', removable: false },
            { name: 'Mozzarella', removable: false },
            { name: 'Basilic', removable: true }
          ]
        },
        supplements: {
          create: [
            { name: 'Extra Mozzarella', is_optional: true, extra_price: 2.00 },
            { name: 'Parmesan', is_optional: true, extra_price: 1.50 }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Pepperoni',
        price: 11.99,
        desc: 'Pizza avec sauce tomate et pepperoni',
        image: 'https://example.com/pepperoni.jpg',
        available: true,
        restaurant_id: restaurants[1].restaurant_id,
        categories: { connect: [{ category_id: phCategories[0].category_id }] },
        ingredients: {
          create: [
            { name: 'Pâte', removable: false },
            { name: 'Sauce Tomate', removable: false },
            { name: 'Fromage', removable: false },
            { name: 'Pepperoni', removable: true }
          ]
        },
        supplements: {
          create: [
            { name: 'Extra Pepperoni', is_optional: true, extra_price: 2.00 },
            { name: 'Extra Fromage', is_optional: true, extra_price: 2.00 }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Vegetarian',
        price: 12.99,
        desc: 'Pizza végétarienne avec légumes frais',
        image: 'https://example.com/vegetarian.jpg',
        available: true,
        restaurant_id: restaurants[1].restaurant_id,
        categories: { connect: [{ category_id: phCategories[0].category_id }] },
        ingredients: {
          create: [
            { name: 'Pâte', removable: false },
            { name: 'Sauce Tomate', removable: false },
            { name: 'Fromage', removable: false },
            { name: 'Poivrons', removable: true },
            { name: 'Oignons', removable: true },
            { name: 'Champignons', removable: true },
            { name: 'Olives', removable: true }
          ]
        },
        supplements: {
          create: [
            { name: 'Extra Légumes', is_optional: true, extra_price: 2.00 },
            { name: 'Extra Fromage', is_optional: true, extra_price: 2.00 }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Hawaiian',
        price: 13.99,
        desc: 'Pizza avec jambon et ananas',
        image: 'https://example.com/hawaiian.jpg',
        available: true,
        restaurant_id: restaurants[1].restaurant_id,
        categories: { connect: [{ category_id: phCategories[0].category_id }] },
        ingredients: {
          create: [
            { name: 'Pâte', removable: false },
            { name: 'Sauce Tomate', removable: false },
            { name: 'Fromage', removable: false },
            { name: 'Jambon', removable: true },
            { name: 'Ananas', removable: true }
          ]
        },
        supplements: {
          create: [
            { name: 'Extra Jambon', is_optional: true, extra_price: 2.00 },
            { name: 'Extra Ananas', is_optional: true, extra_price: 1.50 }
          ]
        }
      }
    }),
    // Catégorie Pasta
    prisma.article.create({
      data: {
        name: 'Spaghetti Bolognese',
        price: 11.99,
        desc: 'Spaghetti avec sauce bolognaise maison',
        image: 'https://example.com/spaghetti.jpg',
        available: true,
        restaurant_id: restaurants[1].restaurant_id,
        categories: { connect: [{ category_id: phCategories[1].category_id }] },
        ingredients: {
          create: [
            { name: 'Spaghetti', removable: false },
            { name: 'Sauce Bolognaise', removable: false },
            { name: 'Parmesan', removable: true }
          ]
        },
        supplements: {
          create: [
            { name: 'Extra Parmesan', is_optional: true, extra_price: 1.00 },
            { name: 'Pain à l\'ail', is_optional: true, extra_price: 2.00 }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Fettuccine Alfredo',
        price: 12.99,
        desc: 'Fettuccine avec sauce crémeuse au fromage',
        image: 'https://example.com/fettuccine.jpg',
        available: true,
        restaurant_id: restaurants[1].restaurant_id,
        categories: { connect: [{ category_id: phCategories[1].category_id }] },
        ingredients: {
          create: [
            { name: 'Fettuccine', removable: false },
            { name: 'Sauce Alfredo', removable: false },
            { name: 'Parmesan', removable: true }
          ]
        },
        supplements: {
          create: [
            { name: 'Poulet', is_optional: true, extra_price: 3.00 },
            { name: 'Champignons', is_optional: true, extra_price: 2.00 }
          ]
        }
      }
    }),
    // Catégorie Desserts
    prisma.article.create({
      data: {
        name: 'Tiramisu',
        price: 5.99,
        desc: 'Dessert italien classique au café',
        image: 'https://example.com/tiramisu.jpg',
        available: true,
        restaurant_id: restaurants[1].restaurant_id,
        categories: { connect: [{ category_id: phCategories[2].category_id }] },
        options: {
          create: [
            { name: 'Taille', value: 'Normal', is_default: true },
            { name: 'Taille', value: 'Partage', is_default: false, extra_price: 3.00 }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Panna Cotta',
        price: 4.99,
        desc: 'Crème dessert italienne avec coulis de fruits rouges',
        image: 'https://example.com/pannacotta.jpg',
        available: true,
        restaurant_id: restaurants[1].restaurant_id,
        categories: { connect: [{ category_id: phCategories[2].category_id }] },
        options: {
          create: [
            { name: 'Sauce', value: 'Fruits Rouges', is_default: true },
            { name: 'Sauce', value: 'Caramel', is_default: false }
          ]
        }
      }
    }),
    // Catégorie Drinks
    prisma.article.create({
      data: {
        name: 'Lemonade',
        price: 3.99,
        desc: 'Limonade maison rafraîchissante',
        image: 'https://example.com/lemonade.jpg',
        available: true,
        restaurant_id: restaurants[1].restaurant_id,
        categories: { connect: [{ category_id: phCategories[3].category_id }] },
        options: {
          create: [
            { name: 'Taille', value: 'Moyenne', is_default: true },
            { name: 'Taille', value: 'Grande', is_default: false, extra_price: 1.00 }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Italian Soda',
        price: 4.49,
        desc: 'Soda italien avec sirop de fruits',
        image: 'https://example.com/italiansoda.jpg',
        available: true,
        restaurant_id: restaurants[1].restaurant_id,
        categories: { connect: [{ category_id: phCategories[3].category_id }] },
        options: {
          create: [
            { name: 'Saveur', value: 'Fraise', is_default: true },
            { name: 'Saveur', value: 'Citron', is_default: false },
            { name: 'Saveur', value: 'Framboise', is_default: false }
          ]
        }
      }
    }),
    // Catégorie Pizzas
    prisma.article.create({
      data: {
        name: 'Pizza Quatre Fromages',
        price: 12.99,
        desc: 'Pizza aux quatre fromages',
        image: 'https://example.com/quatrefromages.jpg',
        available: true,
        restaurant_id: restaurants[1].restaurant_id,
        categories: {
          connect: {
            category_id: phCategories[0].category_id
          }
        },
        options: {
          create: [
            { name: 'Taille', value: 'Petite', is_default: true },
            { name: 'Taille', value: 'Moyenne', is_default: false, extra_price: 2.00 },
            { name: 'Taille', value: 'Grande', is_default: false, extra_price: 4.00 }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Pizza Végétarienne',
        price: 11.99,
        desc: 'Pizza aux légumes',
        image: 'https://example.com/vegetarienne.jpg',
        available: true,
        restaurant_id: restaurants[1].restaurant_id,
        categories: {
          connect: {
            category_id: phCategories[0].category_id
          }
        },
        options: {
          create: [
            { name: 'Taille', value: 'Petite', is_default: true },
            { name: 'Taille', value: 'Moyenne', is_default: false, extra_price: 2.00 },
            { name: 'Taille', value: 'Grande', is_default: false, extra_price: 4.00 }
          ]
        }
      }
    }),

    // Catégorie Pâtes
    prisma.article.create({
      data: {
        name: 'Pâtes Carbonara',
        price: 9.99,
        desc: 'Pâtes à la carbonara',
        image: 'https://example.com/carbonara.jpg',
        available: true,
        restaurant_id: restaurants[1].restaurant_id,
        categories: {
          connect: {
            category_id: phCategories[1].category_id
          }
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Pâtes Bolognaise',
        price: 9.99,
        desc: 'Pâtes à la bolognaise',
        image: 'https://example.com/bolognaise.jpg',
        available: true,
        restaurant_id: restaurants[1].restaurant_id,
        categories: {
          connect: {
            category_id: phCategories[1].category_id
          }
        }
      }
    }),

    // Catégorie Desserts
    prisma.article.create({
      data: {
        name: 'Tiramisu',
        price: 5.99,
        desc: 'Tiramisu classique',
        image: 'https://example.com/tiramisu.jpg',
        available: true,
        restaurant_id: restaurants[1].restaurant_id,
        categories: {
          connect: {
            category_id: phCategories[3].category_id
          }
        }
      }
    })
  ]);

  // --- Sushi World
  console.log('🍣 Création des articles pour Sushi World...');
  await Promise.all([
    // Catégorie Sushi
    prisma.article.create({
      data: {
        name: 'California Roll',
        price: 8.99,
        desc: 'Rouleau de sushi avec crabe, avocat et concombre',
        image: 'https://example.com/californiaroll.jpg',
        available: true,
        restaurant_id: restaurants[2].restaurant_id,
        categories: { connect: [{ category_id: swCategories[0].category_id }] },
        ingredients: {
          create: [
            { name: 'Riz', removable: false },
            { name: 'Algue Nori', removable: false },
            { name: 'Crabe', removable: false },
            { name: 'Avocat', removable: true },
            { name: 'Concombre', removable: true }
          ]
        },
        supplements: {
          create: [
            { name: 'Extra Avocat', is_optional: true, extra_price: 1.50 },
            { name: 'Sauce Spéciale', is_optional: true, extra_price: 0.50 },
            { name: 'Wasabi', is_optional: true, extra_price: 0.50 }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Salmon Roll',
        price: 9.99,
        desc: 'Rouleau de sushi avec saumon frais',
        image: 'https://example.com/salmonroll.jpg',
        available: true,
        restaurant_id: restaurants[2].restaurant_id,
        categories: { connect: [{ category_id: swCategories[0].category_id }] },
        ingredients: {
          create: [
            { name: 'Riz', removable: false },
            { name: 'Algue Nori', removable: false },
            { name: 'Saumon', removable: false },
            { name: 'Concombre', removable: true }
          ]
        },
        supplements: {
          create: [
            { name: 'Extra Saumon', is_optional: true, extra_price: 2.00 },
            { name: 'Caviar', is_optional: true, extra_price: 1.50 }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Dragon Roll',
        price: 12.99,
        desc: 'Rouleau de sushi avec anguille et avocat',
        image: 'https://example.com/dragonroll.jpg',
        available: true,
        restaurant_id: restaurants[2].restaurant_id,
        categories: { connect: [{ category_id: swCategories[0].category_id }] },
        ingredients: {
          create: [
            { name: 'Riz', removable: false },
            { name: 'Algue Nori', removable: false },
            { name: 'Anguille', removable: false },
            { name: 'Avocat', removable: true },
            { name: 'Sauce Unagi', removable: false }
          ]
        },
        supplements: {
          create: [
            { name: 'Extra Anguille', is_optional: true, extra_price: 3.00 },
            { name: 'Extra Avocat', is_optional: true, extra_price: 1.50 }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Rainbow Roll',
        price: 13.99,
        desc: 'Rouleau de sushi avec différents poissons',
        image: 'https://example.com/rainbowroll.jpg',
        available: true,
        restaurant_id: restaurants[2].restaurant_id,
        categories: { connect: [{ category_id: swCategories[0].category_id }] },
        ingredients: {
          create: [
            { name: 'Riz', removable: false },
            { name: 'Algue Nori', removable: false },
            { name: 'Saumon', removable: false },
            { name: 'Thon', removable: false },
            { name: 'Anguille', removable: false }
          ]
        }
      }
    }),
    // Catégorie Ramen
    prisma.article.create({
      data: {
        name: 'Tonkotsu Ramen',
        price: 14.99,
        desc: 'Ramen au bouillon de porc',
        image: 'https://example.com/tonkotsu.jpg',
        available: true,
        restaurant_id: restaurants[2].restaurant_id,
        categories: { connect: [{ category_id: swCategories[1].category_id }] },
        ingredients: {
          create: [
            { name: 'Nouilles', removable: false },
            { name: 'Bouillon Tonkotsu', removable: false },
            { name: 'Porc', removable: false },
            { name: 'Oeuf', removable: true },
            { name: 'Algues', removable: true },
            { name: 'Oignons verts', removable: true }
          ]
        },
        supplements: {
          create: [
            { name: 'Extra Porc', is_optional: true, extra_price: 3.00 },
            { name: 'Extra Oeuf', is_optional: true, extra_price: 1.00 }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Miso Ramen',
        price: 13.99,
        desc: 'Ramen au bouillon miso',
        image: 'https://example.com/misoramen.jpg',
        available: true,
        restaurant_id: restaurants[2].restaurant_id,
        categories: { connect: [{ category_id: swCategories[1].category_id }] },
        ingredients: {
          create: [
            { name: 'Nouilles', removable: false },
            { name: 'Bouillon Miso', removable: false },
            { name: 'Porc', removable: false },
            { name: 'Oeuf', removable: true },
            { name: 'Algues', removable: true }
          ]
        }
      }
    }),
    // Catégorie Desserts
    prisma.article.create({
      data: {
        name: 'Mochi Ice Cream',
        price: 4.99,
        desc: 'Glace japonaise enrobée de pâte de riz',
        image: 'https://example.com/mochi.jpg',
        available: true,
        restaurant_id: restaurants[2].restaurant_id,
        categories: { connect: [{ category_id: swCategories[2].category_id }] },
        options: {
          create: [
            { name: 'Saveur', value: 'Vanille', is_default: true },
            { name: 'Saveur', value: 'Chocolat', is_default: false },
            { name: 'Saveur', value: 'Fraise', is_default: false },
            { name: 'Saveur', value: 'Thé Vert', is_default: false }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Dorayaki',
        price: 5.99,
        desc: 'Pancake japonais fourré à la pâte de haricots rouges',
        image: 'https://example.com/dorayaki.jpg',
        available: true,
        restaurant_id: restaurants[2].restaurant_id,
        categories: { connect: [{ category_id: swCategories[2].category_id }] },
        options: {
          create: [
            { name: 'Fourrage', value: 'Haricots Rouges', is_default: true },
            { name: 'Fourrage', value: 'Chocolat', is_default: false },
            { name: 'Fourrage', value: 'Crème', is_default: false }
          ]
        }
      }
    }),
    // Catégorie Drinks
    prisma.article.create({
      data: {
        name: 'Green Tea',
        price: 3.99,
        desc: 'Thé vert japonais traditionnel',
        image: 'https://example.com/greentea.jpg',
        available: true,
        restaurant_id: restaurants[2].restaurant_id,
        categories: { connect: [{ category_id: swCategories[3].category_id }] },
        options: {
          create: [
            { name: 'Taille', value: 'Petite', is_default: true },
            { name: 'Taille', value: 'Grande', is_default: false, extra_price: 1.00 }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Sake',
        price: 8.99,
        desc: 'Alcool de riz japonais',
        image: 'https://example.com/sake.jpg',
        available: true,
        restaurant_id: restaurants[2].restaurant_id,
        categories: { connect: [{ category_id: swCategories[3].category_id }] },
        options: {
          create: [
            { name: 'Taille', value: 'Petite', is_default: true },
            { name: 'Taille', value: 'Grande', is_default: false, extra_price: 3.00 }
          ]
        }
      }
    }),
    // Catégorie Entrées
    prisma.article.create({
      data: {
        name: 'Gyoza',
        price: 6.99,
        desc: 'Raviolis japonais',
        image: 'https://example.com/gyoza.jpg',
        available: true,
        restaurant_id: restaurants[2].restaurant_id,
        categories: {
          connect: {
            category_id: swCategories[0].category_id
          }
        },
        options: {
          create: [
            { name: 'Garniture', value: 'Porc', is_default: true },
            { name: 'Garniture', value: 'Légumes', is_default: false }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Edamame',
        price: 4.99,
        desc: 'Fèves de soja',
        image: 'https://example.com/edamame.jpg',
        available: true,
        restaurant_id: restaurants[2].restaurant_id,
        categories: {
          connect: {
            category_id: swCategories[0].category_id
          }
        }
      }
    }),

    // Catégorie Sushis
    prisma.article.create({
      data: {
        name: 'California Roll',
        price: 8.99,
        desc: 'Rouleau californien',
        image: 'https://example.com/californiaroll.jpg',
        available: true,
        restaurant_id: restaurants[2].restaurant_id,
        categories: {
          connect: {
            category_id: swCategories[1].category_id
          }
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Dragon Roll',
        price: 12.99,
        desc: 'Rouleau dragon',
        image: 'https://example.com/dragonroll.jpg',
        available: true,
        restaurant_id: restaurants[2].restaurant_id,
        categories: {
          connect: {
            category_id: swCategories[1].category_id
          }
        }
      }
    }),

    // Catégorie Desserts
    prisma.article.create({
      data: {
        name: 'Mochi',
        price: 5.99,
        desc: 'Glace mochi',
        image: 'https://example.com/mochi.jpg',
        available: true,
        restaurant_id: restaurants[2].restaurant_id,
        categories: {
          connect: {
            category_id: swCategories[3].category_id
          }
        },
        options: {
          create: [
            { name: 'Parfum', value: 'Thé vert', is_default: true },
            { name: 'Parfum', value: 'Fraise', is_default: false },
            { name: 'Parfum', value: 'Mangue', is_default: false }
          ]
        }
      }
    })
  ]);

  // --- The Breakfast Club
  console.log('🥞 Création des articles pour The Breakfast Club...');
  await Promise.all([
    // Catégorie Breakfast
    prisma.article.create({
      data: {
        name: 'Pancakes',
        price: 8.99,
        desc: 'Empilement de pancakes moelleux servis avec du sirop d\'érable',
        image: 'https://example.com/pancakes.jpg',
        available: true,
        restaurant_id: restaurants[3].restaurant_id,
        categories: { connect: [{ category_id: bcCategories[0].category_id }] },
        ingredients: {
          create: [
            { name: 'Pancakes', removable: false },
            { name: 'Sirop d\'érable', removable: false },
            { name: 'Beurre', removable: true },
            { name: 'Fruits', removable: true }
          ]
        },
        supplements: {
          create: [
            { name: 'Extra Sirop', is_optional: true, extra_price: 0.50 },
            { name: 'Chantilly', is_optional: true, extra_price: 1.00 },
            { name: 'Fruits Frais', is_optional: true, extra_price: 2.00 }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'French Toast',
        price: 9.99,
        desc: 'Pain perdu doré avec cannelle',
        image: 'https://example.com/frenchtoast.jpg',
        available: true,
        restaurant_id: restaurants[3].restaurant_id,
        categories: { connect: [{ category_id: bcCategories[0].category_id }] },
        ingredients: {
          create: [
            { name: 'Pain Brioché', removable: false },
            { name: 'Oeuf', removable: false },
            { name: 'Cannelle', removable: false },
            { name: 'Sirop d\'érable', removable: true },
            { name: 'Fruits', removable: true }
          ]
        },
        supplements: {
          create: [
            { name: 'Extra Sirop', is_optional: true, extra_price: 0.50 },
            { name: 'Chantilly', is_optional: true, extra_price: 1.00 }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Omelette',
        price: 10.99,
        desc: 'Omelette moelleuse avec garniture au choix',
        image: 'https://example.com/omelette.jpg',
        available: true,
        restaurant_id: restaurants[3].restaurant_id,
        categories: { connect: [{ category_id: bcCategories[0].category_id }] },
        ingredients: {
          create: [
            { name: 'Oeufs', removable: false },
            { name: 'Fromage', removable: false },
            { name: 'Jambon', removable: true },
            { name: 'Champignons', removable: true },
            { name: 'Oignons', removable: true },
            { name: 'Poivrons', removable: true }
          ]
        },
        supplements: {
          create: [
            { name: 'Extra Fromage', is_optional: true, extra_price: 1.00 },
            { name: 'Extra Jambon', is_optional: true, extra_price: 2.00 }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Avocado Toast',
        price: 9.99,
        desc: 'Toast croustillant garni d\'avocat écrasé, citron et piment',
        image: 'https://example.com/avocadotoast.jpg',
        available: true,
        restaurant_id: restaurants[3].restaurant_id,
        categories: { connect: [{ category_id: bcCategories[0].category_id }] },
        ingredients: {
          create: [
            { name: 'Pain', removable: false },
            { name: 'Avocat', removable: false },
            { name: 'Citron', removable: false },
            { name: 'Piment', removable: true },
            { name: 'Oeuf', removable: true }
          ]
        },
        supplements: {
          create: [
            { name: 'Extra Avocat', is_optional: true, extra_price: 1.50 },
            { name: 'Oeuf Poché', is_optional: true, extra_price: 2.00 }
          ]
        }
      }
    }),
    // Catégorie Coffee
    prisma.article.create({
      data: {
        name: 'Coffee Special',
        price: 4.50,
        desc: 'Café spécial avec options de personnalisation',
        image: 'https://example.com/coffeespecial.jpg',
        available: true,
        restaurant_id: restaurants[3].restaurant_id,
        categories: { connect: [{ category_id: bcCategories[1].category_id }] },
        options: {
          create: [
            { name: 'Type', value: 'Expresso', is_default: true },
            { name: 'Type', value: 'Cappuccino', is_default: false },
            { name: 'Type', value: 'Latte', is_default: false },
            { name: 'Taille', value: 'Petite', is_default: true },
            { name: 'Taille', value: 'Moyenne', is_default: false, extra_price: 0.50 },
            { name: 'Taille', value: 'Grande', is_default: false, extra_price: 1.00 }
          ]
        },
        supplements: {
          create: [
            { name: 'Lait', is_optional: true, extra_price: 0.50 },
            { name: 'Sirop de Vanille', is_optional: true, extra_price: 0.50 },
            { name: 'Chantilly', is_optional: true, extra_price: 1.00 }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Iced Coffee',
        price: 4.99,
        desc: 'Café glacé rafraîchissant',
        image: 'https://example.com/icedcoffee.jpg',
        available: true,
        restaurant_id: restaurants[3].restaurant_id,
        categories: { connect: [{ category_id: bcCategories[1].category_id }] },
        options: {
          create: [
            { name: 'Type', value: 'Classique', is_default: true },
            { name: 'Type', value: 'Caramel', is_default: false },
            { name: 'Type', value: 'Vanille', is_default: false },
            { name: 'Taille', value: 'Moyenne', is_default: true },
            { name: 'Taille', value: 'Grande', is_default: false, extra_price: 1.00 }
          ]
        },
        supplements: {
          create: [
            { name: 'Extra Sirop', is_optional: true, extra_price: 0.50 },
            { name: 'Chantilly', is_optional: true, extra_price: 1.00 }
          ]
        }
      }
    }),
    // Catégorie Desserts
    prisma.article.create({
      data: {
        name: 'Waffle',
        price: 7.99,
        desc: 'Gaufre belge croustillante',
        image: 'https://example.com/waffle.jpg',
        available: true,
        restaurant_id: restaurants[3].restaurant_id,
        categories: { connect: [{ category_id: bcCategories[2].category_id }] },
        ingredients: {
          create: [
            { name: 'Gaufre', removable: false },
            { name: 'Sirop d\'érable', removable: false },
            { name: 'Chantilly', removable: true },
            { name: 'Fruits', removable: true }
          ]
        },
        supplements: {
          create: [
            { name: 'Extra Sirop', is_optional: true, extra_price: 0.50 },
            { name: 'Extra Chantilly', is_optional: true, extra_price: 1.00 },
            { name: 'Fruits Frais', is_optional: true, extra_price: 2.00 }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Croissant',
        price: 3.99,
        desc: 'Croissant frais et croustillant',
        image: 'https://example.com/croissant.jpg',
        available: true,
        restaurant_id: restaurants[3].restaurant_id,
        categories: { connect: [{ category_id: bcCategories[2].category_id }] },
        options: {
          create: [
            { name: 'Type', value: 'Nature', is_default: true },
            { name: 'Type', value: 'Amande', is_default: false, extra_price: 1.00 },
            { name: 'Type', value: 'Chocolat', is_default: false, extra_price: 1.00 }
          ]
        }
      }
    }),
    // Catégorie Drinks
    prisma.article.create({
      data: {
        name: 'Fresh Juice',
        price: 4.99,
        desc: 'Jus de fruits frais pressé',
        image: 'https://example.com/freshjuice.jpg',
        available: true,
        restaurant_id: restaurants[3].restaurant_id,
        categories: {
          connect: {
            category_id: bcCategories[2].category_id  // Utilisation de l'index 2 pour la catégorie Desserts
          }
        },
        options: {
          create: [
            { name: 'Saveur', value: 'Orange', is_default: true },
            { name: 'Saveur', value: 'Pomme', is_default: false },
            { name: 'Saveur', value: 'Carotte', is_default: false },
            { name: 'Taille', value: 'Petite', is_default: true },
            { name: 'Taille', value: 'Grande', is_default: false, extra_price: 1.00 }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Smoothie',
        price: 5.99,
        desc: 'Smoothie crémeux aux fruits',
        image: 'https://example.com/smoothie.jpg',
        available: true,
        restaurant_id: restaurants[3].restaurant_id,
        categories: {
          connect: {
            category_id: bcCategories[2].category_id  // Utilisation de l'index 2 pour la catégorie Desserts
          }
        },
        options: {
          create: [
            { name: 'Saveur', value: 'Fruits Rouges', is_default: true },
            { name: 'Saveur', value: 'Banane', is_default: false },
            { name: 'Saveur', value: 'Mangue', is_default: false },
            { name: 'Taille', value: 'Moyenne', is_default: true },
            { name: 'Taille', value: 'Grande', is_default: false, extra_price: 1.00 }
          ]
        },
        supplements: {
          create: [
            { name: 'Protéine', is_optional: true, extra_price: 1.50 },
            { name: 'Graines de Chia', is_optional: true, extra_price: 1.00 }
          ]
        }
      }
    }),
    // Catégorie Petit-déjeuner
    prisma.article.create({
      data: {
        name: 'Omelette',
        price: 9.99,
        desc: 'Omelette aux choix',
        image: 'https://example.com/omelette.jpg',
        available: true,
        restaurant_id: restaurants[3].restaurant_id,
        categories: {
          connect: {
            category_id: bcCategories[0].category_id
          }
        },
        options: {
          create: [
            { name: 'Garniture', value: 'Fromage', is_default: true },
            { name: 'Garniture', value: 'Jambon', is_default: false },
            { name: 'Garniture', value: 'Légumes', is_default: false }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Croissant',
        price: 3.99,
        desc: 'Croissant beurre',
        image: 'https://example.com/croissant.jpg',
        available: true,
        restaurant_id: restaurants[3].restaurant_id,
        categories: {
          connect: {
            category_id: bcCategories[0].category_id
          }
        }
      }
    }),

    // Catégorie Brunch
    prisma.article.create({
      data: {
        name: 'Brunch Classique',
        price: 15.99,
        desc: 'Brunch complet',
        image: 'https://example.com/brunchclassique.jpg',
        available: true,
        restaurant_id: restaurants[3].restaurant_id,
        categories: {
          connect: {
            category_id: bcCategories[1].category_id
          }
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Brunch Végétarien',
        price: 14.99,
        desc: 'Brunch végétarien',
        image: 'https://example.com/brunchvegetarien.jpg',
        available: true,
        restaurant_id: restaurants[3].restaurant_id,
        categories: {
          connect: {
            category_id: bcCategories[1].category_id
          }
        }
      }
    }),

    // Catégorie Boissons
    prisma.article.create({
      data: {
        name: 'Smoothie',
        price: 5.99,
        desc: 'Smoothie aux fruits',
        image: 'https://example.com/smoothie.jpg',
        available: true,
        restaurant_id: restaurants[3].restaurant_id,
        categories: {
          connect: {
            category_id: bcCategories[2].category_id
          }
        },
        options: {
          create: [
            { name: 'Parfum', value: 'Fruits rouges', is_default: true },
            { name: 'Parfum', value: 'Mangue', is_default: false },
            { name: 'Parfum', value: 'Banane', is_default: false }
          ]
        }
      }
    })
  ]);

  // --- Spicy Chicken Express
  console.log('🍗 Création des articles pour Spicy Chicken Express...');
  await Promise.all([
    // Catégorie Chicken
    prisma.article.create({
      data: {
        name: 'Fried Chicken',
        price: 9.99,
        desc: 'Poulet frit croustillant',
        image: 'https://example.com/friedchicken.jpg',
        available: true,
        restaurant_id: restaurants[4].restaurant_id,
        categories: { connect: [{ category_id: sceCategories[0].category_id }] },
        options: {
          create: [
            { name: 'Quantité', value: '3 pièces', is_default: true },
            { name: 'Quantité', value: '6 pièces', is_default: false, extra_price: 5.00 },
            { name: 'Quantité', value: '9 pièces', is_default: false, extra_price: 10.00 }
          ]
        },
        supplements: {
          create: [
            { name: 'Sauce BBQ', is_optional: true, extra_price: 0.50 },
            { name: 'Sauce Piquante', is_optional: true, extra_price: 0.50 },
            { name: 'Extra Frites', is_optional: true, extra_price: 2.00 }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Spicy Chicken Wings',
        price: 8.99,
        desc: 'Ailes de poulet épicées',
        image: 'https://example.com/chickenwings.jpg',
        available: true,
        restaurant_id: restaurants[4].restaurant_id,
        categories: { connect: [{ category_id: sceCategories[0].category_id }] },
        options: {
          create: [
            { name: 'Quantité', value: '6 pièces', is_default: true },
            { name: 'Quantité', value: '12 pièces', is_default: false, extra_price: 5.00 },
            { name: 'Niveau d\'épice', value: 'Moyen', is_default: true },
            { name: 'Niveau d\'épice', value: 'Fort', is_default: false }
          ]
        },
        supplements: {
          create: [
            { name: 'Sauce Bleu', is_optional: true, extra_price: 0.50 },
            { name: 'Sauce Ranch', is_optional: true, extra_price: 0.50 }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Chicken Burger',
        price: 7.99,
        desc: 'Burger au poulet croustillant',
        image: 'https://example.com/chickenburger.jpg',
        available: true,
        restaurant_id: restaurants[4].restaurant_id,
        categories: { connect: [{ category_id: sceCategories[0].category_id }] },
        ingredients: {
          create: [
            { name: 'Pain', removable: false },
            { name: 'Poulet', removable: false },
            { name: 'Salade', removable: true },
            { name: 'Tomate', removable: true },
            { name: 'Oignon', removable: true }
          ]
        },
        supplements: {
          create: [
            { name: 'Fromage', is_optional: true, extra_price: 1.00 },
            { name: 'Bacon', is_optional: true, extra_price: 1.50 }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Chicken Tenders',
        price: 8.49,
        desc: 'Lanières de poulet tendres',
        image: 'https://example.com/chickentenders.jpg',
        available: true,
        restaurant_id: restaurants[4].restaurant_id,
        categories: { connect: [{ category_id: sceCategories[0].category_id }] },
        options: {
          create: [
            { name: 'Quantité', value: '4 pièces', is_default: true },
            { name: 'Quantité', value: '8 pièces', is_default: false, extra_price: 4.00 }
          ]
        },
        supplements: {
          create: [
            { name: 'Sauce BBQ', is_optional: true, extra_price: 0.50 },
            { name: 'Sauce Miel', is_optional: true, extra_price: 0.50 }
          ]
        }
      }
    }),
    // Catégorie Sides
    prisma.article.create({
      data: {
        name: 'French Fries',
        price: 3.99,
        desc: 'Frites croustillantes',
        image: 'https://example.com/fries.jpg',
        available: true,
        restaurant_id: restaurants[4].restaurant_id,
        categories: { connect: [{ category_id: sceCategories[1].category_id }] },
        options: {
          create: [
            { name: 'Taille', value: 'Petite', is_default: true },
            { name: 'Taille', value: 'Moyenne', is_default: false, extra_price: 1.00 },
            { name: 'Taille', value: 'Grande', is_default: false, extra_price: 2.00 }
          ]
        },
        supplements: {
          create: [
            { name: 'Fromage', is_optional: true, extra_price: 1.50 },
            { name: 'Bacon', is_optional: true, extra_price: 1.50 }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Coleslaw',
        price: 2.99,
        desc: 'Salade de chou crémeuse',
        image: 'https://example.com/coleslaw.jpg',
        available: true,
        restaurant_id: restaurants[4].restaurant_id,
        categories: { connect: [{ category_id: sceCategories[1].category_id }] },
        options: {
          create: [
            { name: 'Taille', value: 'Petite', is_default: true },
            { name: 'Taille', value: 'Grande', is_default: false, extra_price: 1.00 }
          ]
        }
      }
    }),
    // Catégorie Drinks
    prisma.article.create({
      data: {
        name: 'Soda',
        price: 2.99,
        desc: 'Boisson gazeuse rafraîchissante',
        image: 'https://example.com/soda.jpg',
        available: true,
        restaurant_id: restaurants[4].restaurant_id,
        categories: { connect: [{ category_id: sceCategories[2].category_id }] },
        options: {
          create: [
            { name: 'Saveur', value: 'Coke', is_default: true },
            { name: 'Saveur', value: 'Sprite', is_default: false },
            { name: 'Saveur', value: 'Fanta', is_default: false },
            { name: 'Taille', value: 'Petite', is_default: true },
            { name: 'Taille', value: 'Moyenne', is_default: false, extra_price: 0.50 },
            { name: 'Taille', value: 'Grande', is_default: false, extra_price: 1.00 }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Iced Tea',
        price: 2.99,
        desc: 'Thé glacé rafraîchissant',
        image: 'https://example.com/icedtea.jpg',
        available: true,
        restaurant_id: restaurants[4].restaurant_id,
        categories: { connect: [{ category_id: sceCategories[2].category_id }] },
        options: {
          create: [
            { name: 'Saveur', value: 'Pêche', is_default: true },
            { name: 'Saveur', value: 'Citron', is_default: false },
            { name: 'Taille', value: 'Moyenne', is_default: true },
            { name: 'Taille', value: 'Grande', is_default: false, extra_price: 1.00 }
          ]
        }
      }
    }),
    // Catégorie Poulet
    prisma.article.create({
      data: {
        name: 'Poulet BBQ',
        price: 12.99,
        desc: 'Poulet sauce barbecue',
        image: 'https://example.com/pouletbbq.jpg',
        available: true,
        restaurant_id: restaurants[4].restaurant_id,
        categories: {
          connect: {
            category_id: sceCategories[0].category_id
          }
        },
        options: {
          create: [
            { name: 'Niveau de piquant', value: 'Doux', is_default: true },
            { name: 'Niveau de piquant', value: 'Moyen', is_default: false },
            { name: 'Niveau de piquant', value: 'Fort', is_default: false }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Poulet Miel',
        price: 12.99,
        desc: 'Poulet sauce miel',
        image: 'https://example.com/pouletmiel.jpg',
        available: true,
        restaurant_id: restaurants[4].restaurant_id,
        categories: {
          connect: {
            category_id: sceCategories[0].category_id
          }
        }
      }
    }),

    // Catégorie Accompagnements
    prisma.article.create({
      data: {
        name: 'Frites',
        price: 4.99,
        desc: 'Frites maison',
        image: 'https://example.com/frites.jpg',
        available: true,
        restaurant_id: restaurants[4].restaurant_id,
        categories: {
          connect: {
            category_id: sceCategories[1].category_id
          }
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Salade César',
        price: 6.99,
        desc: 'Salade césar avec poulet',
        image: 'https://example.com/saladecesar.jpg',
        available: true,
        restaurant_id: restaurants[4].restaurant_id,
        categories: {
          connect: {
            category_id: sceCategories[1].category_id
          }
        }
      }
    }),

    // Catégorie Desserts
    prisma.article.create({
      data: {
        name: 'Beignet',
        price: 4.99,
        desc: 'Beignet sucré',
        image: 'https://example.com/beignet.jpg',
        available: true,
        restaurant_id: restaurants[4].restaurant_id,
        categories: {
          connect: {
            category_id: sceCategories[3].category_id
          }
        }
      }
    })
  ]);

  // --- Taj Mahal
  console.log('🍛 Création des articles pour Taj Mahal...');
  await Promise.all([
    // Catégorie Entrées
    prisma.article.create({
      data: {
        name: 'Butter Chicken',
        price: 14.99,
        desc: 'Poulet mariné dans une sauce crémeuse au beurre et aux épices',
        image: 'https://example.com/butterchicken.jpg',
        available: true,
        restaurant_id: additionalRestaurants[0].restaurant_id,
        categories: {
          connect: {
            category_id: tajCategories[0].category_id
          }
        },
        options: {
          create: [
            { name: 'Niveau d\'épice', value: 'Doux', is_default: true },
            { name: 'Niveau d\'épice', value: 'Moyen', is_default: false },
            { name: 'Niveau d\'épice', value: 'Piquant', is_default: false }
          ]
        },
        supplements: {
          create: [
            { name: 'Extra Poulet', is_optional: true, extra_price: 3.00 },
            { name: 'Riz Basmati', is_optional: true, extra_price: 2.00 },
            { name: 'Naan', is_optional: true, extra_price: 2.50 }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Lamb Rogan Josh',
        price: 16.99,
        desc: 'Ragoût d\'agneau aux épices du Cachemire',
        image: 'https://example.com/roganjosh.jpg',
        available: true,
        restaurant_id: additionalRestaurants[0].restaurant_id,
        categories: {
          connect: {
            category_id: tajCategories[0].category_id
          }
        },
        options: {
          create: [
            { name: 'Niveau d\'épice', value: 'Moyen', is_default: true },
            { name: 'Niveau d\'épice', value: 'Piquant', is_default: false }
          ]
        },
        supplements: {
          create: [
            { name: 'Extra Agneau', is_optional: true, extra_price: 4.00 },
            { name: 'Riz Basmati', is_optional: true, extra_price: 2.00 }
          ]
        }
      }
    }),
    // Catégorie Biryani
    prisma.article.create({
      data: {
        name: 'Chicken Biryani',
        price: 15.99,
        desc: 'Riz parfumé au safran avec poulet et épices',
        image: 'https://example.com/biryani.jpg',
        available: true,
        restaurant_id: additionalRestaurants[0].restaurant_id,
        categories: {
          connect: {
            category_id: tajCategories[1].category_id
          }
        },
        options: {
          create: [
            { name: 'Niveau d\'épice', value: 'Moyen', is_default: true },
            { name: 'Niveau d\'épice', value: 'Piquant', is_default: false }
          ]
        },
        supplements: {
          create: [
            { name: 'Extra Poulet', is_optional: true, extra_price: 3.00 },
            { name: 'Raita', is_optional: true, extra_price: 1.50 }
          ]
        }
      }
    }),
    // Catégorie Tandoori
    prisma.article.create({
      data: {
        name: 'Tandoori Mixed Grill',
        price: 18.99,
        desc: 'Assortiment de viandes marinées et grillées au tandoor',
        image: 'https://example.com/tandoori.jpg',
        available: true,
        restaurant_id: additionalRestaurants[0].restaurant_id,
        categories: {
          connect: {
            category_id: tajCategories[2].category_id
          }
        },
        ingredients: {
          create: [
            { name: 'Poulet', removable: false },
            { name: 'Agneau', removable: false },
            { name: 'Poulet Tikka', removable: false },
            { name: 'Brochettes de Légumes', removable: true }
          ]
        },
        supplements: {
          create: [
            { name: 'Naan', is_optional: true, extra_price: 2.50 },
            { name: 'Raita', is_optional: true, extra_price: 1.50 }
          ]
        }
      }
    }),
    // Catégorie Vegetarian
    prisma.article.create({
      data: {
        name: 'Palak Paneer',
        price: 12.99,
        desc: 'Fromage indien dans une sauce aux épinards',
        image: 'https://example.com/palakpaneer.jpg',
        available: true,
        restaurant_id: additionalRestaurants[0].restaurant_id,
        categories: {
          connect: {
            category_id: tajCategories[0].category_id
          }
        },
        options: {
          create: [
            { name: 'Niveau de piquant', value: 'Doux', is_default: true },
            { name: 'Niveau de piquant', value: 'Moyen', is_default: false },
            { name: 'Niveau de piquant', value: 'Fort', is_default: false }
          ]
        },
        supplements: {
          create: [
            { name: 'Extra Fromage', is_optional: true, extra_price: 2.00 },
            { name: 'Extra Sauce', is_optional: true, extra_price: 1.00 },
            { name: 'Riz Basmati', is_optional: true, extra_price: 3.00 }
          ]
        }
      }
    }),
    // Catégorie Entrées
    prisma.article.create({
      data: {
        name: 'Samosa',
        price: 5.99,
        desc: 'Beignets indiens aux légumes',
        image: 'https://example.com/samosa.jpg',
        available: true,
        restaurant_id: additionalRestaurants[0].restaurant_id,
        categories: {
          connect: {
            category_id: tajCategories[0].category_id
          }
        },
        options: {
          create: [
            { name: 'Garniture', value: 'Légumes', is_default: true },
            { name: 'Garniture', value: 'Poulet', is_default: false },
            { name: 'Garniture', value: 'Boeuf', is_default: false }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Pakora',
        price: 6.99,
        desc: 'Beignets de légumes',
        image: 'https://example.com/pakora.jpg',
        available: true,
        restaurant_id: additionalRestaurants[0].restaurant_id,
        categories: {
          connect: {
            category_id: tajCategories[0].category_id
          }
        }
      }
    }),

    // Catégorie Plats Principaux
    prisma.article.create({
      data: {
        name: 'Biryani de Poulet',
        price: 15.99,
        desc: 'Riz parfumé au poulet',
        image: 'https://example.com/biryanipoulet.jpg',
        available: true,
        restaurant_id: additionalRestaurants[0].restaurant_id,
        categories: {
          connect: {
            category_id: tajCategories[1].category_id
          }
        },
        options: {
          create: [
            { name: 'Niveau de piquant', value: 'Doux', is_default: true },
            { name: 'Niveau de piquant', value: 'Moyen', is_default: false },
            { name: 'Niveau de piquant', value: 'Fort', is_default: false }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Rogan Josh',
        price: 16.99,
        desc: 'Curry d\'agneau',
        image: 'https://example.com/roganjosh.jpg',
        available: true,
        restaurant_id: additionalRestaurants[0].restaurant_id,
        categories: {
          connect: {
            category_id: tajCategories[1].category_id
          }
        }
      }
    }),

    // Catégorie Desserts
    prisma.article.create({
      data: {
        name: 'Gulab Jamun',
        price: 5.99,
        desc: 'Beignets au sirop',
        image: 'https://example.com/gulabjamun.jpg',
        available: true,
        restaurant_id: additionalRestaurants[0].restaurant_id,
        categories: {
          connect: {
            category_id: tajCategories[3].category_id
          }
        }
      }
    })
  ]);

  // --- Ouzo
  console.log('🍽️ Création des articles pour Ouzo...');
  await Promise.all([
    // Catégorie Mezzés
    prisma.article.create({
      data: {
        name: 'Tzatziki',
        price: 5.99,
        desc: 'Yaourt grec à l\'ail et au concombre',
        image: 'https://example.com/tzatziki.jpg',
        available: true,
        restaurant_id: additionalRestaurants[2].restaurant_id,
        categories: {
          connect: {
            category_id: ouzoCategories[0].category_id
          }
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Tarama',
        price: 6.99,
        desc: 'Tarama maison',
        image: 'https://example.com/tarama.jpg',
        available: true,
        restaurant_id: additionalRestaurants[2].restaurant_id,
        categories: {
          connect: {
            category_id: ouzoCategories[0].category_id
          }
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Dolmas',
        price: 7.99,
        desc: 'Feuilles de vigne farcies',
        image: 'https://example.com/dolmas.jpg',
        available: true,
        restaurant_id: additionalRestaurants[2].restaurant_id,
        categories: {
          connect: {
            category_id: ouzoCategories[0].category_id
          }
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Feta au Miel',
        price: 8.99,
        desc: 'Feta grillée au miel et aux noix',
        image: 'https://example.com/fetamiel.jpg',
        available: true,
        restaurant_id: additionalRestaurants[2].restaurant_id,
        categories: {
          connect: {
            category_id: ouzoCategories[0].category_id
          }
        }
      }
    }),

    // Catégorie Entrées
    prisma.article.create({
      data: {
        name: 'Salade Grecque',
        price: 9.99,
        desc: 'Salade traditionnelle grecque',
        image: 'https://example.com/saladegrecque.jpg',
        available: true,
        restaurant_id: additionalRestaurants[2].restaurant_id,
        categories: {
          connect: {
            category_id: ouzoCategories[1].category_id
          }
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Saganaki',
        price: 10.99,
        desc: 'Fromage frit flambé',
        image: 'https://example.com/saganaki.jpg',
        available: true,
        restaurant_id: additionalRestaurants[2].restaurant_id,
        categories: {
          connect: {
            category_id: ouzoCategories[1].category_id
          }
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Calamars Frits',
        price: 12.99,
        desc: 'Calamars frits avec sauce tzatziki',
        image: 'https://example.com/calamars.jpg',
        available: true,
        restaurant_id: additionalRestaurants[2].restaurant_id,
        categories: {
          connect: {
            category_id: ouzoCategories[1].category_id
          }
        }
      }
    }),

    // Catégorie Plats Principaux
    prisma.article.create({
      data: {
        name: 'Moussaka',
        price: 15.99,
        desc: 'Moussaka traditionnelle',
        image: 'https://example.com/moussaka.jpg',
        available: true,
        restaurant_id: additionalRestaurants[2].restaurant_id,
        categories: {
          connect: {
            category_id: ouzoCategories[2].category_id
          }
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Souvlaki',
        price: 14.99,
        desc: 'Brochettes de viande grillée',
        image: 'https://example.com/souvlaki.jpg',
        available: true,
        restaurant_id: additionalRestaurants[2].restaurant_id,
        categories: {
          connect: {
            category_id: ouzoCategories[2].category_id
          }
        },
        options: {
          create: [
            { name: 'Viande', value: 'Poulet', is_default: true },
            { name: 'Viande', value: 'Porc', is_default: false },
            { name: 'Viande', value: 'Agneau', is_default: false, extra_price: 2.00 }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Pastitsio',
        price: 15.99,
        desc: 'Pâtes à la viande',
        image: 'https://example.com/pastitsio.jpg',
        available: true,
        restaurant_id: additionalRestaurants[2].restaurant_id,
        categories: {
          connect: {
            category_id: ouzoCategories[2].category_id
          }
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Stifado',
        price: 16.99,
        desc: 'Ragoût de boeuf',
        image: 'https://example.com/stifado.jpg',
        available: true,
        restaurant_id: additionalRestaurants[2].restaurant_id,
        categories: {
          connect: {
            category_id: ouzoCategories[2].category_id
          }
        }
      }
    }),

    // Catégorie Desserts
    prisma.article.create({
      data: {
        name: 'Baklava',
        price: 6.99,
        desc: 'Pâtisserie aux noix et sirop',
        image: 'https://example.com/baklava.jpg',
        available: true,
        restaurant_id: additionalRestaurants[2].restaurant_id,
        categories: {
          connect: {
            category_id: ouzoCategories[3].category_id
          }
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Loukoumades',
        price: 7.99,
        desc: 'Beignets grecs',
        image: 'https://example.com/loukoumades.jpg',
        available: true,
        restaurant_id: additionalRestaurants[2].restaurant_id,
        categories: {
          connect: {
            category_id: ouzoCategories[3].category_id
          }
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Galaktoboureko',
        price: 6.99,
        desc: 'Gâteau à la crème pâtissière',
        image: 'https://example.com/galaktoboureko.jpg',
        available: true,
        restaurant_id: additionalRestaurants[2].restaurant_id,
        categories: {
          connect: {
            category_id: ouzoCategories[3].category_id
          }
        }
      }
    }),

    // Catégorie Boissons
    prisma.article.create({
      data: {
        name: 'Ouzo',
        price: 4.99,
        desc: 'Apéritif grec traditionnel',
        image: 'https://example.com/ouzo.jpg',
        available: true,
        restaurant_id: additionalRestaurants[2].restaurant_id,
        categories: {
          connect: {
            category_id: ouzoCategories[4].category_id
          }
        },
        options: {
          create: [
            { name: 'Taille', value: '2cl', is_default: true },
            { name: 'Taille', value: '4cl', is_default: false, extra_price: 2.00 }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Retsina',
        price: 5.99,
        desc: 'Vin blanc grec résiné',
        image: 'https://example.com/retsina.jpg',
        available: true,
        restaurant_id: additionalRestaurants[2].restaurant_id,
        categories: {
          connect: {
            category_id: ouzoCategories[4].category_id
          }
        },
        options: {
          create: [
            { name: 'Taille', value: 'Verre', is_default: true },
            { name: 'Taille', value: 'Bouteille', is_default: false, extra_price: 15.00 }
          ]
        }
      }
    })
  ]);

  // --- Sultan Kebab
  console.log('🥙 Création des articles pour Sultan Kebab...');
  await Promise.all([
    // Catégorie Kebabs
    prisma.article.create({
      data: {
        name: 'Kebab Classique',
        price: 8.99,
        desc: 'Sandwich kebab traditionnel',
        image: 'https://example.com/kebabclassique.jpg',
        available: true,
        restaurant_id: additionalRestaurants[3].restaurant_id,
        categories: {
          connect: {
            category_id: sultanCategories[0].category_id
          }
        },
        options: {
          create: [
            { name: 'Viande', value: 'Agneau', is_default: true },
            { name: 'Viande', value: 'Poulet', is_default: false },
            { name: 'Viande', value: 'Mixte', is_default: false, extra_price: 1.00 }
          ]
        },
        supplements: {
          create: [
            { name: 'Extra Viande', is_optional: true, extra_price: 2.00 },
            { name: 'Extra Sauce', is_optional: true, extra_price: 0.50 },
            { name: 'Frites', is_optional: true, extra_price: 2.00 }
          ]
        }
      }
    }),
    // Catégorie Assiettes
    prisma.article.create({
      data: {
        name: 'Assiette Kebab',
        price: 12.99,
        desc: 'Assiette de viande avec accompagnements',
        image: 'https://example.com/assiettekebab.jpg',
        available: true,
        restaurant_id: additionalRestaurants[3].restaurant_id,
        categories: {
          connect: {
            category_id: sultanCategories[1].category_id
          }
        },
        options: {
          create: [
            { name: 'Viande', value: 'Agneau', is_default: true },
            { name: 'Viande', value: 'Poulet', is_default: false },
            { name: 'Viande', value: 'Mixte', is_default: false, extra_price: 1.00 }
          ]
        },
        supplements: {
          create: [
            { name: 'Extra Viande', is_optional: true, extra_price: 2.00 },
            { name: 'Extra Sauce', is_optional: true, extra_price: 0.50 }
          ]
        }
      }
    }),
    // Catégorie Boissons
    prisma.article.create({
      data: {
        name: 'Coca-Cola',
        price: 2.50,
        desc: 'Canette 33cl',
        image: 'https://example.com/cocacola.jpg',
        available: true,
        restaurant_id: additionalRestaurants[3].restaurant_id,
        categories: {
          connect: {
            category_id: sultanCategories[2].category_id  // Utilisation de l'index 2 pour la catégorie Boissons
          }
        },
        options: {
          create: [
            { name: 'Taille', value: '33cl', is_default: true },
            { name: 'Taille', value: '50cl', is_default: false, extra_price: 1.00 }
          ]
        }
      }
    }),
    // Catégorie Kebabs
    prisma.article.create({
      data: {
        name: 'Kebab Mixte',
        price: 12.99,
        desc: 'Kebab mixte viande et poulet',
        image: 'https://example.com/kebabmixte.jpg',
        available: true,
        restaurant_id: additionalRestaurants[3].restaurant_id,
        categories: {
          connect: {
            category_id: sultanCategories[0].category_id
          }
        },
        options: {
          create: [
            { name: 'Type de pain', value: 'Pain pita', is_default: true },
            { name: 'Type de pain', value: 'Pain baguette', is_default: false },
            { name: 'Type de pain', value: 'Pain durum', is_default: false }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Kebab de Poulet',
        price: 11.99,
        desc: 'Kebab de poulet mariné',
        image: 'https://example.com/kebabpoulet.jpg',
        available: true,
        restaurant_id: additionalRestaurants[3].restaurant_id,
        categories: {
          connect: {
            category_id: sultanCategories[0].category_id
          }
        },
        options: {
          create: [
            { name: 'Type de pain', value: 'Pain pita', is_default: true },
            { name: 'Type de pain', value: 'Pain baguette', is_default: false },
            { name: 'Type de pain', value: 'Pain durum', is_default: false }
          ]
        }
      }
    }),

    // Catégorie Assiettes
    prisma.article.create({
      data: {
        name: 'Assiette Mixte',
        price: 15.99,
        desc: 'Assiette mixte viande et poulet',
        image: 'https://example.com/assiettemixte.jpg',
        available: true,
        restaurant_id: additionalRestaurants[3].restaurant_id,
        categories: {
          connect: {
            category_id: sultanCategories[1].category_id
          }
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Assiette de Poulet',
        price: 14.99,
        desc: 'Assiette de poulet mariné',
        image: 'https://example.com/assiettepoulet.jpg',
        available: true,
        restaurant_id: additionalRestaurants[3].restaurant_id,
        categories: {
          connect: {
            category_id: sultanCategories[1].category_id
          }
        }
      }
    }),

    // Catégorie Boissons
    prisma.article.create({
      data: {
        name: 'Thé à la Menthe',
        price: 3.99,
        desc: 'Thé à la menthe traditionnel',
        image: 'https://example.com/thementhe.jpg',
        available: true,
        restaurant_id: additionalRestaurants[3].restaurant_id,
        categories: {
          connect: {
            category_id: sultanCategories[2].category_id
          }
        },
        options: {
          create: [
            { name: 'Taille', value: 'Petit', is_default: true },
            { name: 'Taille', value: 'Grand', is_default: false, extra_price: 1.00 }
          ]
        }
      }
    })
  ]);

  // --- Seoul Garden
  console.log('🍜 Création des articles pour Seoul Garden...');
  await Promise.all([
    // Catégorie Entrées
    prisma.article.create({
      data: {
        name: 'Kimchi',
        price: 4.99,
        desc: 'Chou fermenté épicé',
        image: 'https://example.com/kimchi.jpg',
        available: true,
        restaurant_id: additionalRestaurants[4].restaurant_id,
        categories: {
          connect: {
            category_id: seoulCategories[0].category_id
          }
        },
        options: {
          create: [
            { name: 'Quantité', value: 'Petite', is_default: true },
            { name: 'Quantité', value: 'Grande', is_default: false, extra_price: 2.00 }
          ]
        }
      }
    }),
    // Catégorie Plats Principaux
    prisma.article.create({
      data: {
        name: 'Bibimbap',
        price: 13.99,
        desc: 'Riz mélangé avec légumes et viande',
        image: 'https://example.com/bibimbap.jpg',
        available: true,
        restaurant_id: additionalRestaurants[4].restaurant_id,
        categories: {
          connect: {
            category_id: seoulCategories[1].category_id
          }
        },
        options: {
          create: [
            { name: 'Viande', value: 'Boeuf', is_default: true },
            { name: 'Viande', value: 'Poulet', is_default: false },
            { name: 'Viande', value: 'Végétarien', is_default: false }
          ]
        },
        supplements: {
          create: [
            { name: 'Oeuf', is_optional: true, extra_price: 1.00 },
            { name: 'Extra Viande', is_optional: true, extra_price: 2.00 }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Bulgogi',
        price: 15.99,
        desc: 'Boeuf mariné grillé',
        image: 'https://example.com/bulgogi.jpg',
        available: true,
        restaurant_id: additionalRestaurants[4].restaurant_id,
        categories: {
          connect: {
            category_id: seoulCategories[1].category_id
          }
        },
        options: {
          create: [
            { name: 'Niveau d\'épice', value: 'Doux', is_default: true },
            { name: 'Niveau d\'épice', value: 'Moyen', is_default: false },
            { name: 'Niveau d\'épice', value: 'Piquant', is_default: false }
          ]
        },
        supplements: {
          create: [
            { name: 'Riz', is_optional: true, extra_price: 2.00 },
            { name: 'Légumes', is_optional: true, extra_price: 1.50 }
          ]
        }
      }
    }),
    // Catégorie Soupes
    prisma.article.create({
      data: {
        name: 'Kimchi Jjigae',
        price: 11.99,
        desc: 'Soupe épicée au kimchi',
        image: 'https://example.com/kimchijjigae.jpg',
        available: true,
        restaurant_id: additionalRestaurants[4].restaurant_id,
        categories: {
          connect: {
            category_id: seoulCategories[2].category_id
          }
        },
        options: {
          create: [
            { name: 'Niveau d\'épice', value: 'Doux', is_default: true },
            { name: 'Niveau d\'épice', value: 'Moyen', is_default: false },
            { name: 'Niveau d\'épice', value: 'Piquant', is_default: false }
          ]
        },
        supplements: {
          create: [
            { name: 'Riz', is_optional: true, extra_price: 2.00 },
            { name: 'Extra Kimchi', is_optional: true, extra_price: 1.00 }
          ]
        }
      }
    }),
    // Catégorie Desserts
    prisma.article.create({
      data: {
        name: 'Bingsu',
        price: 6.99,
        desc: 'Dessert coréen à base de glace pilée',
        image: 'https://example.com/bingsu.jpg',
        available: true,
        restaurant_id: additionalRestaurants[4].restaurant_id,
        categories: {
          connect: {
            category_id: seoulCategories[3].category_id
          }
        },
        options: {
          create: [
            { name: 'Parfum', value: 'Fruits Rouges', is_default: true },
            { name: 'Parfum', value: 'Mangue', is_default: false },
            { name: 'Parfum', value: 'Matcha', is_default: false }
          ]
        },
        supplements: {
          create: [
            { name: 'Extra Fruits', is_optional: true, extra_price: 1.50 },
            { name: 'Crème Chantilly', is_optional: true, extra_price: 1.00 }
          ]
        }
      }
    }),
    // Catégorie Boissons
    prisma.article.create({
      data: {
        name: 'Soju',
        price: 5.99,
        desc: 'Alcool coréen traditionnel',
        image: 'https://example.com/soju.jpg',
        available: true,
        restaurant_id: additionalRestaurants[4].restaurant_id,
        categories: {
          connect: {
            category_id: seoulCategories[4].category_id
          }
        },
        options: {
          create: [
            { name: 'Taille', value: '200ml', is_default: true },
            { name: 'Taille', value: '360ml', is_default: false, extra_price: 2.00 }
          ]
        }
      }
    }),
    // Catégorie Entrées
    prisma.article.create({
      data: {
        name: 'Mandu',
        price: 7.99,
        desc: 'Raviolis coréens',
        image: 'https://example.com/mandu.jpg',
        available: true,
        restaurant_id: additionalRestaurants[4].restaurant_id,
        categories: {
          connect: {
            category_id: seoulCategories[0].category_id
          }
        },
        options: {
          create: [
            { name: 'Garniture', value: 'Porc', is_default: true },
            { name: 'Garniture', value: 'Boeuf', is_default: false },
            { name: 'Garniture', value: 'Légumes', is_default: false }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Hotteok',
        price: 5.99,
        desc: 'Crêpes coréennes sucrées',
        image: 'https://example.com/hotteok.jpg',
        available: true,
        restaurant_id: additionalRestaurants[4].restaurant_id,
        categories: {
          connect: {
            category_id: seoulCategories[0].category_id
          }
        }
      }
    }),

    // Catégorie Plats Principaux
    prisma.article.create({
      data: {
        name: 'Japchae',
        price: 14.99,
        desc: 'Nouilles de patate douce sautées',
        image: 'https://example.com/japchae.jpg',
        available: true,
        restaurant_id: additionalRestaurants[4].restaurant_id,
        categories: {
          connect: {
            category_id: seoulCategories[1].category_id
          }
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Dakgalbi',
        price: 16.99,
        desc: 'Poulet mariné aux légumes',
        image: 'https://example.com/dakgalbi.jpg',
        available: true,
        restaurant_id: additionalRestaurants[4].restaurant_id,
        categories: {
          connect: {
            category_id: seoulCategories[1].category_id
          }
        },
        options: {
          create: [
            { name: 'Niveau de piquant', value: 'Doux', is_default: true },
            { name: 'Niveau de piquant', value: 'Moyen', is_default: false },
            { name: 'Niveau de piquant', value: 'Fort', is_default: false }
          ]
        }
      }
    }),

    // Catégorie Desserts
    prisma.article.create({
      data: {
        name: 'Bingsu',
        price: 8.99,
        desc: 'Glace pilée coréenne',
        image: 'https://example.com/bingsu.jpg',
        available: true,
        restaurant_id: additionalRestaurants[4].restaurant_id,
        categories: {
          connect: {
            category_id: seoulCategories[3].category_id
          }
        },
        options: {
          create: [
            { name: 'Parfum', value: 'Thé vert', is_default: true },
            { name: 'Parfum', value: 'Mangue', is_default: false },
            { name: 'Parfum', value: 'Fraise', is_default: false }
          ]
        }
      }
    })
  ]);

  // --- Dragon d'Or
  console.log('🥢 Création des catégories pour Dragon d\'Or...');
  const dragonCategories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Entrées',
        restaurant_id: additionalRestaurants[1].restaurant_id
      }
    }),
    prisma.category.create({
      data: {
        name: 'Plats Principaux',
        restaurant_id: additionalRestaurants[1].restaurant_id
      }
    }),
    prisma.category.create({
      data: {
        name: 'Soupes',
        restaurant_id: additionalRestaurants[1].restaurant_id
      }
    }),
    prisma.category.create({
      data: {
        name: 'Desserts',
        restaurant_id: additionalRestaurants[1].restaurant_id
      }
    })
  ]);

  console.log('🥢 Création des articles pour Dragon d\'Or...');
  await Promise.all([
    // Catégorie Entrées
    prisma.article.create({
      data: {
        name: 'Raviolis Vapeur',
        price: 6.99,
        desc: 'Raviolis chinois traditionnels à la vapeur',
        image: 'https://example.com/raviolis.jpg',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: {
            category_id: dragonCategories[0].category_id
          }
        },
        options: {
          create: [
            { name: 'Garniture', value: 'Porc', is_default: true },
            { name: 'Garniture', value: 'Légumes', is_default: false },
            { name: 'Garniture', value: 'Crevette', is_default: false, extra_price: 1.00 }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Nems',
        price: 5.99,
        desc: 'Nems croustillants maison',
        image: 'https://example.com/nems.jpg',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: {
            category_id: dragonCategories[0].category_id
          }
        },
        options: {
          create: [
            { name: 'Quantité', value: '4 pièces', is_default: true },
            { name: 'Quantité', value: '6 pièces', is_default: false, extra_price: 2.00 }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Beignets de Crevettes',
        price: 7.99,
        desc: 'Beignets de crevettes croustillants',
        image: 'https://example.com/beignets.jpg',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: {
            category_id: dragonCategories[0].category_id
          }
        }
      }
    }),

    // Catégorie Plats Principaux
    prisma.article.create({
      data: {
        name: 'Canard Laqué',
        price: 18.99,
        desc: 'Canard laqué traditionnel avec sa sauce',
        image: 'https://example.com/canard.jpg',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: {
            category_id: dragonCategories[1].category_id
          }
        },
        options: {
          create: [
            { name: 'Accompagnement', value: 'Riz', is_default: true },
            { name: 'Accompagnement', value: 'Nouilles', is_default: false }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Boeuf aux Oignons',
        price: 15.99,
        desc: 'Boeuf sauté aux oignons et sauce soja',
        image: 'https://example.com/boeuf.jpg',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: {
            category_id: dragonCategories[1].category_id
          }
        },
        options: {
          create: [
            { name: 'Niveau de piquant', value: 'Doux', is_default: true },
            { name: 'Niveau de piquant', value: 'Moyen', is_default: false },
            { name: 'Niveau de piquant', value: 'Fort', is_default: false }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Poulet au Curry',
        price: 14.99,
        desc: 'Poulet sauté au curry et légumes',
        image: 'https://example.com/pouletcurry.jpg',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: {
            category_id: dragonCategories[1].category_id
          }
        },
        options: {
          create: [
            { name: 'Niveau de piquant', value: 'Doux', is_default: true },
            { name: 'Niveau de piquant', value: 'Moyen', is_default: false },
            { name: 'Niveau de piquant', value: 'Fort', is_default: false }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Porc au Caramel',
        price: 15.99,
        desc: 'Porc caramélisé aux cinq épices',
        image: 'https://example.com/porccaramel.jpg',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: {
            category_id: dragonCategories[1].category_id
          }
        }
      }
    }),

    // Catégorie Soupes
    prisma.article.create({
      data: {
        name: 'Soupe de Nouilles',
        price: 9.99,
        desc: 'Soupe traditionnelle aux nouilles et légumes',
        image: 'https://example.com/soupenouilles.jpg',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: {
            category_id: dragonCategories[2].category_id
          }
        },
        options: {
          create: [
            { name: 'Garniture', value: 'Poulet', is_default: true },
            { name: 'Garniture', value: 'Boeuf', is_default: false },
            { name: 'Garniture', value: 'Légumes', is_default: false }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Soupe Wonton',
        price: 8.99,
        desc: 'Soupe aux raviolis chinois',
        image: 'https://example.com/soupewonton.jpg',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: {
            category_id: dragonCategories[2].category_id
          }
        }
      }
    }),

    // Catégorie Desserts
    prisma.article.create({
      data: {
        name: 'Beignets à la Banane',
        price: 6.99,
        desc: 'Beignets de banane croustillants',
        image: 'https://example.com/beignetsbanane.jpg',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: {
            category_id: dragonCategories[3].category_id
          }
        },
        options: {
          create: [
            { name: 'Sauce', value: 'Chocolat', is_default: true },
            { name: 'Sauce', value: 'Caramel', is_default: false }
          ]
        }
      }
    }),
    // Catégorie Entrées
    prisma.article.create({
      data: {
        name: 'Rouleaux de Printemps',
        price: 6.99,
        desc: 'Rouleaux de printemps frais aux légumes',
        image: 'https://example.com/rouleauxprintemps.jpg',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: {
            category_id: dragonCategories[0].category_id
          }
        },
        options: {
          create: [
            { name: 'Garniture', value: 'Légumes', is_default: true },
            { name: 'Garniture', value: 'Poulet', is_default: false },
            { name: 'Garniture', value: 'Crevette', is_default: false, extra_price: 1.00 }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Samoussas',
        price: 5.99,
        desc: 'Samoussas croustillants',
        image: 'https://example.com/samoussas.jpg',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: {
            category_id: dragonCategories[0].category_id
          }
        },
        options: {
          create: [
            { name: 'Garniture', value: 'Boeuf', is_default: true },
            { name: 'Garniture', value: 'Poulet', is_default: false },
            { name: 'Garniture', value: 'Légumes', is_default: false }
          ]
        }
      }
    }),

    // Catégorie Plats Principaux
    prisma.article.create({
      data: {
        name: 'Poulet aux Noix de Cajou',
        price: 15.99,
        desc: 'Poulet sauté aux noix de cajou et légumes',
        image: 'https://example.com/pouletcajou.jpg',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: {
            category_id: dragonCategories[1].category_id
          }
        },
        options: {
          create: [
            { name: 'Niveau de piquant', value: 'Doux', is_default: true },
            { name: 'Niveau de piquant', value: 'Moyen', is_default: false },
            { name: 'Niveau de piquant', value: 'Fort', is_default: false }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Crevettes à l\'Ail',
        price: 16.99,
        desc: 'Crevettes sautées à l\'ail et au gingembre',
        image: 'https://example.com/crevettesail.jpg',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: {
            category_id: dragonCategories[1].category_id
          }
        }
      }
    }),

    // Catégorie Desserts
    prisma.article.create({
      data: {
        name: 'Glace au Thé Vert',
        price: 5.99,
        desc: 'Glace au thé vert matcha',
        image: 'https://example.com/glacethevert.jpg',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: {
            category_id: dragonCategories[3].category_id
          }
        },
        options: {
          create: [
            { name: 'Taille', value: '1 boule', is_default: true },
            { name: 'Taille', value: '2 boules', is_default: false, extra_price: 2.00 }
          ]
        }
      }
    })
  ]);

  // --- Ajout des avis pour chaque restaurant
  console.log('⭐ Ajout des avis pour les restaurants...');

  // Avis pour Burger King
  await Promise.all([
    prisma.review.create({
      data: {
        rating: 4,
        comment: "Les burgers sont délicieux et le service est rapide. Je recommande le Whopper !",
        user_id: "550e8400-e29b-41d4-a716-446655440000",
        restaurant_id: restaurants[0].restaurant_id
      }
    }),
    prisma.review.create({
      data: {
        rating: 5,
        comment: "Meilleur fast-food de la ville ! Les frites sont toujours croustillantes.",
        user_id: "550e8400-e29b-41d4-a716-446655440001",
        restaurant_id: restaurants[0].restaurant_id
      }
    }),
    prisma.review.create({
      data: {
        rating: 3,
        comment: "Correct mais parfois trop salé. Le service est bon.",
        user_id: "550e8400-e29b-41d4-a716-446655440002",
        restaurant_id: restaurants[0].restaurant_id
      }
    }),
    prisma.review.create({
      data: {
        rating: 4,
        comment: "J'adore leurs milkshakes ! Les burgers sont consistants.",
        user_id: "550e8400-e29b-41d4-a716-446655440003",
        restaurant_id: restaurants[0].restaurant_id
      }
    }),
    prisma.review.create({
      data: {
        rating: 5,
        comment: "Toujours satisfait ! Les offres sont intéressantes.",
        user_id: "550e8400-e29b-41d4-a716-446655440004",
        restaurant_id: restaurants[0].restaurant_id
      }
    })
  ]);

  // Avis pour Pizza Hut
  await Promise.all([
    prisma.review.create({
      data: {
        rating: 4,
        comment: "Pizzas délicieuses et bien garnies. Le service est rapide.",
        user_id: "550e8400-e29b-41d4-a716-446655440005",
        restaurant_id: restaurants[1].restaurant_id
      }
    }),
    prisma.review.create({
      data: {
        rating: 5,
        comment: "La meilleure pizza de la ville ! La pâte est parfaite.",
        user_id: "550e8400-e29b-41d4-a716-446655440006",
        restaurant_id: restaurants[1].restaurant_id
      }
    }),
    prisma.review.create({
      data: {
        rating: 4,
        comment: "Très bon rapport qualité-prix. Les ingrédients sont frais.",
        user_id: "550e8400-e29b-41d4-a716-446655440007",
        restaurant_id: restaurants[1].restaurant_id
      }
    }),
    prisma.review.create({
      data: {
        rating: 3,
        comment: "Correct mais parfois trop d'huile sur les pizzas.",
        user_id: "550e8400-e29b-41d4-a716-446655440008",
        restaurant_id: restaurants[1].restaurant_id
      }
    }),
    prisma.review.create({
      data: {
        rating: 5,
        comment: "Le service est excellent et les pizzas sont toujours chaudes.",
        user_id: "550e8400-e29b-41d4-a716-446655440009",
        restaurant_id: restaurants[1].restaurant_id
      }
    })
  ]);

  // Avis pour Sushi World
  await Promise.all([
    prisma.review.create({
      data: {
        rating: 5,
        comment: "Les sushis sont frais et délicieux. Le service est impeccable.",
        user_id: "550e8400-e29b-41d4-a716-446655440010",
        restaurant_id: restaurants[2].restaurant_id
      }
    }),
    prisma.review.create({
      data: {
        rating: 4,
        comment: "Très bon restaurant japonais. Les ramen sont excellents.",
        user_id: "550e8400-e29b-41d4-a716-446655440011",
        restaurant_id: restaurants[2].restaurant_id
      }
    }),
    prisma.review.create({
      data: {
        rating: 5,
        comment: "Meilleur restaurant de sushis de la ville !",
        user_id: "550e8400-e29b-41d4-a716-446655440012",
        restaurant_id: restaurants[2].restaurant_id
      }
    }),
    prisma.review.create({
      data: {
        rating: 4,
        comment: "Les plats sont bien présentés et le service est rapide.",
        user_id: "550e8400-e29b-41d4-a716-446655440013",
        restaurant_id: restaurants[2].restaurant_id
      }
    }),
    prisma.review.create({
      data: {
        rating: 3,
        comment: "Correct mais un peu cher. Les sushis sont bons.",
        user_id: "550e8400-e29b-41d4-a716-446655440014",
        restaurant_id: restaurants[2].restaurant_id
      }
    })
  ]);

  // Avis pour The Breakfast Club
  await Promise.all([
    prisma.review.create({
      data: {
        rating: 5,
        comment: "Les pancakes sont incroyables ! L'ambiance est super.",
        user_id: "550e8400-e29b-41d4-a716-446655440015",
        restaurant_id: restaurants[3].restaurant_id
      }
    }),
    prisma.review.create({
      data: {
        rating: 4,
        comment: "Très bon petit-déjeuner. Le café est excellent.",
        user_id: "550e8400-e29b-41d4-a716-446655440016",
        restaurant_id: restaurants[3].restaurant_id
      }
    }),
    prisma.review.create({
      data: {
        rating: 5,
        comment: "Mon endroit préféré pour le brunch !",
        user_id: "550e8400-e29b-41d4-a716-446655440017",
        restaurant_id: restaurants[3].restaurant_id
      }
    }),
    prisma.review.create({
      data: {
        rating: 4,
        comment: "Les smoothies sont délicieux et les portions sont généreuses.",
        user_id: "550e8400-e29b-41d4-a716-446655440018",
        restaurant_id: restaurants[3].restaurant_id
      }
    }),
    prisma.review.create({
      data: {
        rating: 3,
        comment: "Correct mais parfois trop d'attente le weekend.",
        user_id: "550e8400-e29b-41d4-a716-446655440019",
        restaurant_id: restaurants[3].restaurant_id
      }
    })
  ]);

  // Avis pour Spicy Chicken Express
  await Promise.all([
    prisma.review.create({
      data: {
        rating: 4,
        comment: "Le poulet est toujours bien assaisonné et croustillant.",
        user_id: "550e8400-e29b-41d4-a716-446655440020",
        restaurant_id: restaurants[4].restaurant_id
      }
    }),
    prisma.review.create({
      data: {
        rating: 5,
        comment: "Meilleur poulet frit de la ville ! Les sauces sont excellentes.",
        user_id: "550e8400-e29b-41d4-a716-446655440021",
        restaurant_id: restaurants[4].restaurant_id
      }
    }),
    prisma.review.create({
      data: {
        rating: 4,
        comment: "Très bon rapport qualité-prix. Le service est rapide.",
        user_id: "550e8400-e29b-41d4-a716-446655440022",
        restaurant_id: restaurants[4].restaurant_id
      }
    }),
    prisma.review.create({
      data: {
        rating: 3,
        comment: "Correct mais parfois trop épicé pour moi.",
        user_id: "550e8400-e29b-41d4-a716-446655440023",
        restaurant_id: restaurants[4].restaurant_id
      }
    }),
    prisma.review.create({
      data: {
        rating: 5,
        comment: "Les ailes de poulet sont délicieuses ! Je recommande.",
        user_id: "550e8400-e29b-41d4-a716-446655440024",
        restaurant_id: restaurants[4].restaurant_id
      }
    })
  ]);

  // Avis pour Taj Mahal
  await Promise.all([
    prisma.review.create({
      data: {
        rating: 5,
        comment: "La cuisine indienne la plus authentique de la ville !",
        user_id: "550e8400-e29b-41d4-a716-446655440025",
        restaurant_id: additionalRestaurants[0].restaurant_id
      }
    }),
    prisma.review.create({
      data: {
        rating: 4,
        comment: "Les currys sont délicieux et bien épicés.",
        user_id: "550e8400-e29b-41d4-a716-446655440026",
        restaurant_id: additionalRestaurants[0].restaurant_id
      }
    }),
    prisma.review.create({
      data: {
        rating: 5,
        comment: "Le butter chicken est incroyable !",
        user_id: "550e8400-e29b-41d4-a716-446655440027",
        restaurant_id: additionalRestaurants[0].restaurant_id
      }
    }),
    prisma.review.create({
      data: {
        rating: 4,
        comment: "Très bon restaurant indien. Le service est excellent.",
        user_id: "550e8400-e29b-41d4-a716-446655440028",
        restaurant_id: additionalRestaurants[0].restaurant_id
      }
    }),
    prisma.review.create({
      data: {
        rating: 3,
        comment: "Correct mais un peu cher. Les naans sont délicieux.",
        user_id: "550e8400-e29b-41d4-a716-446655440029",
        restaurant_id: additionalRestaurants[0].restaurant_id
      }
    })
  ]);

  // Avis pour Dragon d'Or
  await Promise.all([
    prisma.review.create({
      data: {
        rating: 4,
        comment: "La cuisine chinoise est authentique et délicieuse.",
        user_id: "550e8400-e29b-41d4-a716-446655440030",
        restaurant_id: additionalRestaurants[1].restaurant_id
      }
    }),
    prisma.review.create({
      data: {
        rating: 5,
        comment: "Le canard laqué est un must-try !",
        user_id: "550e8400-e29b-41d4-a716-446655440031",
        restaurant_id: additionalRestaurants[1].restaurant_id
      }
    }),
    prisma.review.create({
      data: {
        rating: 4,
        comment: "Les raviolis sont excellents. Le service est rapide.",
        user_id: "550e8400-e29b-41d4-a716-446655440032",
        restaurant_id: additionalRestaurants[1].restaurant_id
      }
    }),
    prisma.review.create({
      data: {
        rating: 3,
        comment: "Correct mais parfois trop salé.",
        user_id: "550e8400-e29b-41d4-a716-446655440033",
        restaurant_id: additionalRestaurants[1].restaurant_id
      }
    }),
    prisma.review.create({
      data: {
        rating: 5,
        comment: "Meilleur restaurant chinois de la ville !",
        user_id: "550e8400-e29b-41d4-a716-446655440034",
        restaurant_id: additionalRestaurants[1].restaurant_id
      }
    })
  ]);

  // Avis pour Ouzo
  await Promise.all([
    prisma.review.create({
      data: {
        rating: 5,
        comment: "La cuisine grecque la plus authentique !",
        user_id: "550e8400-e29b-41d4-a716-446655440035",
        restaurant_id: additionalRestaurants[2].restaurant_id
      }
    }),
    prisma.review.create({
      data: {
        rating: 4,
        comment: "Les mezze sont délicieux et bien présentés.",
        user_id: "550e8400-e29b-41d4-a716-446655440036",
        restaurant_id: additionalRestaurants[2].restaurant_id
      }
    }),
    prisma.review.create({
      data: {
        rating: 5,
        comment: "La moussaka est incroyable !",
        user_id: "550e8400-e29b-41d4-a716-446655440037",
        restaurant_id: additionalRestaurants[2].restaurant_id
      }
    }),
    prisma.review.create({
      data: {
        rating: 4,
        comment: "Très bon restaurant grec. L'ambiance est super.",
        user_id: "550e8400-e29b-41d4-a716-446655440038",
        restaurant_id: additionalRestaurants[2].restaurant_id
      }
    }),
    prisma.review.create({
      data: {
        rating: 3,
        comment: "Correct mais un peu cher. Les portions sont bonnes.",
        user_id: "550e8400-e29b-41d4-a716-446655440039",
        restaurant_id: additionalRestaurants[2].restaurant_id
      }
    })
  ]);

  // Avis pour Sultan Kebab
  await Promise.all([
    prisma.review.create({
      data: {
        rating: 4,
        comment: "Les kebabs sont délicieux et bien garnis.",
        user_id: "550e8400-e29b-41d4-a716-446655440040",
        restaurant_id: additionalRestaurants[3].restaurant_id
      }
    }),
    prisma.review.create({
      data: {
        rating: 5,
        comment: "Le meilleur kebab de la ville !",
        user_id: "550e8400-e29b-41d4-a716-446655440041",
        restaurant_id: additionalRestaurants[3].restaurant_id
      }
    }),
    prisma.review.create({
      data: {
        rating: 4,
        comment: "Très bon rapport qualité-prix. Le service est rapide.",
        user_id: "550e8400-e29b-41d4-a716-446655440042",
        restaurant_id: additionalRestaurants[3].restaurant_id
      }
    }),
    prisma.review.create({
      data: {
        rating: 3,
        comment: "Correct mais parfois trop d'attente.",
        user_id: "550e8400-e29b-41d4-a716-446655440043",
        restaurant_id: additionalRestaurants[3].restaurant_id
      }
    }),
    prisma.review.create({
      data: {
        rating: 5,
        comment: "Les assiettes kebab sont généreuses et délicieuses !",
        user_id: "550e8400-e29b-41d4-a716-446655440044",
        restaurant_id: additionalRestaurants[3].restaurant_id
      }
    })
  ]);

  // Avis pour Seoul Garden
  await Promise.all([
    prisma.review.create({
      data: {
        rating: 5,
        comment: "La cuisine coréenne la plus authentique !",
        user_id: "550e8400-e29b-41d4-a716-446655440045",
        restaurant_id: additionalRestaurants[4].restaurant_id
      }
    }),
    prisma.review.create({
      data: {
        rating: 4,
        comment: "Le bibimbap est excellent et bien présenté.",
        user_id: "550e8400-e29b-41d4-a716-446655440046",
        restaurant_id: additionalRestaurants[4].restaurant_id
      }
    }),
    prisma.review.create({
      data: {
        rating: 5,
        comment: "Le bulgogi est incroyable !",
        user_id: "550e8400-e29b-41d4-a716-446655440047",
        restaurant_id: additionalRestaurants[4].restaurant_id
      }
    }),
    prisma.review.create({
      data: {
        rating: 4,
        comment: "Très bon restaurant coréen. Le service est excellent.",
        user_id: "550e8400-e29b-41d4-a716-446655440048",
        restaurant_id: additionalRestaurants[4].restaurant_id
      }
    }),
    prisma.review.create({
      data: {
        rating: 3,
        comment: "Correct mais un peu cher. Les plats sont bons.",
        user_id: "550e8400-e29b-41d4-a716-446655440049",
        restaurant_id: additionalRestaurants[4].restaurant_id
      }
    })
  ]);

  // --- Dragon d'Or
  console.log('🥢 Création des articles pour Dragon d\'Or...');
  await Promise.all([
    // Catégorie Entrées
    prisma.article.create({
      data: {
        name: 'Raviolis Vapeur',
        price: 6.99,
        desc: 'Raviolis chinois traditionnels à la vapeur',
        image: 'https://example.com/raviolis.jpg',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: {
            category_id: dragonCategories[0].category_id
          }
        },
        options: {
          create: [
            { name: 'Garniture', value: 'Porc', is_default: true },
            { name: 'Garniture', value: 'Légumes', is_default: false },
            { name: 'Garniture', value: 'Crevette', is_default: false, extra_price: 1.00 }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Nems',
        price: 5.99,
        desc: 'Nems croustillants maison',
        image: 'https://example.com/nems.jpg',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: {
            category_id: dragonCategories[0].category_id
          }
        },
        options: {
          create: [
            { name: 'Quantité', value: '4 pièces', is_default: true },
            { name: 'Quantité', value: '6 pièces', is_default: false, extra_price: 2.00 }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Beignets de Crevettes',
        price: 7.99,
        desc: 'Beignets de crevettes croustillants',
        image: 'https://example.com/beignets.jpg',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: {
            category_id: dragonCategories[0].category_id
          }
        }
      }
    }),

    // Catégorie Plats Principaux
    prisma.article.create({
      data: {
        name: 'Canard Laqué',
        price: 18.99,
        desc: 'Canard laqué traditionnel avec sa sauce',
        image: 'https://example.com/canard.jpg',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: {
            category_id: dragonCategories[1].category_id
          }
        },
        options: {
          create: [
            { name: 'Accompagnement', value: 'Riz', is_default: true },
            { name: 'Accompagnement', value: 'Nouilles', is_default: false }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Boeuf aux Oignons',
        price: 15.99,
        desc: 'Boeuf sauté aux oignons et sauce soja',
        image: 'https://example.com/boeuf.jpg',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: {
            category_id: dragonCategories[1].category_id
          }
        },
        options: {
          create: [
            { name: 'Niveau de piquant', value: 'Doux', is_default: true },
            { name: 'Niveau de piquant', value: 'Moyen', is_default: false },
            { name: 'Niveau de piquant', value: 'Fort', is_default: false }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Poulet au Curry',
        price: 14.99,
        desc: 'Poulet sauté au curry et légumes',
        image: 'https://example.com/pouletcurry.jpg',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: {
            category_id: dragonCategories[1].category_id
          }
        },
        options: {
          create: [
            { name: 'Niveau de piquant', value: 'Doux', is_default: true },
            { name: 'Niveau de piquant', value: 'Moyen', is_default: false },
            { name: 'Niveau de piquant', value: 'Fort', is_default: false }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Porc au Caramel',
        price: 15.99,
        desc: 'Porc caramélisé aux cinq épices',
        image: 'https://example.com/porccaramel.jpg',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: {
            category_id: dragonCategories[1].category_id
          }
        }
      }
    }),

    // Catégorie Soupes
    prisma.article.create({
      data: {
        name: 'Soupe de Nouilles',
        price: 9.99,
        desc: 'Soupe traditionnelle aux nouilles et légumes',
        image: 'https://example.com/soupenouilles.jpg',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: {
            category_id: dragonCategories[2].category_id
          }
        },
        options: {
          create: [
            { name: 'Garniture', value: 'Poulet', is_default: true },
            { name: 'Garniture', value: 'Boeuf', is_default: false },
            { name: 'Garniture', value: 'Légumes', is_default: false }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Soupe Wonton',
        price: 8.99,
        desc: 'Soupe aux raviolis chinois',
        image: 'https://example.com/soupewonton.jpg',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: {
            category_id: dragonCategories[2].category_id
          }
        }
      }
    }),

    // Catégorie Desserts
    prisma.article.create({
      data: {
        name: 'Beignets à la Banane',
        price: 6.99,
        desc: 'Beignets de banane croustillants',
        image: 'https://example.com/beignetsbanane.jpg',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: {
            category_id: dragonCategories[3].category_id
          }
        },
        options: {
          create: [
            { name: 'Sauce', value: 'Chocolat', is_default: true },
            { name: 'Sauce', value: 'Caramel', is_default: false }
          ]
        }
      }
    }),
    // Catégorie Entrées
    prisma.article.create({
      data: {
        name: 'Rouleaux de Printemps',
        price: 6.99,
        desc: 'Rouleaux de printemps frais aux légumes',
        image: 'https://example.com/rouleauxprintemps.jpg',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: {
            category_id: dragonCategories[0].category_id
          }
        },
        options: {
          create: [
            { name: 'Garniture', value: 'Légumes', is_default: true },
            { name: 'Garniture', value: 'Poulet', is_default: false },
            { name: 'Garniture', value: 'Crevette', is_default: false, extra_price: 1.00 }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Samoussas',
        price: 5.99,
        desc: 'Samoussas croustillants',
        image: 'https://example.com/samoussas.jpg',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: {
            category_id: dragonCategories[0].category_id
          }
        },
        options: {
          create: [
            { name: 'Garniture', value: 'Boeuf', is_default: true },
            { name: 'Garniture', value: 'Poulet', is_default: false },
            { name: 'Garniture', value: 'Légumes', is_default: false }
          ]
        }
      }
    }),

    // Catégorie Plats Principaux
    prisma.article.create({
      data: {
        name: 'Poulet aux Noix de Cajou',
        price: 15.99,
        desc: 'Poulet sauté aux noix de cajou et légumes',
        image: 'https://example.com/pouletcajou.jpg',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: {
            category_id: dragonCategories[1].category_id
          }
        },
        options: {
          create: [
            { name: 'Niveau de piquant', value: 'Doux', is_default: true },
            { name: 'Niveau de piquant', value: 'Moyen', is_default: false },
            { name: 'Niveau de piquant', value: 'Fort', is_default: false }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Crevettes à l\'Ail',
        price: 16.99,
        desc: 'Crevettes sautées à l\'ail et au gingembre',
        image: 'https://example.com/crevettesail.jpg',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: {
            category_id: dragonCategories[1].category_id
          }
        }
      }
    }),

    // Catégorie Desserts
    prisma.article.create({
      data: {
        name: 'Glace au Thé Vert',
        price: 5.99,
        desc: 'Glace au thé vert matcha',
        image: 'https://example.com/glacethevert.jpg',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: {
            category_id: dragonCategories[3].category_id
          }
        },
        options: {
          create: [
            { name: 'Taille', value: '1 boule', is_default: true },
            { name: 'Taille', value: '2 boules', is_default: false, extra_price: 2.00 }
          ]
        }
      }
    })
  ]);

  // Mise à jour des notes et du nombre d'avis pour chaque restaurant
  console.log('📊 Mise à jour des notes des restaurants...');
  
  // Fonction pour calculer la moyenne des notes
  const updateRestaurantRatings = async (restaurantId) => {
    const reviews = await prisma.review.findMany({
      where: { restaurant_id: restaurantId }
    });
    
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;
    
    await prisma.restaurant.update({
      where: { restaurant_id: restaurantId },
      data: {
        rating: averageRating,
        reviews_count: reviews.length
      }
    });
  };

  // Mise à jour pour tous les restaurants
  await Promise.all([
    // Restaurants principaux
    updateRestaurantRatings(restaurants[0].restaurant_id), // Burger King
    updateRestaurantRatings(restaurants[1].restaurant_id), // Pizza Hut
    updateRestaurantRatings(restaurants[2].restaurant_id), // Sushi World
    updateRestaurantRatings(restaurants[3].restaurant_id), // The Breakfast Club
    updateRestaurantRatings(restaurants[4].restaurant_id), // Spicy Chicken Express
    
    // Restaurants supplémentaires
    updateRestaurantRatings(additionalRestaurants[0].restaurant_id), // Taj Mahal
    updateRestaurantRatings(additionalRestaurants[1].restaurant_id), // Dragon d'Or
    updateRestaurantRatings(additionalRestaurants[2].restaurant_id), // Ouzo
    updateRestaurantRatings(additionalRestaurants[3].restaurant_id), // Sultan Kebab
    updateRestaurantRatings(additionalRestaurants[4].restaurant_id)  // Seoul Garden
  ]);

  console.log('✅ Seeding terminé avec succès !');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
