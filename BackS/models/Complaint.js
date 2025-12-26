const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  attachment: { type: String, default: null },
  status: { type: String, default: 'pending' },
  adminReply: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

// THIS IS THE FIX:
// It checks if the model exists; if not, it creates it.
module.exports = mongoose.models.Complaint || mongoose.model('Complaint', ComplaintSchema);