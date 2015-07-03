var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
<<<<<<< HEAD
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');
=======
var authorController = require('../controllers/author_controller');
>>>>>>> 216e3cb4fbf3ed890181e9aa924a93fb6fab5c95



// Página de entrada (home page)
router.get('/', function(req, res) {
<<<<<<< HEAD
  res.render('index', { title: 'Quiz', errors: []});
});

// Autoload de comandos con ids
router.param('quizId', quizController.load);  // autoload :quizId
router.param('commentId', commentController.load);  // autoload :commentId


// Definición de rutas de sesion
router.get('/login',  sessionController.new);     // formulario login
router.post('/login', sessionController.create);  // crear sesión
router.get('/logout', sessionController.destroy); // destruir sesión




router.get('/quizes', 								quizController.index);
router.get('/quizes/new', 							sessionController.loginRequired, quizController.new);
router.post('/quizes/create', 						sessionController.loginRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)', 				quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', 			quizController.answer);
router.get('/quizes/:quizId(\\d+)/edit', 			sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)', 				sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)', 				sessionController.loginRequired, quizController.destroy);
router.get('/quizes/:quizId(\\d+)/comments/new', 	commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', 		commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId/publish', 		sessionController.loginRequired, commentController.publish);


router.get('/quizes/statistics', 					quizController.statistics);


// Ruta para la página de créditos
router.get('/author', function(req, res) {
  res.render('author', {frase: 'Sí, Marge, en teoría estoy contigo, pero en teoría, eso es como el comunismo ', errors: []}); 
  
});

=======
  res.render('index', { title: 'Quiz' });
});

// Autoload de comandos con :quizId
router.param('quizId', quizController.load);  // autoload :quizId

// Definición de rutas de /quizes
router.get('/quizes', 			quizController.index);
router.get('/quizes/:quizId(\\d+)',	quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',	quizController.answer);

/* GET author page. */
router.get('/author', authorController.author);
>>>>>>> 216e3cb4fbf3ed890181e9aa924a93fb6fab5c95

module.exports = router;


