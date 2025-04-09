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
  console.log('📍 Création des adresses...');
  const addresses = await Promise.all([
    prisma.address.upsert({
      where: { place_id: "1001" },
      update: {},
      create: {
        place_id: "1001",
        street: '15 Rue de la République',
        city: 'Lyon',
        postcode: '69001',
        country: 'France',
        lat: '45.7671',
        lon: '4.8345'
      }
    }),
    prisma.address.upsert({
      where: { place_id: "1002" },
      update: {},
      create: {
        place_id: "1002",
        street: '27 Rue Gabriel Péri',
        city: 'Villeurbanne',
        postcode: '69100',
        country: 'France',
        lat: '45.7615',
        lon: '4.8780'
      }
    })
  ]);


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
      address: { connect: { id: addresses[0].id } }
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
      address: { connect: { id: addresses[1].id } }
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
