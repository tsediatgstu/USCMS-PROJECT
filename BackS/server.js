const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs'); // Added for folder management
const connectDB = require('./config/db');

// 1. Load Environment Variables
dotenv.config();

// 2. Initialize App
const app = express();

// --- PROFESSIONAL ADDITION: Ensure Uploads Directory Exists ---
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// 3. Connect to Database
connectDB();

// 4. Middleware

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Serve static files (Profile pictures or Complaint attachments)
app.use('/uploads', express.static(uploadDir));

// Clean Request Logger
app.use((req, res, next) => {
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] ${req.method} ${req.url}`);
  next();
});

// 5. Routes
const authRoutes = require('./routes/authRoutes');
const complaintRoutes = require('./routes/complaintRoutes');

// 6. API Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: "online", 
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
  });
});

// 7. Admin Auth (Professionalized response)
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === "Admin" && password === "123@") {
    return res.status(200).json({ 
      success: true, 
      role: 'admin', 
      token: "admin-access-token-2025"
    });
  }
  return res.status(401).json({ success: false, message: "Invalid credentials" });
});

// 8. Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error' 
  });
});

// 9. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n-----------------------------------------`);
  console.log(` USCMS Service Running: ${PORT}`);
  console.log(` Status: Active`);
  console.log(`-----------------------------------------\n`);
});