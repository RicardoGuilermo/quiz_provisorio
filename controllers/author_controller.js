// GET /author
exports.author = function(req, res) {
	res.render('author', {author: 'Ricardo Guillermo soy yo', errors: []});
};