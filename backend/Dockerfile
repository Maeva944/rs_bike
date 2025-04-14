# Utiliser l'image officielle de Node.js
FROM node:16

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier package.json et package-lock.json dans le conteneur
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tous les fichiers du backend dans le conteneur
COPY . .

# Exposer le port sur lequel ton serveur fonctionne
EXPOSE 3000

# Démarrer l'application
CMD ["npm", "start"]

