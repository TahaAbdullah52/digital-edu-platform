const express = require('express');
const router = express.Router();
const { getDashboardStats, getCoursesCounts, getTaskCounts, getTopCourses} = require('../controllers/dashboardController');

router.get('/stats',getDashboardStats);
router.get('/courses-count',getCoursesCounts);
router.get('/top-courses', getTopCourses);
router.get('/task-counts', getTaskCounts);

module.exports = router;
