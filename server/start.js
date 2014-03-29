// Enable RequireJS
var requirejs
	= global.define
	= require('requirejs');

// Enable lodash
global._ = require('lodash');

// RequireJS config
var baseURL = __dirname;
requirejs.config({
	baseUrl: baseURL,
	paths: {
		events: '../public/event',
		'public': '../public'
	}
});

// Export start() function
var Server = requirejs('Server');
module.exports = function (server) {
	return new Server(server);
};
