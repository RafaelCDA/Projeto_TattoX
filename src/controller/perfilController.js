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
                if(usuario.userType == 'tatuador'){
                    res.redirect('/tatuador-perfil');
                }else{
                    res.redirect('/');
                }
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

async function homeTatuadorView(req, res) {
    try {
        const usuario = await Usuario.findByPk(req.session.user.id);
        if (usuario) {
            res.render('home_tatuador.html', { usuario });
        } else {
            res.redirect('/login?error=Usuário não encontrado.');
        }
    } catch (error) {
        console.error('Erro ao carregar perfil do tatuador:', error);
        res.status(500).send('Erro ao carregar perfil do tatuador');
    }
}

function editarPerfilTatuadorView(req, res) {
    res.render('editar_perfilTatuador.html');
}

async function handleAtualizarPerfilTatuador(req, res) {
    const { localTrabalho, precoTatuagens, estilosDesenhos } = req.body;

    try {
        const usuario = await Usuario.findByPk(req.session.user.id);
        if (usuario) {
            usuario.localTrabalho = localTrabalho;
            usuario.precoTatuagens = precoTatuagens;
            usuario.estilosDesenhos = estilosDesenhos;
            await usuario.save();
            res.redirect('/tatuador-perfil?success=Perfil atualizado com sucesso!');
        } else {
            res.redirect('/editar-perfil-tatuador?error=Usuário não encontrado.');
        }
    } catch (error) {
        console.error('Erro ao atualizar perfil do tatuador:', error);
        res.status(500).send('Erro ao atualizar perfil do tatuador');
    }
}

async function buscarTatuador(req, res) {
    const { search } = req.query;

    try {
        const tatuador = await Usuario.findOne({ where: { nome: search, userType: 'tatuador' } });
        if (tatuador) {
            res.redirect(`/tatuador/${tatuador.id}`);
        } else {
            res.redirect('/?error=Tatuador não encontrado');
        }
    } catch (error) {
        console.error('Erro ao buscar tatuador:', error);
        res.status(500).send('Erro ao buscar tatuador');
    }
}

async function verPerfilTatuador(req, res) {
    const tatuadorId = req.params.id;

    try {
        const tatuador = await Usuario.findByPk(tatuadorId);
        if (tatuador) {
            res.render('verPerfilTatuador.html', { tatuador });
        } else {
            res.status(404).send('Tatuador não encontrado');
        }
    } catch (error) {
        console.error('Erro ao carregar perfil do tatuador:', error);
        res.status(500).send('Erro ao carregar perfil do tatuador');
    }
}

module.exports = {
    indexView,
    loginView,
    cadastroView,
    handleCadastro,
    handleLogin,
    logout,
    bancoView,
    configView,
    redefinirSenhaView,
    handleRedefinirSenha,
    redefinirNomeView,
    handleRedefinirNome,
    homeTatuadorView,
    editarPerfilTatuadorView,
    handleAtualizarPerfilTatuador,
    buscarTatuador,
    verPerfilTatuador
};
