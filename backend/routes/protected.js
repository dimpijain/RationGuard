const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.get('/dashboard', authMiddleware, (req, res) => {
  // Access user info from req.user
  res.json({
    message: 'Protected content fetched successfully!',
    userId: req.user.id,
  });
});

module.exports = router;
