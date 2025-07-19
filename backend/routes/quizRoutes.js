const express = require('express');
const router = express.Router();
const {addQuiz, getQuizByCourseId, deleteQuiz} = require('../controllers/quizController');

router.post('/add', addQuiz);
router.get('/course/:courseId', getQuizByCourseId);
router.delete('/:quizId', deleteQuiz);

module.exports = router;
