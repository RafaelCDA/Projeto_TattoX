// perfilController.js
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
    const { nome, email, password, userType } = req.body;

    try {
        await Usuario.create({ nome, email, password, userType });
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

async function handleLogin(req, res) {
    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ where: { email } });
        if (usuario) {
            if (usuario.password === password) {
                // Lógica de autenticação (ex.: iniciar uma sessão)
                res.redirect('/');
            } else {
                res.redirect('/login?error=Senha incorreta.');
            }
        } else {
            res.redirect('/login?error=Usuário não encontrado.');
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).send('Erro ao fazer login');
    }
}

async function handleImageUpload(req, res) {
    const user = req.session.user;

    if (user && user.userType === 'tatuador') {
        if (!req.file) {
            return res.status(400).send('Nenhuma imagem enviada');
        }
        const imageUrl = path.join('/uploads', req.file.filename);
        // Aqui você pode salvar imageUrl no banco de dados associado ao usuário se necessário
        res.send(`Imagem enviada com sucesso: ${imageUrl}`);
    } else {
        res.status(403).send('Acesso negado. Somente tatuadores podem enviar imagens.');
    }
}


async function bancoView(req, res) {
    try {
        const usuarios = await Usuario.findAll();
        res.render('banco.html', { usuarios });
    } catch (error) {
        console.error('Erro ao visualizar banco de dados:', error);
        res.status(500).send('Erro ao visualizar banco de dados');
    }
}

module.exports = {
    indexView,
    loginView,
    cadastroView,
    handleCadastro,
    handleLogin,
    handleImageUpload,
    bancoView
};
