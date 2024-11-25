const bcrypt = require('bcryptjs');
const knex = require('../knex');

const registerUser = async (req, res) => {
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
};

const userLogin = async (req, res) => {
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
};

const userLogout = (req, res) => {
  res.clearCookie('user');
  res.status(200).json( { message: 'Success : Logged out' } );
};

module.exports = { registerUser, userLogin, userLogout };


