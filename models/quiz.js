<<<<<<< HEAD
// Definicion del modelo de Quiz con validación, tema, Comentarios 
var path = require('path');

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Quiz',
			{
				pregunta: {
					type: DataTypes.STRING,
					validate: {
						notEmpty: {msg: "-> Falta pregunta"} 
					}
				},
				respuesta: {
					type: DataTypes.STRING,
					validate: {
						notEmpty: {msg: "-> Falta respuesta"} 
					}
				},
				tema: {
					type: DataTypes.STRING
				}
			},
			{
				classMethods: {
					getCantidadPreguntasConComentarios: function() {

						return sequelize.query('SELECT COUNT(DISTINCT("QuizId")) AS count FROM "Comments"',
							{raw: true, type: sequelize.QueryTypes.SELECT}).then(function(resultado){
									return resultado[0].count;
							});
					}
				}
			}
		);
}
=======
// Definicion del modelo de Quiz

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Quiz',
		{
			pregunta:  DataTypes.STRING,
        	respuesta: DataTypes.STRING,
    	}
 	);
};
>>>>>>> 216e3cb4fbf3ed890181e9aa924a93fb6fab5c95
