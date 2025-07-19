const express = require('express');
const router = express.Router();
const { signup, login, protectedRoute, verifyToken, updateProfile , uploadProfileImage, getProfile,changePassword, getAllUsers, deleteUser, getLeaderboard} = require('../controllers/authController');
// const upload = require('multer').diskStorage({ destination: 'uploads/', filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)) });  // Multer for file upload
const multer = require('multer');
const path = require('path');


// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');  // Save to 'uploads/' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));  // Generate a unique filename
  }
});

// Create Multer instance with the storage configuration
const upload = multer({ storage: storage });

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', verifyToken, protectedRoute);
router.get('/user/profile', verifyToken, getProfile);
// Add to routes.js (or wherever the routes are defined)
router.post('/profile/update', verifyToken, updateProfile);
router.post('/profile/upload-avatar', verifyToken, upload.single('avatar'), uploadProfileImage);
router.post('/profile/change-password', verifyToken, changePassword);
router.get('/admin/users', getAllUsers);

router.get('/leaderboard', getLeaderboard);
router.delete('/admin/users/:id', deleteUser);



module.exports = router;
