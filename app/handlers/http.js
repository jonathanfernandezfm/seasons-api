function logErrors(err, req, res, next) {
	console.error(err);
  	next(err);
}

function handle404(req, res, next) {
	let err = new Error('Not Found');
    err.status = 404;
    next(err);
};

function handleAll(err, req, res, next) {
	if(err.status === 404)
		res.status(404).json({code: 404, reason: "Endpoint not found", message: "Not found"});

	if(err.name === 'MongoError'){
		if(err.code === 11000)
			res.status(400).json({code: 400, reason: "Duplicated keys. Any of the elements you are trying to change are already there", message: "Bad Request"})
	}

	res.status(500).json({code: 500, reason: err.message, message: "Internal Server Error"});
}

module.exports = {logErrors, handle404, handleAll};