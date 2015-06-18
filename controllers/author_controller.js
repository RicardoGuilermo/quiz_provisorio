// GET /author
exports.author = function(req, res) {
	res.render('author', {author: 'Luis Suarez EL MATADOR'});
};