const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');
const usersRouter = require('../users/users-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/users', authenticate, usersRouter);
server.use('/api/jokes', authenticate, jokesRouter);

server.get('/', ( req, res ) => {
  res.send("It's alive");
})

module.exports = server;

// function checkRole(role) {
//   return (req, res, next) => {
//     if (
//       req.decodedToken &&
//       req.decodedToken.role &&
//       req.decodedToken.role.toLowerCase() === role
//     ) {
//       next();
//     } else {
//       res.status(403).json({ you: "shall not pass!" });
//     }
//   };
// }