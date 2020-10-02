// Codificamos las operaciones que se podran realizar con relacion a los usuarios
const TVDB = require('../../lib/tvdb-node');
const tvdb = new TVDB();

const handlers = require('../../handlers/http')

module.exports = {
    // yId: function(req, res, next) {
    //     followModel.create({ _user: req.body.userId, _serie: req.body.serie, favourite: req.body.favourite, rating: req.body.rating, notification: req.body.notification, seen_finished: req.body.seen_finished }, function (err, result) {
    //         if (err) 
    //             next(err);
    //         else
    //             res.json({status: "OK", message: "Follow added successfully"});
    //     });
    // },
    getById: function(req, res, next) {
        tvdb.getSeriesById(req.params.id)
            .then(response => {
                res.status(200).json({data: response})
            })
            .catch(err => {
                console.error(err);
                if(err.status === 404)
                    res.status(404).json({code: 404, reason: "Content not found", message: "Not found"});
                else
                    res.status(500).json({code: 500, reason: err.message, message: "Internal Server Error"});
            })
    },
    search: function(req, res, next) {
        if(!req.query.name)
            res.status(400).json({code: 400, reason: "Name parameter missing", message: "Bad Request"});

        tvdb.searchSeriesByName(req.query.name)
            .then(response => {
                res.status(200).json({data: response});
            })
            .catch()
    }
}