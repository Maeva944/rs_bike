const express = require('express');
const app = express();
const cors = require("cors");
const helmet = require('helmet');
const rateLimit = require("express-rate-limit");
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

app.disable('x-powered-by');

app.use(helmet());

const allowedOrigins = [
  "http://localhost:5173",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.json());
app.use(cors());
app.use(helmet.noSniff());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { error: "Trop de tentatives. Réessayez plus tard." }
  }));
app.use(express.urlencoded({ extended: true }));
app.use(helmet.contentSecurityPolicy({
  defaultSrc: ["'self'"],
  scriptSrc: ["'self'"],
  styleSrc: ["'self'"],
  imgSrc: ["'self'", 'data:'],
  objectSrc: ["'none'"],
}));


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