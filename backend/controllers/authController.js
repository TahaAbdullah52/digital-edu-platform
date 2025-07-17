let db;

// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const multer = require('multer');
const path = require('path');
const { get } = require('http');

const initDB = async (connection) => {
  db = connection;
};

// Signup
const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the email already exists in the users table
    const [userExists] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);

    // Check if the email exists in the admin table
    const [adminExists] = await db.execute('SELECT * FROM admins WHERE email = ?', [email]);

    if (userExists.length > 0 || adminExists.length > 0) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // Create a formatted joinDate string (YYYY-MM-DD)
    const joinDate = new Date().toISOString().split('T')[0]; // Format: 'YYYY-MM-DD'
    console.log('Join Date: ',joinDate);

    // Insert the new user, explicitly setting the joinDate as a string
    const [newUser] = await db.execute(
      'INSERT INTO users (username, email, password, joinDate) VALUES (?,?,?,?)',
      [username, email, password, joinDate]
    );

    // Generate JWT token
    const token = jwt.sign(
      { email: email, username: username, userId: newUser.insertId },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      user: { username, email, userId: newUser.insertId },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during signup' });
  }
};


// Login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {

    // Check if the email exists in the users table
    const [userRows] = await db.execute('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);

    // Check if the email exists in the admins table
    const [adminRows] = await db.execute('SELECT * FROM admins WHERE email = ? AND password = ?', [email, password]);


    if (userRows.length === 0 && adminRows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    let user = null;
    let role = 'user'; // Default role

    if (userRows.length > 0) {
      user = userRows[0]; // User exists in the 'users' table
    } else if (adminRows.length > 0) {
      user = adminRows[0]; // User exists in the 'admin' table
      role = 'admin'; // Admin role
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: user.email, username: user.username, role: role , userId: user.userId },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', user, token, role });
  } catch (error) {
    // Log the actual error for debugging purposes
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// Profile Image Upload (Saving file to the backend)
const uploadProfileImage = async (req, res) => {
  try {
    // Check if file is uploaded
    if (!req.file || req.file === undefined) {
      // If no file is uploaded, pass null for avatar
      const userId = req.user.userId;  // Get user ID from JWT token

      // Update the user's avatar to null if no image was uploaded
      const [result] = await db.execute('UPDATE users SET avatar = NULL WHERE userId = ?', [userId]);

      if (result.affectedRows > 0) {
        return res.status(200).json({ message: 'Avatar removed successfully' });
      }

      return res.status(400).json({ message: 'Failed to update avatar' });
    }

    // If the image is uploaded, store it in the database
    const userId = req.user.userId;  // Get user ID from JWT token
    const avatarUrl = '/uploads/' + req.file.filename;  // Path to the uploaded file
    console.log('File uploaded:', avatarUrl);

    // Update the user's avatar with the uploaded image URL
    const [result] = await db.execute('UPDATE users SET avatar = ? WHERE userId = ?', [avatarUrl, userId]);

    if (result.affectedRows > 0) {
      return res.status(200).json({ avatarUrl });  // Respond with the avatar URL
    }

    return res.status(400).json({ message: 'Failed to update avatar' });
  } catch (error) {
    console.error('Error uploading image:', error);
    return res.status(500).json({ message: 'Error uploading image' });
  }
};


// Profile Update (Text-based)
const updateProfile = async (req, res) => {
  const { name, email, primaryNumber, alternativeNumber, countryCode, currentOccupation, skillSector, specificTopic, gender, age, educationalBackground, subject } = req.body;
  
  console.log('JWT User Object:', req.user);
  
  const userId = req.user.userId;  // User ID from JWT token
  console.log('User ID for update:', userId);
  try {
    // Update user profile data in the database, only updating the fields provided
    const [result] = await db.execute(
      `UPDATE users SET name = COALESCE(?, name), email = COALESCE(?,email), primaryNumber = COALESCE(?, primaryNumber), alternativeNumber = COALESCE(?, alternativeNumber), countryCode = COALESCE(?, countryCode), currentOccupation = COALESCE(?, currentOccupation), skillSector = COALESCE(?, skillSector), specificTopic = COALESCE(?, specificTopic), gender = COALESCE(?, gender), age = COALESCE(?, age), educationalBackground = COALESCE(?, educationalBackground), subject = COALESCE(?, subject) WHERE userId = ?`,
      [name, email, primaryNumber, alternativeNumber, countryCode, currentOccupation, skillSector, specificTopic, gender, age, educationalBackground, subject, userId]
    );

    console.log('Update result:', result);

    if (result.affectedRows > 0) {
      return res.status(200).json({ message: 'Profile updated' });
    }

    return res.status(400).json({ message: 'Failed to update profile' });
  } catch (error) {
    console.error('Error during profile update:', error);
    return res.status(500).json({ message: 'Server error during profile update' });
  }
};


// Controller for fetching the user profile based on JWT userId
const getProfile = async (req, res) => {
  const userId = req.user.userId;  // Extract userId from the JWT token

  try {
    // Query the database to get user details using the userId
    const [user] = await db.execute(`
      SELECT 
        userId, name, avatar, primaryNumber, alternativeNumber, email
        countryCode, currentOccupation, skillSector, specificTopic, 
        gender, age, educationalBackground, subject, joinDate
      FROM users WHERE userId = ?`, [userId]);

    if (user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send back the user profile data
    res.status(200).json(user[0]);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error during profile fetch' });
  }
};


// Change Password
const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.userId; // Get the user ID from the JWT token
  console.log('User ID for password change:', userId);
  console.log('Old Password:', oldPassword);
  try {
    // Check if the old password is correct
   
    const [user1] = await db.execute('SELECT * FROM users WHERE userId = ?', [userId]);

    if (user1.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user1[0].password !== oldPassword) {
      return res.status(400).json({ message: 'Old password is incorrect' });
    }

    // Update the password
    const [result1] = await db.execute(
      'UPDATE users SET password = ? WHERE userId = ?',
      [newPassword, userId]
    );

    if (result1.affectedRows > 0) {
      return res.status(200).json({ message: 'Password changed successfully' });
    } else {
      return res.status(400).json({ message: 'Failed to change password' });
    }
  } catch (error) {
    console.error('Error changing password:', error);
    return res.status(500).json({ message: 'Server error during password change' });
  }
};



const getAllUsers = async (req, res) => {
  const filter = req.query.filter || 'all';

  try {
    let query = 'SELECT * FROM users';
    let params = [];

    if (filter !== 'all') {
      query += ' WHERE status = ?';
      params.push(filter);
    }

    const [users] = await db.execute(query, params);

    // Enrich each user with coursesEnrolled and totalSpent
    for (const user of users) {
      const [courseRows] = await db.execute(
        `SELECT uc.course_id, c.course_fee
         FROM user_course uc
         JOIN courses c ON uc.course_id = c.id
         WHERE uc.user_id = ?`,
        [user.userId]
      );

      user.coursesEnrolled = courseRows.length;
      user.totalSpent = courseRows.reduce((sum, row) => sum + Number(row.course_fee || 0), 0); // Ensure numeric summation
    }
    const mappedUsers = users.map(user => ({
      ...user,
      id: user.userId,
      userId: undefined // Or remove if unnecessary
    }));

    res.status(200).json({ users: mappedUsers });
  } catch (error) {
    console.error('Error fetching users with stats:', error);
    res.status(500).json({ message: 'Failed to load users' });
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  const userId = req.params.id;
  console.log('Deleting user with ID:', userId);

  try {
    const [result] = await db.execute('DELETE FROM users WHERE userId = ?', [userId]);

    if (result.affectedRows > 0) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ success: false, message: 'Error deleting user' });
  }
};



// Protected Route (Requires JWT)
const protectedRoute = (req, res) => {
  res.status(200).json({ message: 'Protected route accessed', user: req.user });
};

// Middleware to protect routes
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') 
    ? authHeader.slice(7) 
    : authHeader;

  if (!token) {
    return res.status(403).json({ message: 'Token is required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    console.log("Decoded Token:", decoded);
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = decoded; // Attach user data to the request object
    next();  // Proceed to the next middleware/route handler
  });
};


module.exports = { initDB, signup, login ,protectedRoute, verifyToken, updateProfile, uploadProfileImage, getProfile, changePassword, getAllUsers, deleteUser };
