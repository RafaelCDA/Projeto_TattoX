const { Sequelize } = require('sequelize');

// Cria a instância do Sequelize para usar o banco SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

// Testa a conexão
sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados foi bem-sucedida.');
    })
    .catch(err => {
        console.error('Não foi possível conectar ao banco de dados:', err);
    });




    
module.exports = sequelize;
