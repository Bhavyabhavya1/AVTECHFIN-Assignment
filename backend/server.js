require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Required to allow requests from your frontend
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');

const app = express();

// Connect to database
connectDB();

// Init Middleware
app.use(express.json());
app.use(cors()); // Allow cross-origin requests

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));