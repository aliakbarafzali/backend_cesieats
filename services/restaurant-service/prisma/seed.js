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
    prisma.restaurantType.create({ data: { name: 'Fast Food' } }),
    prisma.restaurantType.create({ data: { name: 'Pizzeria' } }),
    prisma.restaurantType.create({ data: { name: 'Asiatique' } }),
    prisma.restaurantType.create({ data: { name: 'Italien' } }),
    prisma.restaurantType.create({ data: { name: 'Français' } })
  ]);

  // Création des adresses
  console.log('📍 Création des adresses...');
  const addresses = await Promise.all([
    prisma.address.create({
      data: {
        place_id: 'place_1',
        street: '123 Rue de la Paix',
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
        street: '456 Avenue des Champs-Élysées',
        city: 'Paris',
        postcode: '75008',
        country: 'France',
        lat: '48.8698',
        lon: '2.3079'
      }
    })
  ]);

  // Création des restaurants
  console.log('🍽️ Création des restaurants...');
  const restaurants = await Promise.all([
    prisma.restaurant.create({
      data: {
        restaurant_name: 'Burger King',
        restaurant_phone: '+33123456789',
        restaurant_email: 'contact@burgerking.fr',
        image_url: 'https://example.com/burgerking.jpg',
        banner_image_url: 'https://example.com/burgerking-banner.jpg',
        opening_hours: 'Lundi-Dimanche: 10h-22h',
        owner_id: '550e8400-e29b-41d4-a716-446655440000', // UUID d'exemple
        rating: 4.2,
        offers_available: true,
        address_id: addresses[0].id,
        restaurant_type: {
          connect: [{ name: 'Fast Food' }]
        }
      }
    }),
    prisma.restaurant.create({
      data: {
        restaurant_name: 'Pizza Hut',
        restaurant_phone: '+33987654321',
        restaurant_email: 'contact@pizzahut.fr',
        image_url: 'https://example.com/pizzahut.jpg',
        banner_image_url: 'https://example.com/pizzahut-banner.jpg',
        opening_hours: 'Lundi-Dimanche: 11h-23h',
        owner_id: '550e8400-e29b-41d4-a716-446655440001', // UUID d'exemple
        rating: 4.5,
        offers_available: true,
        address_id: addresses[1].id,
        restaurant_type: {
          connect: [{ name: 'Pizzeria' }, { name: 'Italien' }]
        }
      }
    })
  ]);

  // Création des catégories
  console.log('📑 Création des catégories...');
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Burgers',
        restaurant_id: restaurants[0].restaurant_id
      }
    }),
    prisma.category.create({
      data: {
        name: 'Boissons',
        restaurant_id: restaurants[0].restaurant_id
      }
    }),
    prisma.category.create({
      data: {
        name: 'Pizzas',
        restaurant_id: restaurants[1].restaurant_id
      }
    }),
    prisma.category.create({
      data: {
        name: 'Desserts',
        restaurant_id: restaurants[1].restaurant_id
      }
    })
  ]);

  // Création des articles
  console.log('🍔 Création des articles...');
  const articles = await Promise.all([
    // Articles pour Burger King
    prisma.article.create({
      data: {
        name: 'Whopper',
        price: 8.99,
        desc: 'Notre burger signature avec une viande de bœuf grillée à la flamme',
        image: 'https://example.com/whopper.jpg',
        available: true,
        has_offer: true,
        offer_type: 'DISCOUNT',
        discount_percent: 20.00,
        restaurant_id: restaurants[0].restaurant_id,
        categories: {
          connect: [{ category_id: categories[0].category_id }]
        },
        ingredients: {
          create: [
            { name: 'Pain', removable: false },
            { name: 'Viande de bœuf', removable: false },
            { name: 'Salade', removable: true },
            { name: 'Tomate', removable: true },
            { name: 'Oignon', removable: true }
          ]
        },
        supplements: {
          create: [
            { name: 'Double viande', is_optional: true, extra_price: 2.00 },
            { name: 'Bacon', is_optional: true, extra_price: 1.50 }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Coca-Cola',
        price: 2.99,
        desc: 'Boisson gazeuse rafraîchissante',
        image: 'https://example.com/cocacola.jpg',
        available: true,
        restaurant_id: restaurants[0].restaurant_id,
        categories: {
          connect: [{ category_id: categories[1].category_id }]
        }
      }
    }),
    // Articles pour Pizza Hut
    prisma.article.create({
      data: {
        name: 'Reine',
        price: 12.99,
        desc: 'Pizza avec jambon et champignons',
        image: 'https://example.com/reine.jpg',
        available: true,
        has_offer: true,
        offer_type: '1FOR2',
        restaurant_id: restaurants[1].restaurant_id,
        categories: {
          connect: [{ category_id: categories[2].category_id }]
        },
        ingredients: {
          create: [
            { name: 'Pâte à pizza', removable: false },
            { name: 'Sauce tomate', removable: false },
            { name: 'Mozzarella', removable: false },
            { name: 'Jambon', removable: true },
            { name: 'Champignons', removable: true }
          ]
        },
        supplements: {
          create: [
            { name: 'Extra fromage', is_optional: true, extra_price: 2.00 },
            { name: 'Piments', is_optional: true, extra_price: 1.00 }
          ]
        }
      }
    }),
    prisma.article.create({
      data: {
        name: 'Tiramisu',
        price: 5.99,
        desc: 'Dessert italien traditionnel',
        image: 'https://example.com/tiramisu.jpg',
        available: true,
        restaurant_id: restaurants[1].restaurant_id,
        categories: {
          connect: [{ category_id: categories[3].category_id }]
        }
      }
    })
  ]);

  // Création des avis
  console.log('⭐ Création des avis...');
  await Promise.all([
    prisma.review.create({
      data: {
        rating: 5,
        comment: 'Excellent service et nourriture délicieuse !',
        user_id: '550e8400-e29b-41d4-a716-446655440002',
        restaurant_id: restaurants[0].restaurant_id
      }
    }),
    prisma.review.create({
      data: {
        rating: 4,
        comment: 'Très bon rapport qualité-prix',
        user_id: '550e8400-e29b-41d4-a716-446655440003',
        restaurant_id: restaurants[1].restaurant_id
      }
    })
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