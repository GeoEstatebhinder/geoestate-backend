// routes/authRoutes.js or a new file
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/verify-token', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // replace with your secret
    res.status(200).json({ valid: true, user: decoded });
  } catch (err) {
    res.status(401).json({ valid: false, message: 'Invalid token' });
  }
});

module.exports = router;
