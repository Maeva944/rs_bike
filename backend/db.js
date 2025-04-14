const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'rs_bike',
  user: 'postgres',
  password: 'NONO042004'
});

// Connexion à la base de données
pool.connect()
  .then(() => console.log('Connected to the database!'))
  .catch(err => console.error('Connection error', err.stack));

module.exports = pool;



