const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  insert_date: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  },
  update_date: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
}, {
  tableName: 'user',  // Menggunakan nama tabel 'user'
  timestamps: false   // Jika tidak menggunakan kolom createdAt dan updatedAt secara otomatis
});

module.exports = User;
