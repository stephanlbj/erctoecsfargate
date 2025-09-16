FROM node:18-alpine

# Dossier de travail
WORKDIR /app

# Copie des fichiers de config
COPY package*.json ./

# Installation des dépendances
RUN npm install 

# Copie du code source
COPY . .

# Expose le port (doit correspondre à .env)
EXPOSE 4000

# Lancement de l’app
CMD ["npm", "start"]
