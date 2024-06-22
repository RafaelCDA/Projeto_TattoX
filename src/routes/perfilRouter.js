// src/routes/perfilRouter.js
const express = require('express');
const router = express.Router();
const perfilController = require('../controller/perfilController');
const upload = require('../upload');

router.get('/', perfilController.indexView);
router.get('/login', perfilController.loginView);
router.get('/cadastro', perfilController.cadastroView);
router.get('/banco', perfilController.bancoView);
router.get('/config', perfilController.configView);
router.get('/logout', perfilController.logout);

router.get('/redefinir-senha', perfilController.redefinirSenhaView);
router.post('/redefinir-senha', perfilController.handleRedefinirSenha);
router.get('/redefinir-nome', perfilController.redefinirNomeView);
router.post('/redefinir-nome', perfilController.handleRedefinirNome);

router.post('/upload', upload.single('image'), perfilController.handleImageUpload);
router.post('/cadastro', perfilController.handleCadastro);
router.post('/login', perfilController.handleLogin);

module.exports = router;
