// src/controller/perfilController.js
const Usuario = require('../models/usuario');

function indexView(req, res) {
    const userName = req.session && req.session.user ? req.session.user.nome : null;
    res.render('index.html', { userName });
}

function loginView(req, res) {
    res.render('login.html', {
        success_msg: req.query.success || '',
        error_msg: req.query.error || ''
    });
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
                // Salva o nome do usuário na sessão
                req.session.user = {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email
                };
                res.redirect('/');
            } else {
                res.redirect('/login?error=Senha incorreta.');
            }
        } else {
            res.redirect('/login?error=Não existe uma conta com esse email.');
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).send('Erro ao fazer login');
    }
}

function logout(req, res) {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Erro ao fazer logout');
        }
        res.redirect('/');
    });
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

function configView(req, res) {
    res.render('config.html');
}

function redefinirSenhaView(req, res) {
    res.render('redefinir-senha.html');
}

async function handleRedefinirSenha(req, res) {
    const { email, novaSenha } = req.body;

    try {
        const usuario = await Usuario.findOne({ where: { email } });
        if (usuario) {
            usuario.password = novaSenha;
            await usuario.save();
            res.redirect('/config?success=Senha redefinida com sucesso!');
        } else {
            res.redirect('/redefinir-senha?error=Usuário não encontrado.');
        }
    } catch (error) {
        console.error('Erro ao redefinir senha:', error);
        res.status(500).send('Erro ao redefinir senha');
    }
}

function redefinirNomeView(req, res) {
    res.render('redefinir-nome.html');
}

async function handleRedefinirNome(req, res) {
    const { email, novoNome } = req.body;

    try {
        const usuario = await Usuario.findOne({ where: { email } });
        if (usuario) {
            usuario.nome = novoNome;
            await usuario.save();
            // Atualizar a sessão com o novo nome de usuário
            if (req.session.user && req.session.user.email === email) {
                req.session.user.nome = novoNome;
            }
            res.redirect('/config?success=Nome de usuário redefinido com sucesso!');
        } else {
            res.redirect('/redefinir-nome?error=Usuário não encontrado.');
        }
    } catch (error) {
        console.error('Erro ao redefinir nome:', error);
        res.status(500).send('Erro ao redefinir nome');
    }
}

module.exports = {
    indexView,
    loginView,
    cadastroView,
    handleCadastro,
    handleLogin,
    logout,
    handleImageUpload,
    bancoView,
    configView,
    redefinirSenhaView,
    handleRedefinirSenha,
    redefinirNomeView,
    handleRedefinirNome
};
