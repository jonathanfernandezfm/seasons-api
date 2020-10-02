var jwt = require('jsonwebtoken');

// User validation
function validateUser(req, res, next) {
    if(req.headers['authorization']){
        var token = req.headers['authorization'].split(' ')[1];
    }
    
    jwt.verify(token, req.app.get('secretKey'), function(err, decoded) {
        if (err) {
            res.status(401).json({status:"401", reason: "Unauthorized access", message: "User token not found"});
        }else{
            req.body.userId = decoded.id;
            next();
        }
    });
}

module.exports = {validateUser}