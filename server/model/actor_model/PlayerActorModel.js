var _ = require('lodash');
var Actor = require('./ActorModel.js');

// TODO donmccurdy - lulz
var defaults = {
	id: Math.round(Math.random()*10000),
	name: 'Greg-' + Math.round(Math.random()*100)
};

var Self = module.exports = function (options) {
	Actor.apply(this, options);

	this.attributes = _.extend({
		id: options.id,
		name: options.name
	}, defaults);
	
	this.relay = options.relay;
	this.routes = [];

	this.init();
};

Self.prototype = new Actor();
Self.prototype.constructor = Self;

Self.prototype.init = function () {
	// TODO donmccurdy use a real event!
	this.relay.send(_.extend(
		{ type: 'accept-join' },
		this.attributes
	));
	this.relay.send({
		type: 'world',
		action: 'create'
	});
};

Self.prototype.get = function (property) {
	return this.attributes[property];
};

Self.prototype.triggerRemote = function (event) {
	this.relay.send(event, function (error) {
		if (error) this.onError(error);
	});
};

module.exports = Self;