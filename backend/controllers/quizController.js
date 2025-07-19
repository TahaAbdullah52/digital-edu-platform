let db;  
const initDB = (connection) => {
  db = connection;
};


// Create Quiz
const createQuiz = async (req, res) => {
  const courseId = parseInt(req.params.courseId);
  const { questions } = req.body;

  if (!Array.isArray(questions) || questions.length === 0) {
    return res.status(400).json({ success: false, message: 'Invalid quiz data' });
  }

  try {
    // 1. Insert quiz row
    const [quizResult] = await db.query('INSERT INTO quizzes (course_id) VALUES (?)', [courseId]);
    const quizId = quizResult.insertId;

    // 2. Insert each question and its options
    for (const q of questions) {
      const [questionResult] = await db.query(
        'INSERT INTO questions (quiz_id, question_text, correct_answer_index) VALUES (?, ?, ?)',
        [quizId, q.question, q.correctAnswer]
      );
      const questionId = questionResult.insertId;

      // 3. Insert each option
      for (let i = 0; i < q.options.length; i++) {
        await db.query(
          'INSERT INTO options (question_id, option_text, option_index) VALUES (?, ?, ?)',
          [questionId, q.options[i], i]
        );
      }
    }

    res.status(201).json({ success: true, message: 'Quiz created successfully' });
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ success: false, message: 'Failed to create quiz' });
  }
};

// Get Quiz
const getQuiz = async (req, res) => {
  const courseId = parseInt(req.params.courseId);

  try {
    const [quizRow] = await db.query('SELECT quiz_id FROM quizzes WHERE course_id = ?', [courseId]);
    if (quizRow.length === 0) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    const quizId = quizRow[0].quiz_id;

    const [questions] = await db.query('SELECT * FROM questions WHERE quiz_id = ?', [quizId]);

    for (let q of questions) {
      const [options] = await db.query('SELECT option_text FROM options WHERE question_id = ? ORDER BY option_index ASC', [q.question_id]);
      q.options = options.map(o => o.option_text);
    }

    res.json({
      courseId,
      questions: questions.map(q => ({
        question: q.question_text,
        correctAnswer: q.correct_answer_index,
        options: q.options
      }))
    });
  } catch (error) {
    console.error('Error fetching quiz:', error);
    res.status(500).json({ message: 'Failed to fetch quiz' });
  }
};

// Delete Quiz
const deleteQuiz = async (req, res) => {
  const courseId = parseInt(req.params.courseId);

  try {
    const [quizRow] = await db.query('SELECT quiz_id FROM quizzes WHERE course_id = ?', [courseId]);
    if (quizRow.length === 0) return res.status(404).json({ message: 'Quiz not found' });

    const quizId = quizRow[0].quiz_id;

    // Delete options
    await db.query('DELETE FROM options WHERE question_id IN (SELECT question_id FROM questions WHERE quiz_id = ?)', [quizId]);
    // Delete questions
    await db.query('DELETE FROM questions WHERE quiz_id = ?', [quizId]);
    // Delete quiz
    await db.query('DELETE FROM quizzes WHERE quiz_id = ?', [quizId]);

    res.json({ success: true, message: 'Quiz deleted successfully' });
  } catch (error) {
    console.error('Error deleting quiz:', error);
    res.status(500).json({ success: false, message: 'Failed to delete quiz' });
  }
};

// Check if Quiz Exists
const quizExists = async (req, res) => {
  const courseId = parseInt(req.params.courseId);

  try {
    const [result] = await db.query('SELECT 1 FROM quizzes WHERE course_id = ? LIMIT 1', [courseId]);
    res.json({ exists: result.length > 0 });
  } catch (error) {
    res.status(500).json({ exists: false });
  }
};

// Get Quiz Stats
 const quizStats = async (req, res) => {
  const courseId = parseInt(req.params.courseId);

  try {
    const [[{ count }]] = await db.query(`
      SELECT COUNT(*) AS count FROM questions 
      WHERE quiz_id = (SELECT quiz_id FROM quizzes WHERE course_id = ?)
    `, [courseId]);

    const [[{ course_name }]] = await db.query(`SELECT course_name FROM courses WHERE id = ?`, [courseId]);

    res.json({ totalQuestions: count, courseName: course_name });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load quiz statistics' });
  }
};




const updateUserPoints = async (req, res) => {
  const userId = req.params.userId;
  const { points } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE userId= ?', [userId]);
    if (rows.length === 0) {
      return res.status(404).send({ error: 'User not found' });
    }

    const currentPoints = rows[0].points;
    const updatedPoints = currentPoints + points;

    await db.query('UPDATE users SET points = ? WHERE userId = ?', [updatedPoints, userId]);

    res.send({ success: true, totalPoints: updatedPoints });
  } catch (err) {
    console.error('Error updating user points:', err);
    res.status(500).send({ error: 'Failed to update points' });
  }
};


// controllers/courseController.js
// const getCourseIdByName = async (req, res) => {
//   const { courseName } = req.params;

//   try {
//     const [rows] = await db.query(
//       'SELECT id FROM courses WHERE course_name = ?',
//       [courseName]
//     );

//     if (rows.length > 0) {
//       res.json({ success: true, courseId: rows[0].id });
//     } else {
//       res.status(404).json({ success: false, message: 'Course not found' });
//     }
//   } catch (err) {
//     console.error('Error fetching courseId:', err);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };




module.exports = {initDB, createQuiz, getQuiz, deleteQuiz, quizExists, quizStats, updateUserPoints};