#!/bin/sh
set -e

npx prisma migrate reset --force

npx prisma migrate dev --name init
echo "🔄 Génération du client Prisma..."
npx prisma generate

# Réinitialisation de la base si RESET_DB=true
if [ "$RESET_DB" = "true" ]; then
  echo "⚠️ Réinitialisation de la base de données..."
  npx prisma migrate reset --force
fi

# Application des migrations ou création si aucune trouvée
if [ -d "prisma/migrations" ] && [ "$(ls -A prisma/migrations)" ]; then
  echo "🗃️ Application des migrations..."
  npx prisma migrate deploy
else
  echo "⚠️ Aucune migration trouvée, création d'une migration initiale..."
  npx prisma migrate dev --name init --skip-seed
fi

echo "🌱 Exécution du script de seed..."
if [ -f "prisma/seed.js" ]; then
  node prisma/seed.js
else
  echo "⚠️ Aucun script de seed trouvé, passage à l'étape suivante..."
fi

echo "🚀 Lancement du serveur..."
npm run dev
