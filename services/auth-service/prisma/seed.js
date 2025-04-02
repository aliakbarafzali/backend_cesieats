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

  // Création des utilisateurs (sans duplication)
  await prisma.users.createMany({
    data: [
      {
        user_name: 'Ali Test',
        user_email: 'ali@cesieats.com',
        user_phone: '0600000000',
        user_password: hashed,
        user_type: 3
      },
      {
        user_name: 'Client Test',
        user_email: 'client@cesieats.com',
        user_phone: '0611111111',
        user_password: hashed,
        user_type: 1
      }
    ],
    skipDuplicates: true
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
