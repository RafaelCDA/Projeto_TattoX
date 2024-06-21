const { Sequelize, DataTypes } = require('sequelize');
const database = require('../db');

const Usuario = database.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
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
    userType: {
        type: DataTypes.ENUM('usuario', 'tatuador'),
        allowNull: false
    }
});

module.exports = Usuario;
