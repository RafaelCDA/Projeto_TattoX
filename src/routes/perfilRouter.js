// perfilRouter.js
const express = require('express');
const router = express.Router();
const perfilController = require('../controller/perfilController');
const upload = require('../upload');

router.get('/', perfilController.indexView);
router.get('/login', perfilController.loginView);
router.get('/cadastro', perfilController.cadastroView);
router.get('/banco', perfilController.bancoView); // Nova rota para visualizar o banco

router.post('/upload', upload.single('image'), perfilController.handleImageUpload);
router.post('/cadastro', perfilController.handleCadastro);
router.post('/login', perfilController.handleLogin);

module.exports = router;
