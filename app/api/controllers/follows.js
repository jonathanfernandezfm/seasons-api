// Cargamos el modelo recien creado
const followModel = require('../models/follows');

// Codificamos las operaciones que se podran realizar con relacion a los usuarios
module.exports = {
    addFollow: function(req, res, next) {
        followModel.create({ _user: req.body.userId, _serie: req.body.serie, favourite: req.body.favourite, rating: req.body.rating, notification: req.body.notification, seen_finished: req.body.seen_finished }, function (err, result) {
            if (err) 
                next(err);
            else
                res.json({status: "OK", message: "Follow added successfully"});
        });
    },
    removeFollow: function(req, res, next) {
        followModel.findOneAndDelete({ _user: req.body.user, _serie: req.body.serie}, function(err, followInfo){
            if(err)
                next(err);
            else {
                res.json({status:"OK", message: "Follow deleted successfully"});
            }
        });  
    },
    updateFollow: function(req, res, next) {
        followModel.findOneAndUpdate({ _user: req.body.user, _serie: req.body.serie}, { favourite: req.body.favourite, rating: req.body.rating, notification: req.body.notification, seen_finished: req.body.seen_finished }, function(err, followInfo){
            if(err)
                next(err);
            else {
                res.json({status:"OK", message: "Follow updated successfully", data: followInfo});
            }
        }); 
    },
    getFollow: function(req, res, next) {
        followModel.findOne({ _user: req.body.userId, _serie: req.body.serie}, function(err, followInfo){
            if(err)
                next(err);
            if(!followInfo)
                res.status(404).json({status: "404", reason: "Not Found"})
            else 
                res.json({status:"OK", data: followInfo});
        }); 
    },
    listFollows: function(req, res, next) {
        followModel.find({_user: req.body.userId}, function(err, followInfo){
            if(err)
                next(err);
            if(!followInfo)
                res.status(404).json({status: "404", reason: "Not Found"})
            else
                res.json({status: "OK", data: followInfo})
        })
    }
}