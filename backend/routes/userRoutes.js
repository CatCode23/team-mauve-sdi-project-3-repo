// userRoutes.js

// Import required modules
const { Router } = require('express');
const userRouter = Router();
const { Pool } = require('pg');

// Set up PostgreSQL connection using environment variables
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

// GET All Users
userRouter.get('/', async (req, res) => {
  console.log('GET request received at /users');  // Debugging log
  try {
    const result = await pool.query('SELECT * FROM users');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST Create New User
userRouter.post('/', async (req, res) => {
  console.log('POST request received at /users');  // Debugging log
  const { username, password } = req.body;

  if (!username || !password) {
    console.log('Missing required fields: Username or Password');
    return res.status(400).json({ error: "Username and Password are required" });
  }

  try {
    console.log('Inserting user into database...');
    const result = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
      [username, password]
    );
    console.log('User created successfully:', result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.log('Database error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// DELETE User by ID
userRouter.delete('/:id', async (req, res) => {
  const userId = req.params.id;
  console.log('DELETE request received for user with ID:', userId);

  try {
    await pool.query('DELETE FROM users WHERE id = $1', [userId]);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = userRouter;
