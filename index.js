// index.js
const express = require('express');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const db = require('./src/db');
const app = express();
const path = require('path');

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/src/views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'src/uploads')));

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

db.sync().then(() => {
    console.log('Banco de dados sincronizado');
});

app.use('/', require('./src/routes/perfilRouter'));

const PORT = 8080;
app.listen(PORT, function () {
    console.log('app executando na porta ' + PORT);
});
