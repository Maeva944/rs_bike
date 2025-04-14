const express = require('express');
const app = express();
const cors = require("cors");
const Inscription = require ("./api/inscription");
const Connexion = require('./api/auth');


app.use(express.json());
app.use(cors());

app.use("/inscription", Inscription);
app.use('/auth', Connexion);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
