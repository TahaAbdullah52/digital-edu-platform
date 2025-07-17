// controllers/paymentController.js
let db;  
const initDB = connection => { db = connection; };


const getPayments = async (req, res) => {
  const status = req.query.status || 'Pending';
  try {
    const [rows] = await db.execute(`
      SELECT
        p.id,
        p.trxId,
        p.date,
        p.type,
        p.status,
        c.course_fee   AS amount,
        u.userId       AS user_id,
        u.username     AS user_name,
        u.avatar       AS user_avatar,
        c.id           AS course_id,
        c.course_name,
        c.img_url      AS course_img
      FROM payments p
      JOIN users  u ON p.user_id   = u.userId
      JOIN courses c ON p.course_id = c.id
      WHERE p.status = ?
      ORDER BY p.id DESC
    `, [status]);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching payments:", err);
    res.status(500).json({ message: "Error fetching payments" });
  }
};


const getUserPayments = async (req, res) => {
  const userId = req.user.userId;
  try {
    const [rows] = await db.execute(`
      SELECT
        p.id,
        p.trxId,
        p.type,
        DATE(p.date) AS date,
        p.status,
        c.course_fee      AS amount,
        c.course_name     AS course_name,
        c.img_url         AS course_img
      FROM payments p
      JOIN courses c   ON p.course_id = c.id
      WHERE p.user_id = ?
      ORDER BY p.id DESC
    `, [userId]);

    res.status(200).json(rows);
  } catch (err) {
    console.error('Error fetching payments:', err);
    res.status(500).json({ message: 'Error fetching payments' });
  }
};


const createPayment = async (req, res) => {
  const { user_id, course_id, type, trxId} = req.body;
  try {
    const [result] = await db.execute(`
      INSERT INTO payments 
        (user_id, course_id, type, trxId, status)
      VALUES (?, ?, ?, ?, ?)
    `, [user_id, course_id, type, trxId, 'Pending']);
    console.log('Payment created:', result);
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error('Error creating payment:', err);
    res.status(500).json({ message: 'Error creating payment' });
  }
};


const acceptPayment = async (req, res) => {
  const id = req.params.id;
  try {
    const [updateResult] = await db.execute(
      `UPDATE payments SET status = 'Completed' WHERE id = ?`, [id]
    );

    if (updateResult.affectedRows === 0) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    const [[payment]] = await db.execute(
      'SELECT user_id, course_id FROM payments WHERE id = ?',
      [id]
    );

    if (payment) {
      await db.execute(
        'INSERT iGNORE INTO user_course (user_id, course_id) VALUES (?, ?)',
        [payment.user_id, payment.course_id]
      );
      console.log('Payment accepted and user enrolled:', payment);
    }
    return res.json({ success: true, id, status: 'Completed' });
  } catch (err) {
    console.error("Error accepting payment:", err);
    res.status(500).json({ message: "Error accepting payment" });
  }
};


const rejectPayment = async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await db.execute(
      `UPDATE payments SET status = 'Rejected' WHERE id = ?`, [id]
    );
    if (result.affectedRows)
      return res.json({ success: true, id, status: 'Rejected' });
    else
      return res.status(404).json({ message: 'Payment not found' });
  } catch (err) {
    console.error("Error rejecting payment:", err);
    res.status(500).json({ message: "Error rejecting payment" });
  }
};

module.exports = { initDB, getUserPayments, getPayments, acceptPayment, rejectPayment ,createPayment};
