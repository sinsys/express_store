// Import middleware
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

// Configuration settings
const { NODE_ENV } = require('./config');

// Database / Data Store
const USERS = require('./USERS.js');

// Import methods
const { createUser } = require('./createUser');
const { deleteUser } = require('./deleteUser');


// Creat the app
const app = express();

// Apply middleware
const morganOpt =
  ( NODE_ENV === 'production' )
    ? 'tiny'
    : 'common';

app.use(
  morgan(morganOpt),
  express.json(),
  helmet(),
  cors()
);

// Dependencies and setup completed

// GET REQUESTS
app.get('/', (req, res) => {
  res.send('GET request received');
});

// G
app.get('/user/:id', (req, res) => {
  res.send(`GET request intended to send user to user ${req.params.id} profile`);
});

app.get('/users', (req, res) => {
  res
    .json(USERS);
});

// POST REQUESTS
app.post('/', (req, res) => {
  res
    .send('POST request received');
});

app.post('/user', (req, res) => {
  // Validate that the client provided valid info
  const newUser = createUser(req, res);

  // Valid info provided and user object created.
  // Add user to our USERS store
  if ( newUser.success ) {
    USERS.push(newUser.user);
    res
      .status(201)
      .location(`http://localhost:8000/user/${newUser.user.id}`)
      .json(newUser);
  };
});

// DELETE REQUESTS
app.delete('/user/:userId', (req, res) => {
  // Validate that the user exists
  const validUser = deleteUser(req, res, USERS);

  // User exists. Delete the user
  if ( validUser.success ) {
    USERS.splice(
      validUser.index,
      1
    );
    
    res
      .status(204)
      .end();
  };
});

// Error handler
errorHandler = (err, req, res, next) => {
  let response;
  if (NODE_ENV === 'production') {
    response = { 
      error: { 
        message: 'server error' 
      }
    };
  } else {
    console.error(err);
    response = {
      message: err.message, err
    };
  }
  res.status(500).json(response)
};

app.use(errorHandler);

module.exports = app;