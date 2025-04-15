const express = require('express');
const app = express();
const cors = require("cors");
const Inscription = require ("./api/inscription");
const Connexion = require('./api/auth');
const Categorie = require('./api/categorie');
const Vehicule = require('./api/vehicule');
const type_vehicule = require('./api/type_vehicule');
const couleur = require('./api/couleur');
const marque = require('./api/marque');
const message_contact = require('./api/message_contact');


app.use(express.json());
app.use(cors());

app.use("/inscription", Inscription);
app.use('/auth', Connexion);
app.use('/categorie', Categorie);
app.use('/vehicule', Vehicule);
app.use('/marque', marque);
app.use('/couleur', couleur);
app.use('/messagecontact', message_contact);
app.use('/typevehicule', type_vehicule);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
