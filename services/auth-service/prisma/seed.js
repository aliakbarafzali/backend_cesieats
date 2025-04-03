import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Création des types utilisateurs (sans duplication)
  await prisma.user_types.createMany({
    data: [
      { type_label: 'Client' },
      { type_label: 'Livreur' },
      { type_label: 'Restaurateur' }
    ],
    skipDuplicates: true
  });

  const hashed = await bcrypt.hash('password123', 10);

  // Création de 2 adresses via upsert pour éviter les duplications
  const address1 = await prisma.address.upsert({
    where: { place_id: 1001 }, // Utilisez un identifiant fictif pour le seeding
    update: {},
    create: {
      place_id: 1001,
      road: 'Rue de Paris',
      city: 'Paris',
      postcode: '75000',
      country: 'France',
      lat: '48.8566',
      lon: '2.3522'
    }
  });

  const address2 = await prisma.address.upsert({
    where: { place_id: 1002 },
    update: {},
    create: {
      place_id: 1002,
      road: 'Avenue de Lyon',
      city: 'Lyon',
      postcode: '69000',
      country: 'France',
      lat: '45.7640',
      lon: '4.8357'
    }
  });

  // Création des utilisateurs (sans duplication)
  await prisma.users.upsert({
    where: { user_email: 'ali@cesieats.com' },
    update: {},
    create: {
      user_name: 'Ali Test',
      user_email: 'ali@cesieats.com',
      user_phone: '0600000000',
      user_password: hashed,
      // Connecte la relation avec user_types en utilisant le champ relationnel
      user_types: { connect: { type_id: 3 } },
      // Connecte la relation avec Address via le champ relationnel "address"
      address: { connect: { id: address1.id } }
    }
  });

  // Utilisateur 2 : Client (type 1) avec address2
  await prisma.users.upsert({
    where: { user_email: 'client@cesieats.com' },
    update: {},
    create: {
      user_name: 'Client Test',
      user_email: 'client@cesieats.com',
      user_phone: '0611111111',
      user_password: hashed,
      user_types: { connect: { type_id: 1 } },
      address: { connect: { id: address2.id } }
    }
  });

  console.log('✅ Seeding terminé avec skipDuplicates');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
