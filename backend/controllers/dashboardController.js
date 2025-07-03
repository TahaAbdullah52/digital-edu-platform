let db;

// Called from server.js after DB connection is ready
const initDB = (connection) => {
  db = connection;
};

// Get statistical data (total users, courses, enrollments, etc.)
const getDashboardStats = async (req, res) => {
  try {
    const [[result]] = await db.execute(`
      SELECT 
        (SELECT COUNT(*) FROM users) AS totalUsers,
        (SELECT COUNT(*) FROM courses) AS totalCourses,
        (SELECT COUNT(*) FROM user_course) AS coursesEnrolled,
        (SELECT COUNT(*) FROM courses WHERE isPremium = 1) AS premiumEnrolled,
        (SELECT COUNT(*) FROM stories) AS successStories
    `);

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Failed to load stats' });
  }
};

// Get course counts by type (for pie chart)
const getCoursesCounts = async (req, res) => {
  try {
    const [[result]] = await db.execute(`
      SELECT 
        SUM(CASE WHEN isPremium = 0 THEN 1 ELSE 0 END) AS freeCoursesCount,
        SUM(CASE WHEN isPremium = 1 THEN 1 ELSE 0 END) AS premiumCoursesCount
      FROM courses
    `);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching course counts:', error);
    res.status(500).json({ message: 'Failed to load course counts' });
  }
};

// Get top enrolled courses (for bar chart)
const getTopCourses = async (req, res) => {
  try {
    const [results] = await db.execute(`
      SELECT 
        c.course_name,
        COUNT(e.user_id) AS enrollments,
        c.isPremium AS type
      FROM user_course e
      JOIN courses c ON c.id = e.course_id
      GROUP BY e.course_id
      ORDER BY enrollments DESC
      LIMIT 5
    `);

    const topCourses = results.map(row => ({
      course_name: row.course_name,
      enrollments: row.enrollments,
      type: row.type === 1 ? 'premium' : 'free'
    }));

    res.status(200).json({ topCourses });
  } catch (error) {
    console.error('Error fetching top courses:', error);
    res.status(500).json({ message: 'Failed to load top courses' });
  }
};

// Get task counts for actions needed section
const getTaskCounts = async (req, res) => {
  try {
    const [[pending]] = await db.execute(`
      SELECT 
        (SELECT COUNT(*) FROM payments WHERE status = 'Pending') AS payments,
        (SELECT COUNT(*) FROM stories WHERE status = 'pending') AS stories
    `);

    const [[completed]] = await db.execute(`
      SELECT 
        (SELECT COUNT(*) FROM payments WHERE status = 'Confirmed') AS payments,
        (SELECT COUNT(*) FROM stories WHERE status = 'accepted') AS stories
    `);

    res.status(200).json({ pending, completed });
  } catch (error) {
    console.error('Error fetching task counts:', error);
    res.status(500).json({ message: 'Failed to load task data' });
  }
};

module.exports = {
  initDB,
  getDashboardStats,
  getCoursesCounts,
  getTopCourses,
  getTaskCounts
};
