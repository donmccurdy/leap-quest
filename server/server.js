
var WebSocketServer = require('ws').Server;

var defaults = {
	port: 5050
};

var Server = function (options) {
	this.port = options.port || defaults.port;
	this.init();
};

Server.prototype.init = function () {
	this.ws = new WebSocketServer({port: this.port});
	this.ws.on('connection', function (socket) {
		console.log('Client connected');

		socket.on('message', function (message) {
			console.log('Message received: ' + message);
		});
	});
	console.log('Socket server started on ' + this.port);
};

module.exports = Server;
