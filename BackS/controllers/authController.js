const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// --- INTERNAL HELPER: Email Transporter ---
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// --- 1. STUDENT REGISTRATION ---
exports.register = async (req, res) => {
  try {
    const { studentId, username, email, password, department } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Student already registered with this email." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      studentId,
      username,
      email,
      password: hashedPassword,
      department,
      role: 'student'
    });

    await newUser.save();
    res.status(201).json({ message: "Student registered successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- 2. COMBINED LOGIN (Admin + Student) ---
exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Admin Logic (Hardcoded)
    if (role === 'admin') {
      if (email === 'tsediatgstu@gmail.com' && password === '123@') {
        return res.status(200).json({
          message: "Login Successfully",
          user: { email, role: 'admin' },
          token: "admin-token-2025"
        });
      }
      return res.status(401).json({ message: "Invalid Admin Credentials" });
    }

    // Student Logic (Database)
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Please register first!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials. Please input correct info." });

    const token = jwt.sign({ id: user._id, role: 'student' }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });

    res.json({
      message: "Login Successfully",
      token,
      user: { id: user._id, username: user.username, email: user.email, role: 'student' }
    });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

// --- 3. FORGOT PASSWORD (OTP Generation) ---
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found with this email." });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetOTP = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 Minutes
    await user.save();

    await transporter.sendMail({
      from: '"USCMS Support" <support@uscms.edu>',
      to: email,
      subject: "Your Password Reset OTP",
      html: `<h2>Password Reset</h2><p>Your OTP is: <b>${otp}</b></p>`
    });

    res.json({ success: true, message: "OTP sent to your Gmail!" });
  } catch (err) {
    res.status(500).json({ message: "Error sending OTP." });
  }
};

// --- 4. RESET PASSWORD (OTP Verification) ---
exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  try {
    const user = await User.findOne({ 
      email, 
      resetOTP: otp, 
      otpExpires: { $gt: Date.now() } 
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired OTP." });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetOTP = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.json({ message: "Password updated successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server error." });
  }
};

// --- 5. ADMIN TOOLS (Find & Update) ---
exports.getUserByStudentId = async (req, res) => {
  try {
    const user = await User.findOne({ studentId: req.params.studentId }).select('-password');
    if (!user) return res.status(404).json({ message: "Student ID not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateUserByAdmin = async (req, res) => {
  try {
    const { name, password } = req.body;
    const updateData = {};
    if (name) updateData.username = name;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: updateData }, { new: true });
    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.json({ message: "Profile updated successfully by Authority!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};