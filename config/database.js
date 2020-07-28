//Cargando el modulo de mongoose
const mongoose = require('mongoose');
//Configurando la conexion para MongoDB, Debemos indicar el puerto y la IP de nuestra BD 
const mongoDB = 'mongodb://127.0.0.1:27017/SeasonsKingDB';
mongoose.connect(mongoDB, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;
module.exports = mongoose;