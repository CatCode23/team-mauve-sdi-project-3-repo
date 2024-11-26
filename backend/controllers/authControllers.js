// authControllers.js

const bcrypt = require('bcryptjs');
const knex = require('../knex');

const registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if user exists
    const existingUser = await knex('users').where('username', username).first();
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPass = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const [newUser] = await knex('users').insert({ username, password: hashedPass }, ['username']);

    res.cookie('user', JSON.stringify(newUser), {httpOnly: true, maxAge: 1800000}); //half hour
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error - User Registration' });
  }
};

const userLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Validate user
    const user = await knex('users').where('username', username).first();
    if (!user) {
      return res.status(400).json({ message: 'Invalid Username or Password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Username or Password' });
    }
    res.cookie('user', JSON.stringify(user), { httpOnly: true, maxAge: 1800000 }); // Half-hour expiration
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error - User Login' });
  }
};

const userLogout = (req, res) => {
  res.clearCookie('user');
  res.status(200).json({ message: 'Success: Logged out' });
};

module.exports = { registerUser, userLogin, userLogout };



