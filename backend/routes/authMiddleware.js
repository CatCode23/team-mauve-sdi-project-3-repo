const isAuthed = (req, res, next) => {
  let userCookie = req.cookie.user;
  if (!userCookie) { return res.status(401).json( { message: 'Not Authenticated' } ) };
  req.user = JSON.parse(userCookie);
  next();
  //user user.role from cookie to show Leader Dashboard tab if role === 'leader' and user.team === to team_id
  //or a lookup from the database based on user.id to cross-reference user.role for avaliable views
};

module.exports = { isAuthed };