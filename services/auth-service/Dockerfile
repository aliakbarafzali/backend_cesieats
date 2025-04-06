FROM node:18

WORKDIR /app

# Copie package.json et lockfile
COPY package*.json ./
RUN npm install

# Copie le code source + le script d'entrée
COPY . .

# Rend le script exécutable
RUN chmod +x entrypoint.sh

# Définit le shell par défaut et démarre le script
ENTRYPOINT ["./entrypoint.sh"]

# Expose le port de l'application
EXPOSE 5000
