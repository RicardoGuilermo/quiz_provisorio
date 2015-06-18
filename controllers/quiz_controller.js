var models = require ('../models/models.js');

// Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
	models.Quiz.find(quizId).then(
		function(quiz) {
			if (quiz) {
				req.quiz = quiz;
				next();
			} else {
				next(new Error('No existe quizId=' + quizId));
			}
		}
	).catch(function(error) { next(error);});
};

// GET /quizes
exports.index = function(req, res) {

	var busqueda = req.query.search;
	if (busqueda) {
		busqueda = busqueda.toLowerCase().trim();
		busqueda = busqueda.replace(' ','%');
	}

	models.Quiz.findAll(busqueda ? {where: ["lower(pregunta) like ?", '%' + busqueda + '%']} : {}).then(
		function(quizes) {
			res.render('quizes/index.ejs', {quizes: quizes});
		}
	).catch(function(error) {next(error);});
};

//Get /quizes/:id
exports.show = function (req, res) {
	res.render('quizes/show', {quiz: req.quiz});
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
	var respuesta = req.query.respuesta.toLowerCase().trim();
	var resultado = 'Incorrecto';

	if (respuesta === req.quiz.respuesta.toLowerCase()) {
  		resultado = 'Correcto';
  	}
  	res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});

};

   




