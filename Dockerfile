# Dockerfile pour exécuter les tests Playwright
# Basé sur l'image officielle Playwright qui inclut déjà toutes les dépendances

FROM mcr.microsoft.com/playwright:v1.61.0-jammy

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de configuration npm et Playwright
COPY package*.json ./
COPY playwright.config.js ./

# Installer les dépendances npm
RUN npm install

# Copier le reste de l'application
COPY . .

# L'image de base a déjà les navigateurs Playwright, pas besoin de réinstaller
# RUN npx playwright install

# Exposer le port du serveur web (3001 pour éviter conflit avec API)
EXPOSE 3001

# Commande par défaut : lancer les tests
CMD ["npm", "test"]
