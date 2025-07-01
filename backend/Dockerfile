# Utilise une image officielle Node.js
FROM node:18

# Définit le dossier de travail dans le container
WORKDIR /app

# Copie les fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie tout le reste des fichiers dans le container
COPY . .

# Expose le port (adapte-le si besoin)
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "start"]

