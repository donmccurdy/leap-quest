var settings = require('./settings');

module.exports = function (app) {
	// Homepage
	app.get('/', function(req, res) {
		res.render('index');
	});

	// Game
	app.get('/game', function (req, res) {
		res.render('game', {
			settings: JSON.stringify(settings)
		});
	});
};
