const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    const db = await mysql.createPool({
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT, 
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    });
    console.log('MySQL Connected...');
    return db;
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
