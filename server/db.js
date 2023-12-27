const { Pool } = require('pg');

// Create a new pool
const pool = new Pool({
  user: 'mapbox',
  password: 'Mapboxtest@2023',
  host: '139.144.1.245',
  port: 5432, // default Postgres port
  database: 'mapboxtest'
});


// Export the pool
module.exports = {
  query: (text, params) => pool.query(text, params)
};

