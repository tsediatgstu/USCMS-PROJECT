const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');

router.post('/send', complaintController.sendComplaint);
router.get('/all', complaintController.getAllComplaints);        // ← removed protectAdmin
router.put('/reply/:id', complaintController.adminReply);

module.exports = router;