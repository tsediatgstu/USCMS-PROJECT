
const express = require('express');
const router = express.Router();
// Import the whole controller object to avoid undefined errors
const complaintController = require('../controllers/complaintController');
const { protectAdmin } = require('../middleware/authMiddleware');

// 1. Student sends a complaint
router.post('/send', complaintController.sendComplaint);

// 2. Admin gets all (THIS WAS LIKELY LINE 14 CAUSING THE ERROR)
// Make sure complaintController.getAllComplaints exists!
router.get('/all', protectAdmin, complaintController.getAllComplaints);

// 3. Admin replies
router.put('/reply/:id', protectAdmin, complaintController.adminReply);

module.exports = router;