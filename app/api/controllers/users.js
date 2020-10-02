// Cargamos el modelo recien creado
const userModel = require('../models/users');
// Cargamos el módulo de bcrypt
const bcrypt = require('bcrypt'); 
// Cargamos el módulo de jsonwebtoken
const jwt = require('jsonwebtoken');

// Codificamos las operaciones que se podran realizar con relacion a los usuarios
module.exports = {
    create: function(req, res, next) {
        userModel.create({ name: req.body.name, email: req.body.email, password: req.body.password, language: req.body.language }, function (err, result) {
            if (err) 
                next(err);
            else
                res.json({status: "Ok", message: "User added successfully", data: null});
        });
    },
    authenticate: function(req, res, next) {
        const {email, password} = req.body;

        if(email && password) {
            userModel.findOne({email: email}, function(err, userInfo){
                if (err) {
                    next(err);
                } else if (userInfo === null){
                    next(new Error("User not found"));
                } else {
                    if(bcrypt.compareSync(req.body.password, userInfo.password)) {
                        const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' });
                        res.json({status:"OK", message: "User authenticated", data: {user: {name: userInfo.name, email: userInfo.email}, token: token}});
                    }else{
                        res.json({status:"Error", message: "Invalid email/password", data: null});
                    }
                }
            });
        } else {
            next(new Error("Invalid email/password"))
        }
    },
    changeLanguage: function(req, res, next) {
        console.log(req.body)
        userModel.findOneAndUpdate({_id: req.body.userId}, {language: req.body.language}, function(err, userInfo){
            if(err)
                next(err);
            else {
                res.json({status:"OK", message: "User updated successfully"});
            }
        });
    }
}