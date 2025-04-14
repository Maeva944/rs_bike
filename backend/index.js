// Importer le module Express
const express = require('express');
const app = express();

// Middleware pour gérer les requêtes JSON
app.use(express.json());

// Exemple de route de base
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Démarrer le serveur sur un port spécifique
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
