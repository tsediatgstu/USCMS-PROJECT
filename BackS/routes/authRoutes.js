const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Make sure this matches your file name

// --- 1. Student Registration ---
// When the frontend hits /api/auth/register
router.post('/register', authController.register);

// --- 2. Combined Login (Admin & Student) ---
// When the frontend hits /api/auth/login
router.post('/login', authController.login);

// --- 3. Authority/Admin Settings ---
// Find a specific student by their ID
router.get('/user/:studentId', authController.getUserByStudentId);

// Update a student's profile (Authority action)
router.put('/update-user/:id', authController.updateUserByAdmin);

module.exports = router;