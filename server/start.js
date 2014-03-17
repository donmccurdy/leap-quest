var Server = require('./Server');

module.exports = function (server) {
	return new Server(server);
};
