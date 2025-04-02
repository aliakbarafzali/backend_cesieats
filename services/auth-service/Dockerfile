FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Rendre le script exécutable
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

# Exposer le port
EXPOSE 5000

# Démarrer via entrypoint
CMD ["./entrypoint.sh"]
