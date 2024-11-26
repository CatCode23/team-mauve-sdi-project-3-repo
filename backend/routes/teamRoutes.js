// teamRoutes.js

// Import required modules
const { Router } = require('express');
const teamRouter = Router();
const { Pool } = require('pg');

// Set up PostgreSQL connection using environment variables
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

// GET All Teams
teamRouter.get('/', async (req, res) => {
  console.log('GET request received at /teams');  // Debugging log
  try {
    const result = await pool.query('SELECT * FROM teams');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST Create New Team
teamRouter.post('/', async (req, res) => {
  console.log('POST request received at /teams');  // Debugging log
  const { name } = req.body;

  if (!name) {
    console.log('Missing required field: Team name');
    return res.status(400).json({ error: "Team name is required" });
  }

  try {
    console.log('Inserting team into database...');
    const result = await pool.query(
      'INSERT INTO teams (name) VALUES ($1) RETURNING *',
      [name]
    );
    console.log('Team created successfully:', result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.log('Database error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// DELETE Team by ID
teamRouter.delete('/:id', async (req, res) => {
  const teamId = req.params.id;
  console.log('DELETE request received for team with ID:', teamId);

  try {
    await pool.query('DELETE FROM teams WHERE id = $1', [teamId]);
    res.status(200).json({ message: 'Team deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = teamRouter;
