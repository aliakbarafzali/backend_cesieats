#!/bin/sh
set -e

echo "🔄 Génération du client Prisma..."
npx prisma generate

# Si la variable RESET_DB est définie à "true", on réinitialise la base de données
if [ "$RESET_DB" = "true" ]; then
  echo "⚠️ Réinitialisation de la base de données..."
  npx prisma migrate reset --force
fi

# Vérifie si le dossier des migrations existe et n'est pas vide
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
