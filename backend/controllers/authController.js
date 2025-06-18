let db;

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

    await db.execute(
      'INSERT INTO users (username, email, password) VALUES (?,?,?)',
      [username, email, password]
    );

    res.status(201).json({ message: 'User registered successfully' });
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

    res.status(200).json({ message: 'Login successful', user: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

module.exports = { initDB, signup, login };
