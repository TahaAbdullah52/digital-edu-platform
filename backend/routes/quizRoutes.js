const express = require('express');
const router = express.Router();
const {createQuiz, getQuiz, deleteQuiz, quizExists, quizStats, updateUserPoints} = require('../controllers/quizController');


router.post('/courses/:courseId/quiz', createQuiz);
router.get('/courses/:courseId/quiz', getQuiz);
router.delete('/courses/:courseId/quiz', deleteQuiz);
router.get('/courses/:courseId/quiz/exists', quizExists);
router.get('/courses/:courseId/quiz/stats', quizStats);

router.patch('/users/:userId/points', updateUserPoints);



module.exports = router;
