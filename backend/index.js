const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const { initDB } = require('./controllers/authController');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const startServer = async () => {
  const db = await connectDB();       // connect to MySQL
  initDB(db);                         // inject db into controllers

  app.use('/api', authRoutes);        // use auth routes

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
