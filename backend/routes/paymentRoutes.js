// routes/adminRoutes.js
const express = require('express');
const {getPayments,acceptPayment,rejectPayment,createPayment, getUserPayments} = require('../controllers/paymentController');
const router = express.Router();
const { verifyToken } = require('../controllers/authController');

router.get  ('/admin/payments',getPayments);
router.post ('/admin/payments/:id/accept', acceptPayment);
router.post ('/admin/payments/:id/reject', rejectPayment);
router.post ('/user/payments',createPayment);
router.get('/user/payments', verifyToken, getUserPayments);

module.exports = router;
