const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ✅ MUST BE: exports.register
exports.register = async (req, res) => {
    try {
        const { studentId, username, email, password, department } = req.body;
        // ... logic ...
        res.status(201).json({ message: "Registered" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// ✅ MUST BE: exports.login
exports.login = async (req, res) => {
    try {
        const { studentId, password } = req.body;
        // ... logic ...
        res.status(200).json({ message: "Logged in" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// If you want verifyOTP to work, you MUST add it here:
// exports.verifyOTP = async (req, res) => { ... }