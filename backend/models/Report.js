const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  issueType: {
    type: String,
    required: true,
    enum: ['Shortage', 'Overpricing', 'Corruption', 'Other'],
  },
  shopName: {
    type: String,
    default: '',
  },
  location: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    default: '',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Report', reportSchema);
