
FROM node:16


WORKDIR /app


COPY package*.json ./

# Installer les dépendances
RUN npm install


COPY . .


RUN npm run build


EXPOSE 8080


CMD ["npm", "run", "serve"]
