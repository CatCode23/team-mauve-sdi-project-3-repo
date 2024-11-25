const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV || 'development']);
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

const AUTH_PORT = process.env.AUTH_PORT || 5001;
//dotenv.config();

const auth_server = express();
auth_server.use(express.json());
auth_server.use(cookieParser());
auth_server.use(cors( { credentials: true, origin: 'http://localhost:5173' } ));

const isAuthed = (req, res, next) => {
  let userCookie = req.cookie.user;
  if (!userCookie) { return res.status(401).json( { message: 'Not Authenticated' } ) };
  req.user = JSON.parse(userCookie);
  next();
  //user user.role from cookie to show Leader Dashboard tab if role === 'leader' and user.team === to team_id
  //or a lookup from the database based on user.id to cross-reference user.role for avaliable views
};


auth_server.post('/register', async (req, res) => {
  let { username, password } = req.body;
  try {
    //knex query - check if user exists - (SELECT * FROM users WHERE username = $1', [username])
    let existingUser = await knex('users').where('username', username).first();
    if ( existingUser.row.length > 0 ) { return res.status(400).json( { message: 'User Exists' } ) };
    var hashedPass = await bcrypt.hash(password, 10);

    //knex query - insert new user - (INSERT INTO users (username, password) VALUES ($1, $2), [username, hashedpass])
    let [newUser] = await knex('users').insert( { username, password: hashedPass }, ['username'] );

    res.cookie('user', JSON.stringify(newUser), {httpOnly: true, maxAge: 1800000}); //half hour
    res.status(201).json(user);
    } catch (error) {
    console.error(error);
    res.status(500).json( { message: 'Server Error - User Registration' } );
    }
  }
);

auth_server.post('/login', async (req, res) => {
  var {username, password} = req.body;
  try {
    //let userValidation = await knex.query(SELECT * FROM users WHERE username = $1, [username]);
    let userValidation = await knex('users').where('username', username).first();
    if (!userValidation) {
      return res.status(400).json( { message: 'Invalid Username or Password'})
      }
    let user = userValidation.rows[0];
    //let passMatch = await bcrypt.compare(password, user.password);
    //if (!passMatch)
    if (!await bcrypt.compare(password, user.password)) {
      return res.status(400).json( { message: 'Invalid Username or Password'})
      }
    res.cookie('user', JSON.stringify(userCookie), {httpOnly: true, maxAge: 1800000}); //half hour
    res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json( { message: 'Server Error - User Login' } );
    }
  }
);

auth_server.post('/logout', (req, res) => {
  res.clearCookie('user');
  res.status(200).json( { message: 'Success : Logged out' } );
  }
);

auth_server.listen(PORT, () => { console.log(`Auth Server running on port: ${PORT}` ) } );
