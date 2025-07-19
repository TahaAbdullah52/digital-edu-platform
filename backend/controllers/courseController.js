let db;

const initDB = async (connection) => {
  db = connection;
  await updateRemainingDaysForCourses();
};


const updateRemainingDaysForCourses = async () => {
  try {
    const [courses] = await db.execute('SELECT id, created_at, rem_days FROM courses');

    const updates = courses.map(async (course) => {
      const createdAt = new Date(course.created_at);
      const today = new Date();
      
      const daysPassed = Math.floor((today - createdAt) / (1000 * 60 * 60 * 24));
      const totalDuration = course.rem_days || 0;

      const remDays = Math.max(totalDuration - daysPassed, 0); // avoid negative values
      // console.log(`Course ID: ${course.id}, Created At: ${createdAt}, Days Passed: ${daysPassed}, Remaining Days: ${remDays}`);
      // Update rem_days for this course
      await db.execute('UPDATE courses SET rem_days = ? WHERE id = ?', [remDays, course.id]);
    });

    await Promise.all(updates);
    console.log("Remaining days updated for all courses.");
  } catch (error) {
    console.error("Error updating remaining days:", error);
  }
};


// Helper function to get cate_id from category title
const getCategoryIdByTitle = async (categoryTitle) => {
  try {
    const [category] = await db.execute('SELECT cate_id FROM categories WHERE title = ?', [categoryTitle]);
    if (category.length === 0) {
      throw new Error('Category not found');
    }
    return category[0].cate_id;
  } catch (error) {
    console.error('Error fetching category by title:', error);
    throw new Error('Error fetching category');
  }
};

// Helper function to safely stringify technologies
const safeTechnologiesStringify = (technologies) => {
  if (!technologies) return null;
  
  // If it's already a string, return as is
  if (typeof technologies === 'string') {
    try {
      // Validate it's valid JSON
      JSON.parse(technologies);
      return technologies;
    } catch (error) {
      console.error('Invalid JSON string for technologies:', technologies);
      return null;
    }
  }
  
  // If it's an array or object, stringify it
  if (typeof technologies === 'object') {
    return JSON.stringify(technologies);
  }
  
  return null;
};


// Get all courses
const getAllCourses = async (req, res) => {
  try {
    // SQL query to join the courses with the categories table based on cate_id
    const query = `
      SELECT courses.id, courses.img_url, courses.batch_nO, courses.no_of_seat, 
             courses.rem_days, courses.course_name, courses.course_desc, courses.no_of_class, 
             courses.playlistId, courses.isPremium, courses.isEnrolled, courses.course_fee, 
             courses.technologies, categories.title AS category
      FROM courses
      LEFT JOIN categories ON courses.cate_id = categories.cate_id
    `;

    const [courses] = await db.execute(query);

    const mappedCourses = courses.map(course => {
      // Parse the technologies field to ensure it's an array
      const technologies = course.technologies ? JSON.parse(course.technologies) : [];

      return {
        ...course,
        id: course.id, 
        category: course.category, 
        technologies: technologies 
      };
    });
    // Return the courses with category title
    res.status(200).json(mappedCourses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Error fetching courses' });
  }
};

// Backend: Get course by ID API
const getCourseById = async (req, res) => {
  const courseId = req.params.id; // Get the course ID from the request parameters
  console.log(`Fetching course with ID: ${courseId}`);
  
  try {
        const [results] = await db.execute('SELECT * FROM courses WHERE id = ?', [courseId]);

      if (results.length > 0) {
        const course = results[0]; // Get the first result (there should only be one course)

        // Parse the technologies field to ensure it's an array
      const technologies = course.technologies ? JSON.parse(course.technologies) : [];

      course.technologies = technologies; // Update the technologies field
      
        res.status(200).json(course); // Send the course details as JSON
      } else {
        res.status(404).send('Course not found'); // Send 404 if no course is found
      }
  } catch (error) {
    console.error('Error in getCourseById:', error);
    res.status(500).send('Error processing request');
  }
};


// Create a new course
const createCourse = async (req, res) => {
  const { 
    img_url, batch_nO, no_of_seat, rem_days, course_name, course_desc,
    no_of_class, category, playlistId, isPremium, isEnrolled, course_fee, technologies
  } = req.body;

  console.log("Received course data:", req.body);
  console.log("Technologies type:", typeof technologies);
  console.log("Technologies value:", technologies);
  try {
    // if (!img_url || !batch_nO || !no_of_seat || !rem_days || !course_name || !course_desc || !no_of_class || !category) {
    //   return res.status(400).json({ message: 'Required fields are missing:' });
    // }

    // Get the cate_id based on the category title
    const cate_id = await getCategoryIdByTitle(category);
    const created_at = new Date().toISOString().slice(0, 19).replace('T', ' '); // Get current date and time in MySQL format

    // Insert the new course into the database
    const query = `
      INSERT INTO courses (img_url, batch_nO, no_of_seat, rem_days, course_name, course_desc, no_of_class, created_at, cate_id, playlistId, isPremium, isEnrolled, course_fee, technologies)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute(query, [
      img_url, batch_nO, no_of_seat, rem_days, course_name, course_desc,
      no_of_class, created_at, cate_id, playlistId,
      isPremium !== undefined ? isPremium : false, // Default to `false` if not provided
      isEnrolled !== undefined ? isEnrolled : false, // Default to `false` if not provided
      course_fee || 0, // If course_fee is not provided, set it to null
      safeTechnologiesStringify(technologies) // If technologies is not provided, set it to null
    ]);

    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ message: 'Error creating course' });
  }
};

// Update a course
const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { 
    img_url, batch_nO, no_of_seat, rem_days, course_name, course_desc,
    no_of_class, category, playlistId, isPremium, isEnrolled, course_fee, technologies
  } = req.body;
  console.log("Received course data:", req.body);
  console.log("Technologies type:", typeof technologies);
  console.log("Technologies value:", technologies);

  try {
    // Get the cate_id based on the category title
    const cate_id = await getCategoryIdByTitle(category);

    // Set missing optional fields to null (or a default value if needed)
    const query = `
      UPDATE courses
      SET img_url = ?, batch_nO = ?, no_of_seat = ?, rem_days = ?, course_name = ?, course_desc = ?, no_of_class = ?, cate_id = ?, playlistId = ?, isPremium = ?, isEnrolled = ?, course_fee = ?, technologies = ?
      WHERE id = ?
    `;
    
    const [result] = await db.execute(query, [
      img_url, batch_nO, no_of_seat, rem_days, course_name, course_desc,
      no_of_class, cate_id, playlistId,
      isPremium !== undefined ? isPremium : false, // Default to `false` if not provided
      isEnrolled !== undefined ? isEnrolled : false, // Default to `false` if not provided
      course_fee || null, // If course_fee is not provided, set it to null
      safeTechnologiesStringify(technologies), // If technologies is not provided, set it to null
      id
    ]);

    if (result.affectedRows > 0) {
      res.status(200).json({ id, ...req.body });
    } else {
      res.status(400).json({ message: 'Course not found or no changes made' });
    }
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ message: 'Error updating course' });
  }
};

// Delete a course
const deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.execute('DELETE FROM courses WHERE id = ?', [id]);

    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Course deleted successfully' });
    } else {
      res.status(400).json({ message: 'Course not found' });
    }
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ message: 'Error deleting course' });
  }
};



module.exports = {
  initDB,
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseById
};
