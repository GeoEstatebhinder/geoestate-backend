const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Dummy login with username + password (no DB for demo)
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Replace this with real DB check
  if (email === 'admin@geoestate.com' && password === 'admin123') {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    return res.json({ token });
  } else {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
});

module.exports = router;
