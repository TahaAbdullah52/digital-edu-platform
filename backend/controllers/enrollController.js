let db;

const initDB = async (connection) => {
  db = connection;
};


const checkEnrollment = async (req, res) => {
  const { userId, courseId } = req.params;

  try {
    const [result] = await db.execute('SELECT * FROM user_course WHERE user_id = ? AND course_id = ?', [userId, courseId]);
    
    if (result.length > 0) {
      // User is enrolled in the course
      res.status(200).json({ isEnrolled: true });
    } else {
      // User is not enrolled
      res.status(200).json({ isEnrolled: false });
    }
  } catch (error) {
    console.error('Error checking enrollment:', error);
    res.status(500).json({ message: 'Error checking enrollment' });
  }
};


const enrollInCourse = async (req, res) => {
  const { userId, courseId } = req.body;

  try {
    // Check if the user is already enrolled in the course
    const [existingEnrollment] = await db.execute('SELECT * FROM user_course WHERE user_id = ? AND course_id = ?', [userId, courseId]);

     if (existingEnrollment.length > 0) {
      return res.status(400).json({ message: 'User is already enrolled in this course' });
    }

    // Check if seats are available
    const [courseData] = await db.execute(
      'SELECT no_of_seat FROM courses WHERE id = ?',
      [courseId]
    );

    if (courseData.length === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const seatsLeft = courseData[0].no_of_seat;

    if (seatsLeft <= 0) {
      return res.status(400).json({ message: 'No seats available for this course' });
    }

    // Insert into user_course table
    await db.execute(
      'INSERT INTO user_course (user_id, course_id) VALUES (?, ?)',
      [userId, courseId]
    );

    // Decrement the no_of_seat by 1
    await db.execute(
      'UPDATE courses SET no_of_seat = no_of_seat - 1 WHERE id = ?',
      [courseId]
    );


    // Update the isEnrolled status for the course
    res.status(201).json({ message: 'User enrolled successfully' });
  } catch (error) {
    console.error('Error enrolling in course:', error);
    res.status(500).json({ message: 'Error enrolling in course' });
  }
};


const getUserCourses = async (req, res) => {
  const userId = Number(req.params.userId);
  try {
    const [rows] = await db.execute(`
      SELECT c.*
      FROM user_course uc
      JOIN courses    c ON uc.course_id = c.id
      WHERE uc.user_id = ?
    `, [userId]);
    // parse `technologies` JSON field on each course
    const courses = rows.map(c => ({
      ...c,
      technologies: c.technologies ? JSON.parse(c.technologies) : []
    }));
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not fetch user courses' });
  }
};




module.exports = {
  initDB,
  checkEnrollment,
  enrollInCourse,
    getUserCourses
};
