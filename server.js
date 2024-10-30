// server.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const taskRoutes = require('./Routes/taskRoutes');
const listRoutes = require('./Routes/listRoutes'); // Assuming you also have list routes

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Error connecting to MongoDB:', error));

app.use('/api/tasks', taskRoutes); // Use task routes
app.use('/api/lists', listRoutes); // Use list routes

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
