const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const Complaint = require('../models/Complaint');

// The 'attachment' string must match the field name in your Frontend FormData
router.post('/create', upload.single('attachment'), async (req, res) => {
  try {
    const { subject, message, studentId } = req.body;
    
    const newComplaint = new Complaint({
      subject,
      message,
      studentId,
      attachment: req.file ? req.file.path : null, // Save the file path
      status: 'pending'
    });

    const savedComplaint = await newComplaint.save();
    
    // Professional success response
    res.status(201).json(savedComplaint);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Complaint was not sent successfully.' });
  }
});