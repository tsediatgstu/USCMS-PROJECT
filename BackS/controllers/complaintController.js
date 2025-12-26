// BackS/controllers/complaintController.js
const Complaint = require('../models/Complaint'); // <--- CHECK THIS LINE

exports.sendComplaint = async (req, res) => {
  try {
    const { studentId, subject, message } = req.body;
    
    const newComplaint = new Complaint({
      studentId,
      subject,
      message,
      attachment: req.file ? req.file.path : null // Multer path
    });

    await newComplaint.save();
    res.status(201).json(newComplaint);
  } catch (err) {
    // THIS LINE IS KEY: It prints the actual error to your terminal
    console.error("SERVER CRASH ERROR:", err.message); 
    res.status(500).json({ error: err.message });
  }
};// BackS/controllers/complaintController.js

// Ensure this exact name is used:
exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// BackS/controllers/complaintController.js

// 1. Ensure the name matches what you use in routes
exports.adminReply = async (req, res) => {
  try {
    const { complaintId, replyText } = req.body;
    
    // Logic to update the database
    const complaint = await Complaint.findByIdAndUpdate(
      complaintId,
      { adminReply: replyText, status: 'resolved' },
      { new: true }
    );

    if (!complaint) return res.status(404).json({ error: "Not found" });

    res.json({ message: "Reply sent!", complaint });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// ... other exports like sendComplaint and adminReply