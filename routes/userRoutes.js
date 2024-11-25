// Import required modules
const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

// Set up PostgreSQL connection using environment variables
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

// === GET All Users from Database ===
router.get('/', async (req, res) => {
  console.log('GET request received at /users');
  try {
    const result = await pool.query('SELECT * FROM users');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// === POST Create New User into Database ===
router.post('/', async (req, res) => {
  console.log('POST request received at /users');
  console.log('Request body:', req.body);
  
  const { username, role, team_id } = req.body;

  if (!username || !role) {
    console.log('Missing required fields');
    return res.status(400).json({ error: "Username and role are required" });
  }

  try {
    const result = await pool.query(
      'INSERT INTO users (username, role, team_id) VALUES ($1, $2, $3) RETURNING *',
      [username, role, team_id]
    );
    console.log('User created successfully:', result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Database error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// === PUT Update User ===
router.put('/:id', async (req, res) => {
  console.log(`PUT request received for user with ID: ${req.params.id}`);
  const { username, role, team_id } = req.body;

  try {
    const result = await pool.query(
      'UPDATE users SET username = $1, role = $2, team_id = $3 WHERE id = $4 RETURNING *',
      [username, role, team_id, req.params.id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Database error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// === DELETE User by ID ===
router.delete('/:id', async (req, res) => {
  console.log(`DELETE request received for user with ID: ${req.params.id}`);

  try {
    await pool.query('DELETE FROM users WHERE id = $1', [req.params.id]);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Database error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Export the router
module.exports = router;