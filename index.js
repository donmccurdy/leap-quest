
// Requirements
var express = require('express'),
	app = express(),
	http = require('http'),
	server = http.createServer(app),
	logfmt = require('logfmt'),
	consolidate = require('consolidate'),
	handlebars = require('handlebars');

// App metadata (that needs to go elsewhere)
var port = Number(process.env.PORT || 5000),
	title = 'Leap Quest 0.1',
	author = 'Don McCurdy';

// Launch web server
server.listen(port);
console.log('Web server started on ' + port);

// Launch game server
var Server = require('./server/Server.js');
var gameServer = new Server(server);

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
