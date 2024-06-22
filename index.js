const express = require('express');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const path = require('path');
const db = require('./src/db');
const app = express();

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/css'));
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
