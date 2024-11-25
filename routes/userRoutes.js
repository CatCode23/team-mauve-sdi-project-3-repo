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
    
    const { name, email } = req.body;
  
    if (!name || !email) {
      console.log('Missing required fields');
      return res.status(400).json({ error: "Name and email are required" });
    }
  
    try {
      const result = await pool.query(
        'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
        [name, email]
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
  const { name, email } = req.body;

  try {
    const result = await pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
      [name, email, req.params.id]
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
