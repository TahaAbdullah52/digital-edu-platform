const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const enrollRoutes = require('./routes/enrollRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const { initDB: initPaymentDB } = require('./controllers/paymentController');
const { initDB: initAuthDB } = require('./controllers/authController');  // Rename initDB from authController
const { initDB: initCourseDB } = require('./controllers/courseController');  // Rename initDB from courseController
const { initDB: initEnrollDB } = require('./controllers/enrollController');
const storyRoutes = require('./routes/storyRoutes');
const { initDB: initStoryDB } = require('./controllers/storyController');  // Rename
const { initDB: initDashboardDB } = require('./controllers/dashboardController');  // Rename initDB from dashboardController
const path = require('path');

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
  initAuthDB(db);   
  initCourseDB(db);                     
  initEnrollDB(db);  
  initPaymentDB(db);  
  initStoryDB(db);                // initialize payment controller with db connection                     
  initDashboardDB(db);            // initialize dashboard controller with db connection


  app.use('/api', authRoutes);        // use auth routes// use profile routes
  app.use('/api',courseRoutes);
  app.use('/api',enrollRoutes);
  app.use('/api', paymentRoutes);     // use payment routes
  app.use('/api', storyRoutes);
  app.use('/api', dashboardRoutes);   // use dashboard routes
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


startServer();
