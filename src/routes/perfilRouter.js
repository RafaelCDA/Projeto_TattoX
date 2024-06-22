// src/routes/perfilRouter.js
const express = require('express');
const router = express.Router();
const perfilController = require('../controller/perfilController');



router.get('/', perfilController.indexView);
router.get('/login', perfilController.loginView);
router.get('/cadastro', perfilController.cadastroView);
router.get('/banco', perfilController.bancoView);
router.get('/config', perfilController.configView);
router.get('/logout', perfilController.logout);
router.get('/tatuador-perfil',perfilController.homeTatuadorView);
router.get('/editar-perfil-tatuador', perfilController.editarPerfilTatuadorView);
router.get('/redefinir-senha', perfilController.redefinirSenhaView);
router.get('/buscar-tatuador', perfilController.buscarTatuador);
router.get('/tatuador/:id', perfilController.verPerfilTatuador);

router.post('/atualizar-perfil-tatuador', perfilController.handleAtualizarPerfilTatuador);
router.post('/redefinir-senha', perfilController.handleRedefinirSenha);
router.get('/redefinir-nome', perfilController.redefinirNomeView);
router.post('/redefinir-nome', perfilController.handleRedefinirNome);

router.post('/cadastro', perfilController.handleCadastro);
router.post('/login', perfilController.handleLogin);

module.exports = router;