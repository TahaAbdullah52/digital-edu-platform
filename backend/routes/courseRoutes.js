const express = require('express');
const router = express.Router();
const { getAllCourses, createCourse, updateCourse, deleteCourse ,getCourseById} = require('../controllers/courseController');

// Get all courses
router.get('/courses', getAllCourses);

router.get('/course/:id', getCourseById);

// Create a new course
router.post('/courses', createCourse);

// Update an existing course
router.put('/courses/:id', updateCourse);

// Delete a course
router.delete('/courses/:id', deleteCourse);

module.exports = router;
