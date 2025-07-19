let db;  
const initDB = connection => { db = connection; };


// Helper function to get course_id from course_name
async function getCourseIdByName(courseName) {
  const [rows] = await db.promise().query(
    'SELECT id FROM courses WHERE course_name = ? LIMIT 1',
    [courseName]
  );
  if (rows.length === 0) throw new Error('Course not found');
  return rows[0].id;
}

const addQuiz = async (req, res) => {
  let { courseName, questions } = req.body;

  if (!courseName || !Array.isArray(questions)) {
    return res.status(400).json({ message: "courseName and questions are required" });
  }

  try {
    const courseId = await getCourseIdByName(courseName);

    const conn = await db.promise().getConnection();
    await conn.beginTransaction();

    // Insert quiz
    const [quizResult] = await conn.query(
      'INSERT INTO quizzes (course_id) VALUES (?)',
      [courseId]
    );
    const quizId = quizResult.insertId;

    // Insert questions and options
    for (const q of questions) {
      const [questionResult] = await conn.query(
        'INSERT INTO questions (quiz_id, question_text, correct_answer_index) VALUES (?, ?, ?)',
        [quizId, q.question, q.correctAnswer]
      );
      const questionId = questionResult.insertId;

      for (let i = 0; i < q.options.length; i++) {
        await conn.query(
          'INSERT INTO options (question_id, option_text, option_index) VALUES (?, ?, ?)',
          [questionId, q.options[i], i]
        );
      }
    }

    await conn.commit();
    conn.release();

    res.status(201).json({ message: 'Quiz added successfully', quizId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Failed to add quiz' });
  }
};



const getQuizByCourseId = async (req, res) => {
  const courseId = req.params.courseId;

  try {
    // 1. Get quiz for the course
    const [quizRows] = await db.promise().query(
      'SELECT quiz_id FROM quizzes WHERE course_id = ?',
      [courseId]
    );

    if (quizRows.length === 0) {
      return res.status(404).json({ message: 'Quiz not found for this course' });
    }

    const quizId = quizRows[0].quiz_id;

    // 2. Get questions for quiz
    const [questionRows] = await db.promise().query(
      'SELECT question_id, question_text, correct_answer_index FROM questions WHERE quiz_id = ?',
      [quizId]
    );

    // 3. Get all options for all questions in one query
    const questionIds = questionRows.map(q => q.question_id);
    let optionRows = [];
    if (questionIds.length > 0) {
      const placeholders = questionIds.map(() => '?').join(',');
      [optionRows] = await db.promise().query(
        `SELECT question_id, option_text, option_index FROM options WHERE question_id IN (${placeholders}) ORDER BY question_id, option_index`,
        questionIds
      );
    }

    // 4. Map options to their questions
    const questions = questionRows.map(q => ({
      question: q.question_text,
      correctAnswer: q.correct_answer_index,
      options: optionRows
        .filter(o => o.question_id === q.question_id)
        .sort((a,b) => a.option_index - b.option_index)
        .map(o => o.option_text)
    }));

    // 5. Return nested structure matching your frontend model
    res.json({
      courseId,
      questions
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch quiz', error });
  }
};

const deleteQuiz = async (req, res) => {
  const quizId = req.params.quizId;

  try {
    const [result] = await db.promise().query(
      'DELETE FROM quizzes WHERE quiz_id = ?',
      [quizId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Due to foreign key with ON DELETE CASCADE,
    // related questions and options will be deleted automatically

    res.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete quiz', error });
  }
};



module.exports = {initDB,addQuiz,getQuizByCourseId,deleteQuiz};