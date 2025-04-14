const express = require('express');
const app = express();
const cors = require("cors");
const Inscription = require ("./api/inscription");
const Connexion = require('./api/auth');
const Categorie = require('./api/categorie');
const Vehicule = require('./api/vehicule');


app.use(express.json());
app.use(cors());

app.use("/inscription", Inscription);
app.use('/auth', Connexion);
app.use('/categorie', Categorie);
app.use('/vehicule', Vehicule);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
