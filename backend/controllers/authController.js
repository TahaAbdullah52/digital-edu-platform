let db;

// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const initDB = async (connection) => {
  db = connection;
};

// Signup
const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const [userExists] = await db.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (userExists.length > 0) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // const hashedPassword = await bcrypt.hash(password, 10);

    await db.execute(
      'INSERT INTO users (username, email, password) VALUES (?,?,?)',
      [username, email, password]
    );

     // Generate JWT token
    const token = jwt.sign(
      { email: email, username: username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({ message: 'User registered successfully',token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during signup' });
  }
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.execute(
      'SELECT * FROM users WHERE email = ? AND password = ?',
      [email, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: user.email, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', user: rows[0] ,token});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during login' });
  }
};


// Protected Route (Requires JWT)
const protectedRoute = (req, res) => {
  res.status(200).json({ message: 'Protected route accessed', user: req.user });
};

// Middleware to protect routes
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token is required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = decoded; // Attach user data to the request object
    next();  // Proceed to the next middleware/route handler
  });
};

module.exports = { initDB, signup, login ,protectedRoute, verifyToken};
