const express = require('express'); 
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('./config/database'); //Importando la configuracion de conexion a la BD

const http_handlers = require('./app/handlers/http');
const users_handlers = require('./app/handlers/users');

// ROUTES DEFINITIONS
const users = require('./app/routes/users');
const follow = require('./app/routes/follows');
const series = require('./app/routes/series');
const { validateUser } = require('./app/handlers/users');

// APP
const app = express();
app.set('secretKey', '1234');

// DB
mongoose.connection.on('error', console.error.bind(console, 'Error connecting to MongoDB'));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));

// PUBLIC ROUTES
app.use('/users', users.router);
app.use('/users', validateUser, users.router1);

// PRIVATE ROUTES
app.use('/follows', users_handlers.validateUser, follow);
app.use('/series', users_handlers.validateUser, series);



app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
});

app.use(http_handlers.logErrors);
app.use(http_handlers.handle404);
app.use(http_handlers.handleAll);

app.listen(3000, function(){ console.log('Server running: http://localhost:3000');});