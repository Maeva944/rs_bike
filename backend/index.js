const express = require('express');
const app = express();
const cors = require("cors");
const helmet = require('helmet');
const Inscription = require("./api/inscription");
const Connexion = require('./api/auth');
const Categorie = require('./api/categorie');
const Vehicule = require('./api/vehicule');
const type_vehicule = require('./api/type_vehicule');
const couleur = require('./api/couleur');
const marque = require('./api/marque');
const message_contact = require('./api/message_contact');
const reserver = require('./api/reserver');
const creneaux = require('./api/creneaux');

app.use(express.json());
app.use(cors());
app.use(
helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      frameAncestors: ["'none'"],
    },
  })
);
app.use(express.urlencoded({ extended: true }));

app.use("/inscription", Inscription);
app.use('/auth', Connexion);
app.use('/categorie', Categorie);
app.use('/vehicule', Vehicule);
app.use('/marque', marque);
app.use('/couleur', couleur);
app.use('/messagecontact', message_contact);
app.use('/typevehicule', type_vehicule);
app.use('/', reserver);
app.use('/', creneaux);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
