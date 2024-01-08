const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.PGUSER || 'postgres',
  host: process.env.PGHOST || 'localhost',
  database: process.env.PGDATABASE || 'dbTestKafka',
  password: process.env.PGPASSWORD || 'admin',
  port: process.env.PGPORT || 5432,
});

const insertMessage = async (sender, text) => {
  const query = 'INSERT INTO messages(sender, message, timestamp) VALUES ($1, $2, $3) RETURNING *';
  const params = [sender, text, new Date()];
  const { rows } = await pool.query(query, params);
  return rows[0];
};

const getRecentMessages = async () => {
  const query = 'SELECT * FROM messages ORDER BY timestamp DESC LIMIT 5';
  const { rows } = await pool.query(query);
  return rows;
};


module.exports = {
  pool,
  insertMessage,
  getRecentMessages
};
