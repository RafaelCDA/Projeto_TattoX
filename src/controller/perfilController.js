function indexView(req, res) {
    res.render('index.html');
}

function loginView(req, res) {
    res.render('login.html');
}

function cadastroView(req, res) {
    res.render('cadastro.html');
}

function handleCadastro(req, res) {
    // Lógica para lidar com o cadastro pode ser adicionada aqui
    // Redireciona para a página de login após o cadastro
    res.redirect('/login');
}

function handleLogin(req, res) {
    // Lógica para lidar com o login pode ser adicionada aqui
    // Redireciona para a página inicial após o login
    res.redirect('/');
}

module.exports = {
    indexView,
    loginView,
    cadastroView,
    handleCadastro,
    handleLogin
};
