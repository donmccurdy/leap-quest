var logfmt = require('logfmt');
var handlebars = require('express3-handlebars');
var express = require('express');

module.exports = function (app) {
	app.use(logfmt.requestLogger());
	app.use(express.static('public'));
	app.set('views', __dirname+ '/views');
	app.engine('handlebars', handlebars({
	    defaultLayout: 'main',
	    layoutsDir: app.get('views') + '/layouts'
	}));
	app.set('view engine', 'handlebars');
};
