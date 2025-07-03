const express = require('express');
const router = express.Router();
const {checkEnrollment, enrollInCourse, getUserCourses} = require('../controllers/enrollController');

// Get all courses
// router.get('/courses', getAllCourses);
router.get('/user_course/check-enrollment/:userId/:courseId', checkEnrollment)

router.post('/user_course/enroll', enrollInCourse);

router.get('/user_courses/:userId', getUserCourses);

module.exports = router;
