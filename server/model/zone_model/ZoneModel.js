var _ = require('lodash');
var NPC = require('../actor_model/NPCActorModel');

var Self = module.exports = function () {
	this.id = _.uniqueId('zone-');
	this.players = [];
	this.npcs = [];
	this.objects = [];
	this.terrain = null;
	this.init();
};

Self.prototype.init = function () {
	// TODO donmccurdy - this should read 
	//	from a zone24.json file or something
	for (var i = 0; i < 3; i++) {
		this.npcs.push(new NPC ({
			id: _.uniqueId('npc-'),
			position: {
				x: Math.random() * 50 - 25,
				y: 0.5,
				z: Math.random() * 50 - 25
			}
		}));
	}
};

Self.prototype.addPlayer = function (player) {
	var i, actor;
	player.joinZone(this);
	player.triggerRemote({
		type: 'zone',
		action: 'enter-zone',
		id: this.id
	});
	this.players.push(player);
	for (actor, i = 0; (actor = this.players[i]); ++i) {
		player.triggerRemote(actor.export());
	}
	for (actor, i = 0; (actor = this.npcs[i]); ++i) {
		player.triggerRemote(actor.export());
	}
};

/**
 * Propagate an event to all clients, excluding
 *	the (optional) source.
 */
Self.prototype.trigger = function (event, source) {
	source = source && source.get('id');
	for (var other, i = 0; (other = this.players[i]); ++i) {
		if (source && other.get('id') !== source) {
			other.triggerRemote(event);
		}
	}
};

Self.prototype.on = function () {

};