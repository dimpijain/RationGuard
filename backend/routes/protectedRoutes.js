const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/dashboard', (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // You can return protected info here
    res.json({ message: 'Protected content fetched successfully!', userId: decoded.id });
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
});

module.exports = router;
