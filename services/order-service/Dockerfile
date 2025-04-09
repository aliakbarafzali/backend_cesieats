FROM node:18

WORKDIR /app

# Copie les fichiers nécessaires
COPY package*.json ./
RUN npm install

# Copie le reste du code
COPY . .

# Rend le script d'entrée exécutable
RUN chmod +x entrypoint.sh

# Définit le point d’entrée
ENTRYPOINT ["./entrypoint.sh"]

# Expose le port de l'application (à adapter si besoin)
EXPOSE 5002
