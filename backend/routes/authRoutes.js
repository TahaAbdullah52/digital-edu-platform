const express = require('express');
const router = express.Router();
const { signup, login, protectedRoute, verifyToken } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', verifyToken, protectedRoute);

module.exports = router;
