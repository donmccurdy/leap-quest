
// Requirements
var express = require('express'),
	logfmt = require('logfmt'),
	consolidate = require('consolidate'),
	handlebars = require('handlebars'),
	app = express();

// App metadata (that needs to go elsewhere)
var title = 'Leap Quest 0.1',
	author = 'Don McCurdy';

// Server configuration
app.use(logfmt.requestLogger());
app.use(express.static('public'));
app.set('view engine', 'html');
app.set('views', __dirname+ '/views');
app.engine('.html', consolidate.handlebars);

// Basic routes
app.get('/', function(req, res) {
	res.render('layout', {
		title: title,
		partials: { content: 'index' }
	});
});
app.get('/game', function (req, res) {
	res.render('layout', {
		title: title,
		partials: { content: 'game' }
	});
});

// Launch web server
var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log('Web server started on ' + port);
});

// Launch game server
var Server = require('./server/server.js');
var server = new Server({port: 5050});
