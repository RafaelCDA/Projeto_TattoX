const { Sequelize, DataTypes } = require('sequelize');
const database = require('../db');

const Usuario = database.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
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
    },
    localTrabalho: {
        type: DataTypes.STRING,
        allowNull: true
    },
    precoTatuagens: {
        type: DataTypes.STRING,
        allowNull: true
    },
    estilosDesenhos: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = Usuario;
