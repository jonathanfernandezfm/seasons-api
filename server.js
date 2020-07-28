const express = require('express'); 
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('./config/database'); //Importando la configuracion de conexion a la BD

const http_handlers = require('./app/handlers/http');
const users_handlers = require('./app/handlers/users');

// ROUTES DEFINITIONS
const users = require('./app/routes/users');
const follow = require('./app/routes/follows');

// APP
const app = express();
app.set('secretKey', '1234');

// DB
mongoose.connection.on('error', console.error.bind(console, 'Error connecting to MongoDB'));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));

// PUBLIC ROUTES
app.use('/users', users);

// PRIVATE ROUTES
app.use('/follows', users_handlers.validateUser, follow);



app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
});

app.use(http_handlers.logErrors);
app.use(http_handlers.handleAll);
app.use(http_handlers.handle404);

app.listen(3000, function(){ console.log('Server running: http://localhost:3000');});