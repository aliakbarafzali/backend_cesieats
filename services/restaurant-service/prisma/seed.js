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
        image_url: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fburger-king.avif?alt=media&token=defd732d-3a06-4221-b0ec-343d922b508f',
        banner_image_url: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fburger-king-banner.avif?alt=media&token=bf8b20c9-3df5-47a2-bdae-dc7ed703528e',
        owner_id: '550e8400-e29b-41d4-a716-446655440000',
        rating: 0,
        offers_available: true,
        address_id: addresses[0].id,
        restaurant_type: { connect: [{ name: 'Fast Food' }] },
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
        image_url: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fpizza-hut.avif?alt=media&token=92b9e50f-8a83-4f98-8c30-79fbba888a8e',
        banner_image_url: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fpizza-hut-banner.avif?alt=media&token=5a3b8d54-78dc-4518-b742-25f22fd893ee',
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
        image_url: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fsushi-world.avif?alt=media&token=c5aca88f-4a9c-4a70-b80f-ffcc99bec67a',
        banner_image_url: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fsushi-world-banner.avif?alt=media&token=056f8ad8-fd67-4533-b3d2-48c12eb433de',
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
        image_url: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fthe-breakfast-club.avif?alt=media&token=87d55fa1-f4b4-43e5-96b4-8d8186cc09cc',
        banner_image_url: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fthe-breakfast-club-banner.avif?alt=media&token=a90998f5-62ef-4aed-a36e-6bc1fedd2249',
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
        image_url: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fspicy-chicken.avif?alt=media&token=59871b82-a557-4bd3-941e-fc72cd174e20',
        banner_image_url: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fspicy-chicken-banner.avif?alt=media&token=8ac7914e-b849-4aa9-8bec-3706c58ceeb7',
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

  console.log('🍽️ Création des restaurants supplémentaires...');
  const additionalRestaurants = await Promise.all([
    // Restaurant Indien : Taj Mahal
    prisma.restaurant.create({
      data: {
        restaurant_name: 'Taj Mahal',
        restaurant_phone: '+33123456790',
        restaurant_email: 'contact@tajmahal.fr',
        image_url: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Ftaj-mahal.avif?alt=media&token=ae800d9d-2d89-4bb3-8bd5-c3a8dac3b67b',
        banner_image_url: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Ftaj-mahal-banner.avif?alt=media&token=31f7b302-8e76-45c2-b0d2-0ebb9d3218fc',
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
    // Restaurant Chinois : Dragon d'Or
    prisma.restaurant.create({
      data: {
        restaurant_name: 'Dragon d\'Or',
        restaurant_phone: '+33123456791',
        restaurant_email: 'contact@dragondor.fr',
        image_url: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fdragon-dor.avif?alt=media&token=c90acf34-d113-43a2-8505-699a9d9a0417',
        banner_image_url: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fdragon-dor-banner.avif?alt=media&token=f304d525-a303-42ac-8b9d-14dbc6dbedfc',
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
    // Restaurant Grec : Ouzo
    prisma.restaurant.create({
      data: {
        restaurant_name: 'Ouzo',
        restaurant_phone: '+33123456792',
        restaurant_email: 'contact@ouzo.fr',
        image_url: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fouzo.avif?alt=media&token=faf7c571-5da3-4aca-a3fc-c1411577a600',
        banner_image_url: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fouzo-banner.avif?alt=media&token=173d22b1-0b7b-4598-b363-8a2aed48dd20',
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
    // Restaurant Kebab : Sultan Kebab
    prisma.restaurant.create({
      data: {
        restaurant_name: 'Sultan Kebab',
        restaurant_phone: '+33123456793',
        restaurant_email: 'contact@sultankebab.fr',
        image_url: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fsultan-kebab.jpeg?alt=media&token=59e55d02-b911-4239-93ee-7ce9826986ae',
        banner_image_url: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fsultan-kebab-banner.jpeg?alt=media&token=59eab0af-b159-415a-bc0d-6d228f11a954',
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
    // Restaurant Coréen : Seoul Garden
    prisma.restaurant.create({
      data: {
        restaurant_name: 'Seoul Garden',
        restaurant_phone: '+33123456794',
        restaurant_email: 'contact@seoulgarden.fr',
        image_url: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fseoul-garden.jpeg?alt=media&token=04ffedbd-0bf7-41c3-a081-17e986ef6fc9',
        banner_image_url: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fseoul-garden-banner.jpeg?alt=media&token=9fdf4103-9bbd-4563-ba39-d1b9f148284c',
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
        image: "https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fwhopper.webp?alt=media&token=d1b15355-9dd6-40dc-af4d-10b8fd1bf233",
        available: true,
        has_offer: true,
        offer_type: 'DISCOUNT',
        discount_percent: 20.00,
        restaurant_id: restaurants[0].restaurant_id,
        categories: {
          connect: [{ category_id: bkCategories[0].category_id }]
        },
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
        image: "https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fdouble-whopper.webp?alt=media&token=e1b8e712-d3c1-44fd-a434-4922bb3361f9",
        available: true,
        restaurant_id: restaurants[0].restaurant_id,
        categories: {
          connect: [{ category_id: bkCategories[0].category_id }]
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
        image: "https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fchicken-royal.png?alt=media&token=64ab8438-78c6-4ce9-a4f4-c648898e7312",
        available: true,
        restaurant_id: restaurants[0].restaurant_id,
        categories: {
          connect: [{ category_id: bkCategories[0].category_id }]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Veggie Burger',
        price: 7.49,
        desc: 'Burger végétarien avec galette de légumes',
        image: "https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fveggie-burger.webp?alt=media&token=3a47b14a-1a79-4a68-bf74-5b2231c08aa2",
        available: true,
        restaurant_id: restaurants[0].restaurant_id,
        categories: {
          connect: [{ category_id: bkCategories[0].category_id }]
        },
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
        image: "https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fbacon-king.avif?alt=media&token=a7ac9ef2-e0ac-4a2a-ba62-85e9374d5c86",
        available: true,
        restaurant_id: restaurants[0].restaurant_id,
        categories: {
          connect: [{ category_id: bkCategories[0].category_id }]
        },
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
        image: "https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Ffrites.webp?alt=media&token=7c090870-61e7-4b6c-9f3b-c2190b65e82b",
        available: true,
        restaurant_id: restaurants[0].restaurant_id,
        categories: {
          connect: [{ category_id: bkCategories[1].category_id }]
        },
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
        image: "https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fonion-rings.jpg?alt=media&token=078c2046-6f31-46e2-acb2-2e776077bf7d",
        available: true,
        restaurant_id: restaurants[0].restaurant_id,
        categories: {
          connect: [{ category_id: bkCategories[1].category_id }]
        },
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
        image: "https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fchicken-nuggets.jpg?alt=media&token=716259f6-61ac-4dce-87fa-438ae8340d55",
        available: true,
        restaurant_id: restaurants[0].restaurant_id,
        categories: {
          connect: [{ category_id: bkCategories[1].category_id }]
        },
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
        image: "https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fcheese-bites.jpg?alt=media&token=11bf65df-24ac-4cf0-8c0e-9b5cb64da01e",
        available: true,
        restaurant_id: restaurants[0].restaurant_id,
        categories: {
          connect: [{ category_id: bkCategories[1].category_id }]
        },
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
        image: "https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fmilkshake.webp?alt=media&token=12ac67fe-de39-458e-9301-f4c298201de5",
        available: true,
        restaurant_id: restaurants[0].restaurant_id,
        categories: {
          connect: [{ category_id: bkCategories[2].category_id }]
        },
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
        image: "https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fcoke.jpg?alt=media&token=6cffe88e-db0e-4f6d-8813-04043a11717b",
        available: true,
        restaurant_id: restaurants[0].restaurant_id,
        categories: {
          connect: [{ category_id: bkCategories[2].category_id }]
        },
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
        image: "https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Ffanta.webp?alt=media&token=b5e7b528-2844-4fb2-a6d3-464a31714b1a",
        available: true,
        restaurant_id: restaurants[0].restaurant_id,
        categories: {
          connect: [{ category_id: bkCategories[2].category_id }]
        },
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
        image: "https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fice-tea.webp?alt=media&token=74f11776-3d0a-4246-97e5-97c94c023928",
        available: true,
        restaurant_id: restaurants[0].restaurant_id,
        categories: {
          connect: [{ category_id: bkCategories[2].category_id }]
        },
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
        image: "https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fwater.png?alt=media&token=f0c78f3a-caae-4b18-867b-3ea3a0b6d174",
        available: true,
        restaurant_id: restaurants[0].restaurant_id,
        categories: {
          connect: [{ category_id: bkCategories[2].category_id }]
        },
        options: {
          create: [
            { name: 'Taille', value: 'Petite', is_default: true },
            { name: 'Taille', value: 'Grande', is_default: false, extra_price: 0.50 }
          ]
        }
      }
    }),
    // Catégorie Desserts
    prisma.article.create({
      data: {
        name: 'Sundae Caramel',
        price: 4.99,
        desc: 'Glace vanille avec caramel',
        image: "https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fsundae-caramel.avif?alt=media&token=61f74432-715b-46d9-97c8-e54f1db4495a",
        available: true,
        restaurant_id: restaurants[0].restaurant_id,
        categories: {
          connect: [{ category_id: bkCategories[3].category_id }]
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fpizza-reine.jpg?alt=media&token=e0e448bd-8dc7-4706-beae-dea072d679cf',
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fpizza-margherita.webp?alt=media&token=988da7d2-dbf2-483c-ac2c-888a2b1f2515',
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fpizza-pepperonni.jpg?alt=media&token=2ce1a657-46eb-4f04-9b3d-54c3b609e477',
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fpizza-vegetarienne-.avif?alt=media&token=1603a93d-99ae-483c-bfeb-01604ac2e9ed',
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fpizza-hawaian.jpeg?alt=media&token=56d72e89-57ff-4bde-abac-2a24632eaa99',
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fpasta-bolognese.webp?alt=media&token=7cb95432-afad-4c8e-8a62-e34dde8ac4ad',
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
            { name: "Pain à l'ail", is_optional: true, extra_price: 2.00 }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Fettuccine Alfredo',
        price: 12.99,
        desc: 'Fettuccine avec sauce crémeuse au fromage',
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Ffettucine-alfredo.jpeg?alt=media&token=03ff1aad-8c06-4fc5-a88c-923137226dec',
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Ftiramisu.webp?alt=media&token=334949a2-56ee-4fc3-970d-66bef3741c35',
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fpanna-cotta.avif?alt=media&token=e90fc6e1-e6da-4211-a5fe-0c4317bab423',
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Flemonade.jpg?alt=media&token=85e8ee2b-a7cf-4069-98b2-1d7b3469eed6',
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fitalian-soda.jpg?alt=media&token=ee75f913-88f9-4ad1-a96c-bb4828e3a176',
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
    // Catégorie Pizzas complémentaires
    prisma.article.create({
      data: {
        name: 'Pizza Quatre Fromages',
        price: 12.99,
        desc: 'Pizza aux quatre fromages',
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fpizza-quatre-fromages.jpg?alt=media&token=23bc96fa-df1a-4d8c-9a27-41534be5b495',
        available: true,
        restaurant_id: restaurants[1].restaurant_id,
        categories: { connect: [{ category_id: phCategories[0].category_id }] },
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fpizza-vegetarienne-.avif?alt=media&token=1603a93d-99ae-483c-bfeb-01604ac2e9ed',
        available: true,
        restaurant_id: restaurants[1].restaurant_id,
        categories: { connect: [{ category_id: phCategories[0].category_id }] },
        options: {
          create: [
            { name: 'Taille', value: 'Petite', is_default: true },
            { name: 'Taille', value: 'Moyenne', is_default: false, extra_price: 2.00 },
            { name: 'Taille', value: 'Grande', is_default: false, extra_price: 4.00 }
          ]
        }
      }
    }),
    // Catégorie Pâtes complémentaires
    prisma.article.create({
      data: {
        name: 'Pâtes Carbonara',
        price: 9.99,
        desc: 'Pâtes à la carbonara',
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fpates-carbonara.jpeg?alt=media&token=a3b3020b-ff71-47c2-a94d-b5d2f7661a87',
        available: true,
        restaurant_id: restaurants[1].restaurant_id,
        categories: { connect: [{ category_id: phCategories[1].category_id }] }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Pâtes Bolognaise',
        price: 9.99,
        desc: 'Pâtes à la bolognaise',
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fpasta-bolognese.webp?alt=media&token=7cb95432-afad-4c8e-8a62-e34dde8ac4ad',
        available: true,
        restaurant_id: restaurants[1].restaurant_id,
        categories: { connect: [{ category_id: phCategories[1].category_id }] }
      }
    }),
    // Catégorie Desserts complémentaires
    prisma.article.create({
      data: {
        name: 'Tiramisu',
        price: 5.99,
        desc: 'Tiramisu classique',
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Ftiramisu.webp?alt=media&token=334949a2-56ee-4fc3-970d-66bef3741c35',
        available: true,
        restaurant_id: restaurants[1].restaurant_id,
        categories: { connect: [{ category_id: phCategories[3].category_id }] }
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fcalifornia-roll.webp?alt=media&token=6315b41d-f934-4906-abbf-ec6f424611ad',
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fsalmon-roll.webp?alt=media&token=0d2248aa-4711-49dc-91c9-74c3b90ce8da',
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fdragon-roll.jpg?alt=media&token=2899fe17-9b3c-4b1d-a0a4-3e4246348317',
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Frainbow-roll.jpg?alt=media&token=2c05870d-9ee6-428d-9e3b-aec2dbd6caf5',
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Ftonkotsu-ramen.jpg?alt=media&token=794c0783-325d-42d8-bf85-bd94e1e66a2d',
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fmiso-ramen.jpg?alt=media&token=76f3f2b8-fbfc-4393-bdcc-77903ae98a94',
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fmochi-ice-cream.jpg?alt=media&token=bbf3337e-270e-4267-9684-bb8ca97a3ad6',
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fdorayaki.webp?alt=media&token=6dd42e0d-6003-4992-97df-505e11819f59',
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fgreen-tea.jpg?alt=media&token=b96b4e02-fd35-4654-9d82-00428db64924',
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fsake.webp?alt=media&token=b1949381-ca0a-4994-9592-08c31ed9ef63',
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fgyoza.jpg?alt=media&token=1e5d7993-280c-42ab-b240-8c3add1f4a40',
        available: true,
        restaurant_id: restaurants[2].restaurant_id,
        categories: { connect: [{ category_id: swCategories[0].category_id }] },
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fedamame.jpg?alt=media&token=732e67a6-49fd-4fb1-8a22-42e786589089',
        available: true,
        restaurant_id: restaurants[2].restaurant_id,
        categories: { connect: [{ category_id: swCategories[0].category_id }] }
      }
    }),
    
    // Catégorie Sushis complémentaires
    prisma.article.create({
      data: {
        name: 'California Roll',
        price: 8.99,
        desc: 'Rouleau californien',
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fcalifornia-roll.webp?alt=media&token=6315b41d-f934-4906-abbf-ec6f424611ad',
        available: true,
        restaurant_id: restaurants[2].restaurant_id,
        categories: { connect: [{ category_id: swCategories[1].category_id }] }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Dragon Roll',
        price: 12.99,
        desc: 'Rouleau dragon',
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fdragon-roll.jpg?alt=media&token=2899fe17-9b3c-4b1d-a0a4-3e4246348317',
        available: true,
        restaurant_id: restaurants[2].restaurant_id,
        categories: { connect: [{ category_id: swCategories[1].category_id }] }
      }
    }),
    
    // Catégorie Desserts complémentaires
    prisma.article.create({
      data: {
        name: 'Mochi',
        price: 5.99,
        desc: 'Glace mochi',
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fmochi.webp?alt=media&token=6a1f5959-edbb-4a22-92af-56aab68f862c',
        available: true,
        restaurant_id: restaurants[2].restaurant_id,
        categories: { connect: [{ category_id: swCategories[3].category_id }] },
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
        desc: "Empilement de pancakes moelleux servis avec du sirop d'érable",
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fpancakes.jpg?alt=media&token=TOKEN_PANCAKES',
        available: true,
        restaurant_id: restaurants[3].restaurant_id,
        categories: { connect: [{ category_id: bcCategories[0].category_id }] },
        ingredients: {
          create: [
            { name: 'Pancakes', removable: false },
            { name: "Sirop d'érable", removable: false },
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Ffrench-toast.jpg?alt=media&token=TOKEN_FRENCHTOAST',
        available: true,
        restaurant_id: restaurants[3].restaurant_id,
        categories: { connect: [{ category_id: bcCategories[0].category_id }] },
        ingredients: {
          create: [
            { name: 'Pain Brioché', removable: false },
            { name: 'Oeuf', removable: false },
            { name: 'Cannelle', removable: false },
            { name: "Sirop d'érable", removable: true },
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fomelette.jpg?alt=media&token=TOKEN_OMELETTE',
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
        desc: "Toast croustillant garni d'avocat écrasé, citron et piment",
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Favocado-toast.avif?alt=media&token=5bae8a70-df80-4c6b-8fcc-6b27af2937ad',
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fcoffeespecial.jpg?alt=media&token=TOKEN_COFFEESPECIAL',
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Ficed-coffee.jpg?alt=media&token=e96c809b-3887-4285-a7bf-4b4ce8e9632f',
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fwaffle.avif?alt=media&token=75c85235-b444-4566-a8d3-c5ef511d0dcc',
        available: true,
        restaurant_id: restaurants[3].restaurant_id,
        categories: { connect: [{ category_id: bcCategories[2].category_id }] },
        ingredients: {
          create: [
            { name: 'Gaufre', removable: false },
            { name: "Sirop d'érable", removable: false },
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fcroissant.jpg?alt=media&token=151072bb-f82e-48f0-a77f-00492a3e7b01',
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Ffresh-juice.jpg?alt=media&token=c465d2a7-2000-432d-b67b-f91fd6accb25',
        available: true,
        restaurant_id: restaurants[3].restaurant_id,
        // Ici la catégorie utilisée est BC (index 2) pour Desserts mais à adapter si ta catégorie Drinks existe séparément.
        categories: { connect: [{ category_id: bcCategories[2].category_id }] },
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fsmoothie.avif?alt=media&token=7fd24e1f-074a-4d84-9bf3-0cd079710c20',
        available: true,
        restaurant_id: restaurants[3].restaurant_id,
        categories: { connect: [{ category_id: bcCategories[2].category_id }] },
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fomelette.jpg?alt=media&token=64ab8438-78c6-4ce9-a4f4-c648898e7312',
        available: true,
        restaurant_id: restaurants[3].restaurant_id,
        categories: { connect: [{ category_id: bcCategories[0].category_id }] },
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fcroissant.jpg?alt=media&token=151072bb-f82e-48f0-a77f-00492a3e7b01',
        available: true,
        restaurant_id: restaurants[3].restaurant_id,
        categories: { connect: [{ category_id: bcCategories[0].category_id }] }
      }
    }),
    // Catégorie Brunch
    prisma.article.create({
      data: {
        name: 'Brunch Classique',
        price: 15.99,
        desc: 'Brunch complet',
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fbrunch-classique.jpg?alt=media&token=9196845a-6fab-4973-bad1-b0091521b756',
        available: true,
        restaurant_id: restaurants[3].restaurant_id,
        categories: { connect: [{ category_id: bcCategories[1].category_id }] }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Brunch Végétarien',
        price: 14.99,
        desc: 'Brunch végétarien',
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fbrunch-vegetarien.jpg?alt=media&token=87743dd3-5081-4938-b737-223fbeb5f209',
        available: true,
        restaurant_id: restaurants[3].restaurant_id,
        categories: { connect: [{ category_id: bcCategories[1].category_id }] }
      }
    }),
    // Catégorie Boissons
    prisma.article.create({
      data: {
        name: 'Smoothie',
        price: 5.99,
        desc: 'Smoothie aux fruits',
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fsmoothie.avif?alt=media&token=7fd24e1f-074a-4d84-9bf3-0cd079710c20',
        available: true,
        restaurant_id: restaurants[3].restaurant_id,
        categories: { connect: [{ category_id: bcCategories[2].category_id }] },
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Ffried-chicken.jpg?alt=media&token=ef380f4a-8299-4434-bb5d-bff886c1a842',
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fchicken-wings.jpg?alt=media&token=0aaecff2-bbea-4ba5-9a0a-6591a1baac86',
        available: true,
        restaurant_id: restaurants[4].restaurant_id,
        categories: { connect: [{ category_id: sceCategories[0].category_id }] },
        options: {
          create: [
            { name: 'Quantité', value: '6 pièces', is_default: true },
            { name: 'Quantité', value: '12 pièces', is_default: false, extra_price: 5.00 },
            { name: "Niveau d'épice", value: 'Moyen', is_default: true },
            { name: "Niveau d'épice", value: 'Fort', is_default: false }
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fchicken-burger.jpg?alt=media&token=ce71a1ab-7d22-46de-b3c3-ac0c35eac92d',
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fchicken-tenders.jpg?alt=media&token=1ae2f809-8f44-4fe3-8311-07de47ff84f6',
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Ffrench-fries.jpg?alt=media&token=d20579c0-0bcf-4c2f-b708-b86e30514d2a',
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fcoleslaw.jpg?alt=media&token=5728e043-93de-426c-9105-c3d11fa8dcea',
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fsoda.jpg?alt=media&token=0bc9913d-06ca-4972-bfbe-f2cb658ff11c',
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Ficedtea.jpg?alt=media&token=TOKEN_ICEDTEA',
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fpoulet-bbq.avif?alt=media&token=c99e5908-6f5f-4243-bd9f-922a40043e46',
        available: true,
        restaurant_id: restaurants[4].restaurant_id,
        categories: { connect: [{ category_id: sceCategories[0].category_id }] },
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fpoulet-miel.jpg?alt=media&token=306af12c-17f2-4872-b912-31238b824cc1',
        available: true,
        restaurant_id: restaurants[4].restaurant_id,
        categories: { connect: [{ category_id: sceCategories[0].category_id }] }
      }
    }),
    // Catégorie Accompagnements
    prisma.article.create({
      data: {
        name: 'Frites',
        price: 4.99,
        desc: 'Frites maison',
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Ffrites.webp?alt=media&token=7c090870-61e7-4b6c-9f3b-c2190b65e82b',
        available: true,
        restaurant_id: restaurants[4].restaurant_id,
        categories: { connect: [{ category_id: sceCategories[1].category_id }] }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Salade César',
        price: 6.99,
        desc: 'Salade césar avec poulet',
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fsalade-cesar.jpg?alt=media&token=7418c68c-7d0f-49dc-8f92-9365f8824770',
        available: true,
        restaurant_id: restaurants[4].restaurant_id,
        categories: { connect: [{ category_id: sceCategories[1].category_id }] }
      }
    }),
    // Catégorie Desserts
    prisma.article.create({
      data: {
        name: 'Beignet',
        price: 4.99,
        desc: 'Beignet sucré',
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fbeignet.jpg?alt=media&token=2c851353-f890-4151-8b79-14e9560ed47b',
        available: true,
        restaurant_id: restaurants[4].restaurant_id,
        categories: { connect: [{ category_id: sceCategories[3].category_id }] }
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fbutter-chicken.webp?alt=media&token=7b62c90a-1a46-4561-9c0f-057836d64321',
        available: true,
        restaurant_id: additionalRestaurants[0].restaurant_id,
        categories: {
          connect: { category_id: tajCategories[0].category_id }
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Flamb-rogan-josh.jpg?alt=media&token=db6b9599-ec1f-4dae-8597-6f3a58e417aa',
        available: true,
        restaurant_id: additionalRestaurants[0].restaurant_id,
        categories: {
          connect: { category_id: tajCategories[0].category_id }
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fchicken-biryani.jpg?alt=media&token=4ced578e-5c44-47d5-baef-501bfc94829b',
        available: true,
        restaurant_id: additionalRestaurants[0].restaurant_id,
        categories: {
          connect: { category_id: tajCategories[1].category_id }
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Ftandoori-mixed-grill.jpeg?alt=media&token=31e02e3a-c063-4d55-98d7-8cb041a7cfab',
        available: true,
        restaurant_id: additionalRestaurants[0].restaurant_id,
        categories: {
          connect: { category_id: tajCategories[2].category_id }
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fpalak-paneer.webp?alt=media&token=c85c8a9b-8e1a-4d72-8cb2-ef66e995e6ee',
        available: true,
        restaurant_id: additionalRestaurants[0].restaurant_id,
        categories: {
          connect: { category_id: tajCategories[0].category_id }
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fsamosa.jpg?alt=media&token=0314e3c8-e3b7-4fea-b5e0-7859d0322f83',
        available: true,
        restaurant_id: additionalRestaurants[0].restaurant_id,
        categories: {
          connect: { category_id: tajCategories[0].category_id }
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fpakora.webp?alt=media&token=4249bd8f-729d-419e-b6c9-3c6f5a2b4cbb',
        available: true,
        restaurant_id: additionalRestaurants[0].restaurant_id,
        categories: {
          connect: { category_id: tajCategories[0].category_id }
        }
      }
    }),
  
    // Catégorie Plats Principaux
    prisma.article.create({
      data: {
        name: 'Biryani de Poulet',
        price: 15.99,
        desc: 'Riz parfumé au poulet',
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fchicken-biryani.jpg?alt=media&token=4ced578e-5c44-47d5-baef-501bfc94829b',
        available: true,
        restaurant_id: additionalRestaurants[0].restaurant_id,
        categories: {
          connect: { category_id: tajCategories[1].category_id }
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Flamb-rogan-josh.jpg?alt=media&token=db6b9599-ec1f-4dae-8597-6f3a58e417aa',
        available: true,
        restaurant_id: additionalRestaurants[0].restaurant_id,
        categories: {
          connect: { category_id: tajCategories[1].category_id }
        }
      }
    }),
  
    // Catégorie Desserts
    prisma.article.create({
      data: {
        name: 'Gulab Jamun',
        price: 5.99,
        desc: 'Beignets au sirop',
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fgulab-jamun.jpg?alt=media&token=97176775-ff60-4169-9905-4520dc880153',
        available: true,
        restaurant_id: additionalRestaurants[0].restaurant_id,
        categories: {
          connect: { category_id: tajCategories[3].category_id }
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
        desc: "Yaourt grec à l'ail et au concombre",
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Ftsatziki.jpg?alt=media&token=b8516c65-12a1-4f90-8c39-9bef402a786d',
        available: true,
        restaurant_id: additionalRestaurants[2].restaurant_id,
        categories: {
          connect: { category_id: ouzoCategories[0].category_id }
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Tarama',
        price: 6.99,
        desc: 'Tarama maison',
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Ftarama.jpeg?alt=media&token=81699144-1308-4af0-87fb-7b9f10f33ca2',
        available: true,
        restaurant_id: additionalRestaurants[2].restaurant_id,
        categories: {
          connect: { category_id: ouzoCategories[0].category_id }
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Dolmas',
        price: 7.99,
        desc: 'Feuilles de vigne farcies',
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fdolmas.jpg?alt=media&token=59ed429d-5758-4d52-8370-9539b282db45',
        available: true,
        restaurant_id: additionalRestaurants[2].restaurant_id,
        categories: {
          connect: { category_id: ouzoCategories[0].category_id }
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Feta au Miel',
        price: 8.99,
        desc: 'Feta grillée au miel et aux noix',
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Ffeta-miel.jpg?alt=media&token=db075468-2427-4173-a291-9586a47a8115',
        available: true,
        restaurant_id: additionalRestaurants[2].restaurant_id,
        categories: {
          connect: { category_id: ouzoCategories[0].category_id }
        }
      }
    }),
  
    // Catégorie Entrées
    prisma.article.create({
      data: {
        name: 'Salade Grecque',
        price: 9.99,
        desc: 'Salade traditionnelle grecque',
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fsalade-grecque.avif?alt=media&token=3c932616-3e07-4329-9837-f4e4dd4fa641',
        available: true,
        restaurant_id: additionalRestaurants[2].restaurant_id,
        categories: {
          connect: { category_id: ouzoCategories[1].category_id }
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Saganaki',
        price: 10.99,
        desc: 'Fromage frit flambé',
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fsaganaki.jpg?alt=media&token=4ce4ff77-0d66-4273-8c0a-89ee9725d084',
        available: true,
        restaurant_id: additionalRestaurants[2].restaurant_id,
        categories: {
          connect: { category_id: ouzoCategories[1].category_id }
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Calamars Frits',
        price: 12.99,
        desc: 'Calamars frits avec sauce tzatziki',
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fcalamar-frit.webp?alt=media&token=51a67f58-60b0-46b1-b8ff-7cb4ae3c827f',
        available: true,
        restaurant_id: additionalRestaurants[2].restaurant_id,
        categories: {
          connect: { category_id: ouzoCategories[1].category_id }
        }
      }
    }),
  
    // Catégorie Plats Principaux
    prisma.article.create({
      data: {
        name: 'Moussaka',
        price: 15.99,
        desc: 'Moussaka traditionnelle',
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fmoussaka.jpg?alt=media&token=ed92926c-e2dc-4a1b-9af0-74d0dbd457a4',
        available: true,
        restaurant_id: additionalRestaurants[2].restaurant_id,
        categories: {
          connect: { category_id: ouzoCategories[2].category_id }
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Souvlaki',
        price: 14.99,
        desc: 'Brochettes de viande grillée',
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fsouvlaki.jpg?alt=media&token=af80cda2-65c4-4862-9b46-32d3274dca0a',
        available: true,
        restaurant_id: additionalRestaurants[2].restaurant_id,
        categories: {
          connect: { category_id: ouzoCategories[2].category_id }
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fpastitsio.jpg?alt=media&token=93b6fdc4-75f7-4830-a39c-3ca00e2be2cc',
        available: true,
        restaurant_id: additionalRestaurants[2].restaurant_id,
        categories: {
          connect: { category_id: ouzoCategories[2].category_id }
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Stifado',
        price: 16.99,
        desc: 'Ragoût de boeuf',
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fstifado.jpg?alt=media&token=6915ce19-d44d-47ff-bfa4-e429f2403fea',
        available: true,
        restaurant_id: additionalRestaurants[2].restaurant_id,
        categories: {
          connect: { category_id: ouzoCategories[2].category_id }
        }
      }
    }),
  
    // Catégorie Desserts
    prisma.article.create({
      data: {
        name: 'Baklava',
        price: 6.99,
        desc: 'Pâtisserie aux noix et sirop',
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fbaklava.avif?alt=media&token=9692905b-1eb2-42a8-8049-a7a619db099f',
        available: true,
        restaurant_id: additionalRestaurants[2].restaurant_id,
        categories: {
          connect: { category_id: ouzoCategories[3].category_id }
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Loukoumades',
        price: 7.99,
        desc: 'Beignets grecs',
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Floukoumades.jpg?alt=media&token=d66ad4a0-d01b-4812-8986-52f7c9cefd82',
        available: true,
        restaurant_id: additionalRestaurants[2].restaurant_id,
        categories: {
          connect: { category_id: ouzoCategories[3].category_id }
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Galaktoboureko',
        price: 6.99,
        desc: 'Gâteau à la crème pâtissière',
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fgalaktoboureko.jpg?alt=media&token=07fd7e92-327b-416b-a889-b414cae01780',
        available: true,
        restaurant_id: additionalRestaurants[2].restaurant_id,
        categories: {
          connect: { category_id: ouzoCategories[3].category_id }
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
        image:
          'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fkebab-classique.png?alt=media&token=c059468d-9b8b-438f-9ec9-d96e7e91ffea',
        available: true,
        restaurant_id: additionalRestaurants[3].restaurant_id,
        categories: {
          connect: { category_id: sultanCategories[0].category_id }
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
        name: 'Assiette',
        price: 12.99,
        desc: 'Assiette de viande avec accompagnements',
        image:
          'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fassiette-mixte.jpg?alt=media&token=a0dd28a1-6f55-4eae-9553-c12045a845cc',
        available: true,
        restaurant_id: additionalRestaurants[3].restaurant_id,
        categories: {
          connect: { category_id: sultanCategories[1].category_id }
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
        image:
          'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fcoke.jpg?alt=media&token=6cffe88e-db0e-4f6d-8813-04043a11717b',
        available: true,
        restaurant_id: additionalRestaurants[3].restaurant_id,
        categories: {
          connect: { category_id: sultanCategories[2].category_id }
        },
        options: {
          create: [
            { name: 'Taille', value: '33cl', is_default: true },
            { name: 'Taille', value: '50cl', is_default: false, extra_price: 1.00 }
          ]
        }
      }
    }),
    // Suite – Catégorie Kebabs
    prisma.article.create({
      data: {
        name: 'Kebab Mixte',
        price: 12.99,
        desc: 'Kebab mixte viande et poulet',
        image:
          'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fkebab-mixte.avif?alt=media&token=b321c4c3-1d97-4b7d-9e8b-ddf8be7975ae',
        available: true,
        restaurant_id: additionalRestaurants[3].restaurant_id,
        categories: {
          connect: { category_id: sultanCategories[0].category_id }
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
        image:
          'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fchicken-burger.jpg?alt=media&token=ce71a1ab-7d22-46de-b3c3-ac0c35eac92d',
        available: true,
        restaurant_id: additionalRestaurants[3].restaurant_id,
        categories: {
          connect: { category_id: sultanCategories[0].category_id }
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
  
    // Catégorie Assiettes supplémentaires
    prisma.article.create({
      data: {
        name: 'Assiette Mixte',
        price: 15.99,
        desc: 'Assiette mixte viande et poulet',
        image:
          'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fassiette-mixte.jpg?alt=media&token=a0dd28a1-6f55-4eae-9553-c12045a845cc',
        available: true,
        restaurant_id: additionalRestaurants[3].restaurant_id,
        categories: {
          connect: { category_id: sultanCategories[1].category_id }
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Assiette de Poulet',
        price: 14.99,
        desc: 'Assiette de poulet mariné',
        image:
          'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fassiette-mixte.jpg?alt=media&token=a0dd28a1-6f55-4eae-9553-c12045a845cc',
        available: true,
        restaurant_id: additionalRestaurants[3].restaurant_id,
        categories: {
          connect: { category_id: sultanCategories[1].category_id }
        }
      }
    }),
  
    // Catégorie Boissons supplémentaires
    prisma.article.create({
      data: {
        name: 'Thé à la Menthe',
        price: 3.99,
        desc: 'Thé à la menthe traditionnel',
        image:
          'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fthe-menthe.jpg?alt=media&token=043aaee8-5a12-40eb-bc6c-0b24090deb2e',
        available: true,
        restaurant_id: additionalRestaurants[3].restaurant_id,
        categories: {
          connect: { category_id: sultanCategories[2].category_id }
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fkimchi.webp?alt=media&token=d74f728a-dcc9-4ab7-86c6-5f19fdb48fd3',
        available: true,
        restaurant_id: additionalRestaurants[4].restaurant_id,
        categories: {
          connect: { category_id: seoulCategories[0].category_id }
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fbibimbap.jpg?alt=media&token=ea34cd45-8b25-477d-a706-cf115082b324',
        available: true,
        restaurant_id: additionalRestaurants[4].restaurant_id,
        categories: {
          connect: { category_id: seoulCategories[1].category_id }
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fbulgogi.jpg?alt=media&token=541f6b3c-8fab-4c85-8c69-87be9efd09b7',
        available: true,
        restaurant_id: additionalRestaurants[4].restaurant_id,
        categories: {
          connect: { category_id: seoulCategories[1].category_id }
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fkimchi-jjigae.webp?alt=media&token=4335fcbe-4be0-409b-bc85-40577b98e6ab',
        available: true,
        restaurant_id: additionalRestaurants[4].restaurant_id,
        categories: {
          connect: { category_id: seoulCategories[2].category_id }
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fbingsu.webp?alt=media&token=96ccbfb2-69d7-462e-8a37-bc3963a3d1a7',
        available: true,
        restaurant_id: additionalRestaurants[4].restaurant_id,
        categories: {
          connect: { category_id: seoulCategories[3].category_id }
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fsoju.png?alt=media&token=f58078cc-36a1-44db-b311-f29c07aa0bb3',
        available: true,
        restaurant_id: additionalRestaurants[4].restaurant_id,
        categories: {
          connect: { category_id: seoulCategories[4].category_id }
        },
        options: {
          create: [
            { name: 'Taille', value: '200ml', is_default: true },
            { name: 'Taille', value: '360ml', is_default: false, extra_price: 2.00 }
          ]
        }
      }
    }),
    // Catégorie Entrées supplémentaires
    prisma.article.create({
      data: {
        name: 'Mandu',
        price: 7.99,
        desc: 'Raviolis coréens',
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fmandu.jpg?alt=media&token=a935937d-ae34-470f-a1bf-4d215fdd44f2',
        available: true,
        restaurant_id: additionalRestaurants[4].restaurant_id,
        categories: {
          connect: { category_id: seoulCategories[0].category_id }
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fhotteok.jpg?alt=media&token=7fcda504-033e-4104-9947-023660717b4a',
        available: true,
        restaurant_id: additionalRestaurants[4].restaurant_id,
        categories: {
          connect: { category_id: seoulCategories[0].category_id }
        }
      }
    }),
  
    // Catégorie Plats Principaux supplémentaires
    prisma.article.create({
      data: {
        name: 'Japchae',
        price: 14.99,
        desc: 'Nouilles de patate douce sautées',
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fjapchae.jpg?alt=media&token=24025e2b-aac2-4279-b2b3-161625c27aca',
        available: true,
        restaurant_id: additionalRestaurants[4].restaurant_id,
        categories: {
          connect: { category_id: seoulCategories[1].category_id }
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Dakgalbi',
        price: 16.99,
        desc: 'Poulet mariné aux légumes',
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fdagkalbi.webp?alt=media&token=2b8615de-88bb-4ebc-9d0a-669310a63323',
        available: true,
        restaurant_id: additionalRestaurants[4].restaurant_id,
        categories: {
          connect: { category_id: seoulCategories[1].category_id }
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
  
    // Catégorie Desserts supplémentaires
    prisma.article.create({
      data: {
        name: 'Bingsu',
        price: 6.99,
        desc: 'Dessert coréen à base de glace pilée',
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fbingsu.webp?alt=media&token=96ccbfb2-69d7-462e-8a37-bc3963a3d1a7',
        available: true,
        restaurant_id: additionalRestaurants[4].restaurant_id,
        categories: {
          connect: { category_id: seoulCategories[3].category_id }
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
    // Catégorie Boissons supplémentaires
    prisma.article.create({
      data: {
        name: 'Soju',
        price: 5.99,
        desc: 'Alcool coréen traditionnel',
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fsoju.png?alt=media&token=f58078cc-36a1-44db-b311-f29c07aa0bb3',
        available: true,
        restaurant_id: additionalRestaurants[4].restaurant_id,
        categories: {
          connect: { category_id: seoulCategories[4].category_id }
        },
        options: {
          create: [
            { name: 'Taille', value: '200ml', is_default: true },
            { name: 'Taille', value: '360ml', is_default: false, extra_price: 2.00 }
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fraviolis_vapeur.jpg?alt=media&token=<TON_TOKEN_RAVIOLIS>',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: { category_id: dragonCategories[0].category_id }
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fnems.jpg?alt=media&token=5f38a30d-f728-454f-9bfb-09831e21b6c2',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: { category_id: dragonCategories[0].category_id }
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fbeignets-de-crevettes.jpg?alt=media&token=0b8c2ace-dfaf-4f75-8a84-52fe85ab6599',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: { category_id: dragonCategories[0].category_id }
        }
      }
    }),
  
    // Catégorie Plats Principaux
    prisma.article.create({
      data: {
        name: 'Canard Laqué',
        price: 18.99,
        desc: 'Canard laqué traditionnel avec sa sauce',
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fcanard-laque.jpg?alt=media&token=ee76955a-b72b-4cde-8390-b836a9e3b26e',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: { category_id: dragonCategories[1].category_id }
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fboeuf-oignons.jpg?alt=media&token=26f5593b-e6b2-4577-ba66-57c7a170e2f6',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: { category_id: dragonCategories[1].category_id }
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fpoulet-au-curry.jpeg?alt=media&token=d0bd2665-92fb-487d-83aa-5b60d1213bb6',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: { category_id: dragonCategories[1].category_id }
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fporc-caramel.jpg?alt=media&token=aaadc2c7-5411-4b87-891d-4f94177f0605',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: { category_id: dragonCategories[1].category_id }
        }
      }
    }),
  
    // Catégorie Soupes
    prisma.article.create({
      data: {
        name: 'Soupe de Nouilles',
        price: 9.99,
        desc: 'Soupe traditionnelle aux nouilles et légumes',
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fsoupenouilles.jpg?alt=media&token=2cd94ff2-45ad-4b7a-9471-09119b220403',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: { category_id: dragonCategories[2].category_id }
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fsoupe-wonton.jpg?alt=media&token=ec907544-c8fc-4a49-a676-f3f5facbad92',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: { category_id: dragonCategories[2].category_id }
        }
      }
    }),
  
    // Catégorie Desserts
    prisma.article.create({
      data: {
        name: 'Beignets à la Banane',
        price: 6.99,
        desc: 'Beignets de banane croustillants',
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fbeignets-banane.webp?alt=media&token=fbad6591-ca62-451e-a77f-e34c4f8aa2ec',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: { category_id: dragonCategories[3].category_id }
        },
        options: {
          create: [
            { name: 'Sauce', value: 'Chocolat', is_default: true },
            { name: 'Sauce', value: 'Caramel', is_default: false }
          ]
        }
      }
    }),
    // Catégorie Entrées supplémentaires
    prisma.article.create({
      data: {
        name: 'Rouleaux de Printemps',
        price: 6.99,
        desc: 'Rouleaux de printemps frais aux légumes',
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Frouleaux_de_printemps.jpg?alt=media&token=811b52e2-b218-472f-943c-1a8a8f91f0c6',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: { category_id: dragonCategories[0].category_id }
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fsamoussas.jpg?alt=media&token=0314e3c8-e3b7-4fea-b5e0-7859d0322f83',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: { category_id: dragonCategories[0].category_id }
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
  
    // Catégorie Plats Principaux supplémentaires
    prisma.article.create({
      data: {
        name: 'Poulet aux Noix de Cajou',
        price: 15.99,
        desc: 'Poulet sauté aux noix de cajou et légumes',
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fpoulet-aux-noix-de-cajou.jpg?alt=media&token=455eb533-51cb-4917-af39-a21714c855d8',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: { category_id: dragonCategories[1].category_id }
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
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fcrevettes-ail.webp?alt=media&token=2e119602-7179-4e8e-807e-510dc0757ed6',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: { category_id: dragonCategories[1].category_id }
        }
      }
    }),
  
    // Catégorie Desserts supplémentaires
    prisma.article.create({
      data: {
        name: 'Glace au Thé Vert',
        price: 5.99,
        desc: 'Glace au thé vert matcha',
        image: 'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fglace-matcha.webp?alt=media&token=efaa776a-c44e-44c1-8f05-cd57dcb70fcc',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: { category_id: dragonCategories[3].category_id }
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
        image:
          'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fraviolis-vapeur.jpg?alt=media&token=86b95525-a876-4680-ad8f-c593ffdbb066',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: { category_id: dragonCategories[0].category_id }
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
        image:
          'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fnems.jpg?alt=media&token=5f38a30d-f728-454f-9bfb-09831e21b6c2',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: { category_id: dragonCategories[0].category_id }
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
        image:
          'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fbeignets-de-crevettes.jpg?alt=media&token=0b8c2ace-dfaf-4f75-8a84-52fe85ab6599',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: { category_id: dragonCategories[0].category_id }
        }
      }
    }),
  
    // Catégorie Plats Principaux
    prisma.article.create({
      data: {
        name: 'Canard Laqué',
        price: 18.99,
        desc: 'Canard laqué traditionnel avec sa sauce',
        image:
          'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fcanard-laque.jpg?alt=media&token=ee76955a-b72b-4cde-8390-b836a9e3b26e',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: { category_id: dragonCategories[1].category_id }
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
        image:
          'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fboeuf-oignons.jpg?alt=media&token=26f5593b-e6b2-4577-ba66-57c7a170e2f6',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: { category_id: dragonCategories[1].category_id }
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
        image:
          'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fpoulet-au-curry.jpeg?alt=media&token=d0bd2665-92fb-487d-83aa-5b60d1213bb6',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: { category_id: dragonCategories[1].category_id }
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
        image:
          'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fporc-caramel.jpg?alt=media&token=aaadc2c7-5411-4b87-891d-4f94177f0605',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: { category_id: dragonCategories[1].category_id }
        }
      }
    }),
  
    // Catégorie Soupes
    prisma.article.create({
      data: {
        name: 'Soupe de Nouilles',
        price: 9.99,
        desc: 'Soupe traditionnelle aux nouilles et légumes',
        image:
          'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fsoupe-chinoise.jpg?alt=media&token=75737825-6c07-49ce-9666-0979e445808f',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: { category_id: dragonCategories[2].category_id }
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
        image:
          'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fsoupe-wonton.jpg?alt=media&token=ec907544-c8fc-4a49-a676-f3f5facbad92',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: { category_id: dragonCategories[2].category_id }
        }
      }
    }),
  
    // Catégorie Desserts
    prisma.article.create({
      data: {
        name: 'Beignets à la Banane',
        price: 6.99,
        desc: 'Beignets de banane croustillants',
        image:
          'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fbeignets-banane.webp?alt=media&token=fbad6591-ca62-451e-a77f-e34c4f8aa2ec',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: { category_id: dragonCategories[3].category_id }
        },
        options: {
          create: [
            { name: 'Sauce', value: 'Chocolat', is_default: true },
            { name: 'Sauce', value: 'Caramel', is_default: false }
          ]
        }
      }
    }),
    // Catégorie Entrées supplémentaires
    prisma.article.create({
      data: {
        name: 'Rouleaux de Printemps',
        price: 6.99,
        desc: 'Rouleaux de printemps frais aux légumes',
        image:
          'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Frouleaux_de_printemps.jpg?alt=media&token=811b52e2-b218-472f-943c-1a8a8f91f0c6',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: { category_id: dragonCategories[0].category_id }
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
        image:
          'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fsamoussas.jpg?alt=media&token=0314e3c8-e3b7-4fea-b5e0-7859d0322f83',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: { category_id: dragonCategories[0].category_id }
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
  
    // Catégorie Plats Principaux supplémentaires
    prisma.article.create({
      data: {
        name: 'Poulet aux Noix de Cajou',
        price: 15.99,
        desc: 'Poulet sauté aux noix de cajou et légumes',
        image:
          'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fpoulet-aux-noix-de-cajou.jpg?alt=media&token=455eb533-51cb-4917-af39-a21714c855d8',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: { category_id: dragonCategories[1].category_id }
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
        name: "Crevettes à l'Ail",
        price: 16.99,
        desc: "Crevettes sautées à l'ail et au gingembre",
        image:
          'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fcrevettes-ail.webp?alt=media&token=2e119602-7179-4e8e-807e-510dc0757ed6',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: { category_id: dragonCategories[1].category_id }
        }
      }
    }),
  
    // Catégorie Desserts supplémentaires
    prisma.article.create({
      data: {
        name: 'Glace au Thé Vert',
        price: 5.99,
        desc: 'Glace au thé vert matcha',
        image:
          'https://firebasestorage.googleapis.com/v0/b/ceseats-907f1.firebasestorage.app/o/articles%2Fglace-matcha.webp?alt=media&token=efaa776a-c44e-44c1-8f05-cd57dcb70fcc',
        available: true,
        restaurant_id: additionalRestaurants[1].restaurant_id,
        categories: {
          connect: { category_id: dragonCategories[3].category_id }
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
