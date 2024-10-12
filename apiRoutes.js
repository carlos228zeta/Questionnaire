const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.post('/users', userController.addUser);
router.post('/login', authController.login); // Tambahkan route ini

module.exports = router;
