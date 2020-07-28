// Cargamos el módulo de mongoose
const mongoose = require('mongoose');
//Definimos los esquemas
const Schema = mongoose.Schema;

// Creamos el objeto del esquema con sus correspondientes campos
const FollowSchema = new Schema({
    _user: {
        type: String,
        required: true,
        ref: 'Users'
    },
    _serie: {
        type: String,
        required: true,
    },
    favourite: {
        type: Boolean,
        required: false,
    },
    rating: {
        type: Number,
        required: false,
    },
    notification: {
        type: Boolean,
        required: false,
    },
    seen_finished: {
        type: Boolean,
        required: false,
    }
})
.index({
    _user: 1, 
    _serie: 1
}, {
    unique: true
});

// Exportamos el modelo para usarlo en otros ficheros
module.exports = mongoose.model('Follow', FollowSchema);