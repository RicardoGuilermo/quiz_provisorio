var express = require('express');
var models = require('../models/models.js');
var Promise = require('sequelize').Promise;

var temas = [
	{
		value: 'otro',
		label: 'Otro'
	},
	{
		value: 'humanidades',
		label: 'Humanidades'
	},
	{
		value: 'ocio',
		label: 'Ocio'
	},
	{
		value: 'ciencia',
		label: 'Ciencia'
	},
	{
		value: 'tecnologia',
		label: 'Tecnología'
	}
];

exports.load = function(req, res, next, quizId){
	models.Quiz.find({
		where: { id: Number(quizId) },
		include: [{model: models.Comment }]
	}).then(
		function (quiz) {
			if(quiz){
				req.quiz = quiz;
				console.log(quiz);
				next();
			}else{
				throw new Error('No existe quizId=' + quizId);
			}
	}).catch(function (error) { next(error); });
};

exports.index = function(req, res){
	var query = req.query.search || '';
	var search = '%' + query.replace(/ /g, '%') + '%';

	models.Quiz.findAll({
		where: ["pregunta like ?", search],
		order: [['pregunta', 'ASC']]
	}).then(function (quizes) {
		if(quizes){
	  		res.render('quizes/index', {quizes: quizes, errors: []});
		}
	}).catch(function (error) { next(error); });
};

exports.show = function(req, res){
	res.render('quizes/show', {quiz: req.quiz, errors: []});
};

exports.edit = function(req, res){
	res.render('quizes/edit', {quiz: req.quiz, errors: [], temas: temas});
};

exports.answer = function(req, res){
	var resultado = 'Incorrecto';
	if(req.query.respuesta === req.quiz.respuesta){
		resultado = 'Correcto';
	}
	res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado, errors: []});
};

exports.new = function(req, res){
	var quiz = models.Quiz.build({pregunta: '', respuesta: '', categoria: ''});
	res.render('quizes/new', {quiz: quiz, errors: [], temas: temas});
};

exports.create = function(req, res){
	var quiz = models.Quiz.build(req.body.quiz);
	quiz.validate().then(
		function(err) {
			if(err){
				res.render('quizes/new', {quiz: quiz, errors: err.errors, temas: temas});
			}else{
				quiz.save({fields: ["pregunta", "respuesta", "tema"]}).then(
					function () {
						res.redirect('/quizes');
					}
				);
			}
		}
	);
};

exports.update = function(req, res){
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	req.quiz.tema = req.body.quiz.tema;

	req.quiz.validate().then(
		function(err) {
			if(err){
				res.render('quizes/edit', {quiz: req.quiz, errors: err.errors, temas: temas});
			}else{
				req.quiz.save({fields: ["pregunta", "respuesta", "tema"]}).then(
					function () {
						res.redirect('/quizes');
					}
				);
			}
		}
	);
};

exports.destroy = function(req, res){
	req.quiz.destroy().then(function () {
  		res.redirect('/quizes');
	}).catch(function (error) { next(error); });
};

exports.statistics = function(req, res, next){

	Promise.all([
		models.Quiz.getCantidadPreguntasConComentarios(),
		models.Quiz.count(),
		models.Comment.count()
	]).then(function (resultados) {
		console.log(resultados);
		var cantidadPreguntasConComentarios = resultados[0];
		var cantidadPreguntas = resultados[1];
		var cantidadComentarios = resultados[2];

		var cantidadPreguntasSinComentarios = cantidadPreguntas - cantidadPreguntasConComentarios;
		var mediaComentariosPorPregunta = (cantidadComentarios / cantidadPreguntas).toFixed(2);

		var estadisticas = [
			{
				descripcion: 'Número de preguntas',
				resultado: cantidadPreguntas
			},
			{
				descripcion: 'Comentarios totales',
				resultado: cantidadComentarios
			},
			{
				descripcion: 'Promedio de comentarios por pregunta',
				resultado: mediaComentariosPorPregunta
			},
			{
				descripcion: 'Preguntas sin comentarios',
				resultado: cantidadPreguntasSinComentarios
			},
			{
				descripcion: 'Preguntas con comentarios',
				resultado: cantidadPreguntasConComentarios
			}
		];

		res.render('quizes/statistics', {estadisticas: estadisticas, errors: {}});
	}).catch(function (error) { next(error); });
};


