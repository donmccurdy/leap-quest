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
	// TODO donmccurdy use real events!
	// TODO donmccurdy - zone and NPC load should be handled
	//	by the parent zone. Derp.

	// Confirm login
	this.relay.send(_.extend(
		{ type: 'accept-join' },
		this.attributes
	));

	// Enter initial zone
	this.relay.send({
		type: 'zone',
		action: 'enter-zone',
		id: _.uniqueId('zone-')
	});

	// Load player view
	this.relay.send({
		type: 'zone',
		action: 'create',
		className: 'Player',
		id: _.uniqueId('player-')
	});

	// Load a couple randomly-placed NPCs
	for (var i = 0; i < 3; i++) {
		this.relay.send({
			type: 'zone',
			action: 'create',
			className: 'NPC',
			id: _.uniqueId('npc-')
		});
	}
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