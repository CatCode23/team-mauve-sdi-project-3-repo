const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5002;  // Ensure this is the correct port

// Middleware Setup
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});

// Root Endpoint for Basic Testing
app.get('/', (req, res) => {
  console.log('Root URL hit');
  res.send("API is running.");
});

// Import User Routes
const userRoutes = require('./routes/userRoutes');

// Use User Routes
app.use('/users', userRoutes);  // Mount the user routes at /users

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
