
var WebSocketServer = require('ws').Server;

var Server = function (server) {
	this.ws = new WebSocketServer({server: server});
	this.init();
};

Server.prototype.init = function () {
	this.ws.on('connection', function (socket) {
		console.log('Client connected');
		socket.on('message', function (message) {
			console.log('Message received: ' + message);
		});
	});
	console.log('Socket server started');
};

module.exports = Server;
