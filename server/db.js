const { Pool } = require('pg');

const {DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DATABASE_NAME} = process.env

// Create a new pool
const pool = new Pool({
  user: DB_USER || 'mapbox',
  password: DB_PASSWORD || 'Mapboxtest@2023',
  host: DB_HOST || '139.144.1.245',
  port: DB_PORT || 5432, // default Postgres port
  database: DATABASE_NAME || 'mapboxtest'
});

const inital = async () => {
  try {
    // SQL query to create a simple example table
    await pool.query(`CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY, 
      username VARCHAR(255) 
      UNIQUE NOT NULL)`)

    // -- Create Posts table
    await pool.query(`CREATE TABLE IF NOT EXISTS postData (
      id SERIAL PRIMARY KEY, 
      title VARCHAR(255) NOT NULL, 
      content TEXT NOT NULL, 
      user_id INT REFERENCES 
      users(id) ON DELETE CASCADE, 
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP)`);

    //-- Create Comments table
    await pool.query(`CREATE TABLE IF NOT EXISTS commentData (
      id SERIAL PRIMARY KEY, 
      content TEXT NOT NULL, 
      user_id INT REFERENCES users(id) ON DELETE CASCADE, 
      post_id INT REFERENCES posts(id) ON DELETE CASCADE, 
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP)`);
    
    console.log('Table created successfully');
  } catch (error) {
    console.error('Error creating table:', error);
    console.log({ error: 'Internal Server Error' });
  }
  
}

// Export the pool
module.exports = {
  query: (text, params) => pool.query(text, params),
  inital: inital,
};

