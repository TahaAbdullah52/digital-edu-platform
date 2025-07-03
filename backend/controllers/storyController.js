let db;  
const initDB = connection => { db = connection; };


const submitStory = async (req, res) => {
  const {
    user_name,
    course_name,
    batch_no,
    desc
  } = req.body;

  try {
    // Validate user existence
    const [userRows] = await db.execute('SELECT userId FROM users WHERE name = ?', [user_name]);
    if (userRows.length === 0) {
      return res.status(400).json({ success: false, message: 'User name not found' });
    }
    const userId = userRows[0].userId;

    // Validate course existence
    const [courseRows] = await db.execute('SELECT id FROM courses WHERE course_name = ? AND batch_no = ?', [course_name, batch_no]);
    if (courseRows.length === 0) {
      return res.status(400).json({ success: false, message: 'Course name or batch number not matched' });
    }
    const courseId = courseRows[0].id;

    // Check if user is enrolled in the course
    const [enrollment] = await db.execute('SELECT * FROM user_course WHERE user_id = ? AND course_id = ?', [userId, courseId]);
    if (enrollment.length === 0) {
      return res.status(400).json({ success: false, message: 'Course not taken by user' });
    }

    // Derive avatar from initials (first letter of each word in name)
    const user_avatar = user_name.split(' ').map(word => word[0].toUpperCase()).join('');

    // Insert into stories table
    const submissionDate = new Date().toISOString().split('T')[0];
    const [result] = await db.execute(
      `INSERT INTO stories (name, user_avatar, course_name, batch_no, submissionDate, story, status)
       VALUES (?, ?, ?, ?, ?, ?, 'pending')`,
      [user_name, user_avatar, course_name, batch_no, submissionDate, desc]
    );

    if (result.affectedRows > 0) {
      return res.status(201).json({ success: true, message: 'Story submitted successfully' });
    } else {
      return res.status(500).json({ success: false, message: 'Failed to submit story' });
    }
  } catch (error) {
    console.error('Error submitting story:', error);
    res.status(500).json({ success: false, message: 'Server error during story submission' });
  }
};

// Get all accepted stories
const getAcceptedStories = async (req, res) => {
  try {
    const [stories] = await db.execute('SELECT * FROM stories WHERE status = ?', ['accepted']);
    const mappedStories = stories.map((s) => ({
      id: s.id,
      user_name: s.name,
      user_avatar: s.user_avatar,
      course_name: s.course_name,
      batch_no: s.batch_no,
      submissionDate: s.submissionDate,
      desc: s.story,
      status: s.status
    }));

    res.status(200).json(mappedStories);
  } catch (error) {
    console.error('Error fetching all stories:', error);
    res.status(500).json({ message: 'Failed to fetch stories' });
  }
};





// This is the admin part
const getAllStories = async (req, res) => {
  try {
    const [stories] = await db.execute(`
      SELECT * FROM stories
      ORDER BY submissionDate DESC
    `);

    const mappedStories = stories.map((s) => ({
      id: s.id,
      user_name: s.name,
      user_avatar: s.user_avatar,
      course_name: s.course_name,
      batch_no: s.batch_no,
      submissionDate: s.submissionDate,
      desc: s.story,
      status: s.status
    }));

    res.status(200).json(mappedStories);
  } catch (error) {
    console.error('Error fetching all stories:', error);
    res.status(500).json({ message: 'Failed to fetch stories' });
  }
};
// Accept story by ID
const acceptStory = async (req, res) => {
  const storyId = req.params.id;
  try {
    const [result] = await db.execute('UPDATE stories SET status = ? WHERE id = ?', ['accepted', storyId]);
    if (result.affectedRows > 0) {
      res.status(200).json({ success: true, message: 'Story accepted successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Story not found' });
    }
  } catch (error) {
    console.error('Error accepting story:', error);
    res.status(500).json({ success: false, message: 'Error accepting story' });
  }
};

// Reject story by ID
const rejectStory = async (req, res) => {
  const storyId = req.params.id;
  try {
    const [result] = await db.execute('UPDATE stories SET status = ? WHERE id = ?', ['rejected', storyId]);
    if (result.affectedRows > 0) {
      res.status(200).json({ success: true, message: 'Story rejected successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Story not found' });
    }
  } catch (error) {
    console.error('Error rejecting story:', error);
    res.status(500).json({ success: false, message: 'Error rejecting story' });
  }
};

// Delete story by ID
const deleteStory = async (req, res) => {
  const storyId = req.params.id;
  try {
    const [result] = await db.execute('DELETE FROM stories WHERE id = ?', [storyId]);
    if (result.affectedRows > 0) {
      res.status(200).json({ success: true, message: 'Story deleted successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Story not found' });
    }
  } catch (error) {
    console.error('Error deleting story:', error);
    res.status(500).json({ success: false, message: 'Error deleting story' });
  }
};

module.exports = { initDB, submitStory, getAcceptedStories ,getAllStories, acceptStory, rejectStory, deleteStory };