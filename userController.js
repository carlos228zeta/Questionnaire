const bcrypt = require('bcrypt');
const User = require('../models/user');  // Pastikan untuk meng-import model User

exports.addUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Hash password
    // const hashedPassword = await bcrypt.hash(password, 10);
    
    // Cetak password mentah untuk debugging (hapus ini di produksi)
    console.log(password);

    // Insert data user ke database menggunakan model User
    const newUser = await User.create({ 
      email, 
      password: password
    });

    res.json(newUser); // Kirim response dengan user baru yang ditambahkan
  } catch (err) {
    console.error(err); // Tampilkan error di console untuk debugging
    res.status(500).json({ message: 'Error creating user', error: err });
  }
};
