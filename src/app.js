const express = require('express');
const cors = require('cors');
const bugRoutes = require('./routes/bugRoutes');

const app = express();

// Middleware
app.use(cors()); // Allows your frontend to talk to this API
app.use(express.json()); // Parses incoming JSON requests
app.use(express.static('public')); // Serves the frontend

// Base Route
app.get('/', (req, res) => {
  res.send('Digital Archaeologist API is running!');
});

// Mount the bug routes on the /bugs path
app.use('/bugs', bugRoutes);

// Global Error Handler (catch-all)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong on the server' });
});

module.exports = app;