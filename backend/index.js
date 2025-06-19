const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const { initDB } = require('./controllers/authController');

dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET','PUT','POST','DELETE'],
    credentials: true
}));

app.use(express.json());

const startServer = async () => {
  const db = await connectDB();       // connect to MySQL
  initDB(db);                         // inject db into controllers

  app.use('/api', authRoutes);        // use auth routes

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
