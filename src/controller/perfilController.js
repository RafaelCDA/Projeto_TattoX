const Usuario = require('../models/usuario');

function indexView(req, res) {
    res.render('index.html');
}

function loginView(req, res) {
    res.render('login.html');
}

function cadastroView(req, res) {
    res.render('cadastro.html', {
        success_msg: req.query.success || '',
        error_msg: req.query.error || ''
    });
}

async function handleCadastro(req, res) {
    const { email, password, userType } = req.body;

    try {
        await Usuario.create({ email, password, userType });
        res.redirect('/login?success=Cadastro realizado com sucesso!');
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.redirect('/cadastro?error=Email já está sendo usado.');
        } else {
            console.error('Erro ao cadastrar usuário:', error);
            res.status(500).send('Erro ao cadastrar usuário');
        }
    }
}

function handleLogin(req, res) {
    res.redirect('/');
}

module.exports = {
    indexView,
    loginView,
    cadastroView,
    handleCadastro,
    handleLogin
};
