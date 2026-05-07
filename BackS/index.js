const express = require('express');
const cors = require('cors'); // 1. Import it at the top
const app = express();

// 2. Place it here (Middlewares)
app.use(cors()); 
app.use(express.json());

// 3. Your routes come AFTER the cors line
app.use('/api/complaints', complaintRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));