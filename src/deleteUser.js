// DELETE USER
deleteUser = (req, res, users) => {

  // Query Parameter Values
  const { userId } = req.params;

  // Find user with supplied ID
  const index = users.findIndex(user =>
    user.id === userId
  );

  // If we don't find user with that ID provide error
  if ( index === -1 ) {
    return (
      res
        .status(404)
        .send(`User ${userId} not found`)
    );
  }

  // Validation passed! Return the userId to delete!
  return({
    success: true,
    index: index,
    userId: userId
  });

};

module.exports = {
  deleteUser
};