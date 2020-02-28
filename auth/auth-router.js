const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model');
const { jwtSecret } = require('../config/secrets');

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
  .then(saved => {
    res.status(201).json(saved)
  })
  .catch(error => {
    res.status(500).json(error);
  })
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;

  Users.findBy( { username })
  .first()
  .then(user => {
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);

      res.status(200).json({ message: `Welcome ${user.username}!`,
      token,
    })
  } else {
    res.status(401).json({ message: 'Invalid Credentials'});
  }
})
.catch(error => {
  console.log('ERROR: ', error);
  res.status(500).json({ error: '/login error' })
})
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.role || 'user',
  };

  const options = {
    expiresIn: '2hr',
  };

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
