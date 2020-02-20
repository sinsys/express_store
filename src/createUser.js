
// Import helper function
const uuid = require('uuid');

// CREATE USER
createUser = (req, res) => {
  // Query Parameter Values
  const {
    username,
    password,
    favoriteClub,
    newsletter = "false"
  } = req.body;

  // Available clubs
  const clubs = [
    'Cache Valley Stone Society',
    'Ogden Curling Club',
    'Park City Curling Club',
    'Salt City Curling Club',
    'Utah Olympic Oval Curling Club'
  ];

  // Username validation
  if (!username) {
    return res
      .status(400)
      .send('Username required');
  };

  if (username.length < 6 || username.length > 20) {
    return res
      .status(400)
      .send('Username must be between 6 and 20 characters');
  };

  if (!password) {
    return res
      .status(400)
      .send('Password required');
  };

   // Password validation
   if (password.length < 8 || password.length > 36) {
    return res
      .status(400)
      .send('Password must be between 8 and 36 characters');
  };
  
  if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
    return res
      .status(400)
      .send('Password must be contain at least one digit');
  };

  // Favorite Club validation
  if (!favoriteClub) {
    return res
      .status(400)
      .send('favorite Club required');
  };

  if (!clubs.includes(favoriteClub)) {
    return res
      .status(400)
      .send('Not a valid club');
  };

  // Create new unique ID
  const id = uuid();

  // Create new user object
  const newUser = {
    id,
    username,
    password,
    favoriteClub,
    newsletter
  };

  // Validation passed! Return the user!
  return({
    success: true,
    user: newUser
  });
}

module.exports = {
  createUser 
};