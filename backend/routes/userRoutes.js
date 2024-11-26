// userRoutes.js

// Import required modules
const { Router } = require('express');
const userRouter = Router();
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

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

// GET User by ID
userRouter.get('/:id', async (req, res) => {
  const userId = req.params.id;
  console.log('GET request received for user with ID:', userId);
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
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
    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Inserting user into database...');
    const result = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
      [username, hashedPassword]
    );
    console.log('User created successfully:', result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.log('Database error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// PUT Update User by ID
userRouter.put('/:id', async (req, res) => {
  const userId = req.params.id;
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and Password are required" });
  }

  try {
    // Hash the new password before updating
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Updating user in database...');
    const result = await pool.query(
      'UPDATE users SET username = $1, password = $2 WHERE id = $3 RETURNING *',
      [username, hashedPassword, userId]
    );
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
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
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [userId]);
    if (result.rows.length > 0) {
      res.status(200).json({ message: 'User deleted successfully', user: result.rows[0] });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = userRouter;

