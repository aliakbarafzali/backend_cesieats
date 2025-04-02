echo "🔄 Génération du client Prisma..."
npx prisma generate

echo "🗃️ Application des migrations..."
npx prisma migrate deploy

echo "🌱 Exécution du script de seed..."
node prisma/seed.js

echo "🚀 Lancement du serveur..."
npm run dev
