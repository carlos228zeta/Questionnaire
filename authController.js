const User = require('../models/user');
const bcrypt = require('bcrypt'); // Tambahkan bcrypt untuk hash password

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verifikasi password
    const isPasswordValid = (user.password == password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Login berhasil
    res.json({ message: 'Login successful', userId: user.id });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};
