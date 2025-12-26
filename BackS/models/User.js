const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  attachment: { type: String, default: null }, // Ensure this exists
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Complaint', ComplaintSchema);