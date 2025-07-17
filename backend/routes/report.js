const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Report = require('../models/Report');
const jwt = require('jsonwebtoken');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// Middleware to verify token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user; // This contains id, email, name, etc.
    next();
  });
}

// @route POST /api/reports
router.post('/', authenticateToken, upload.single('image'), async (req, res) => {
  const { issueType, shopName, location, description } = req.body;

  try {
    const report = new Report({
      issueType,
      shopName,
      location,
      description,
      imagePath: req.file ? req.file.filename : '',
      userId: req.user.id
    });

    await report.save();

    res.status(201).json({ message: 'Report submitted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while saving report' });
  }
});

// GET /api/reports/mine — Get reports of logged-in user
router.get('/mine', authenticateToken, async (req, res) => {
  try {
    const reports = await Report.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch reports' });
  }
});

//edit report
// PUT /api/reports/:id — Edit a report
// PUT /api/reports/:id — Edit a report
router.put('/:id', authenticateToken, upload.single('image'), async (req, res) => {
  const { issueType, shopName, location, description } = req.body;

  try {
    const updateFields = {
      issueType,
      shopName,
      location,
      description,
    };

    if (req.file) {
      updateFields.imagePath = req.file.filename;
    }

    const updatedReport = await Report.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { $set: updateFields },
      { new: true }
    );

    if (!updatedReport) return res.status(404).json({ message: 'Report not found or not authorized' });

    res.status(200).json({ message: 'Report updated successfully', report: updatedReport });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update report' });
  }
});


//delete report
// DELETE /api/reports/:id — Delete a report
// DELETE /api/reports/:id — Delete a report by ID
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    // Optional: ensure user owns the report
    if (report.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to delete this report' });
    }

    await Report.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Report deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting report' });
  }
});


module.exports = router;
