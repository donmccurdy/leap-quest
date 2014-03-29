define([
	'model/ModelList',
	'model/actor_model/NPCActorModel',
	'model/models',
	'events/events'
], function (ModelList, NPC, models, events) {
	var Self = function () {
		this.id = _.uniqueId('zone-');
		this.objects = new ModelList();
		this.players = new ModelList();
		this.npcs = new ModelList();
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

	Self.prototype.add = function (event) {
		// TODO donmccurdy - is it really necessary
		// 	to separate different model types?
		var player = models.create(event);
		// TODO donmccurdy - not adding NPCs yet.
		player.triggerRemote(events.create({
			eventClass: 'SystemEvent',
			type: 'load-zone',
			id: this.id
		}));
		player.joinZone(this);
		
		// TODO donmccurdy - a bit silly not to
		// 	publish the new guy to the existing
		// 	players here. (see actor.sync())
		this.players.export(player);
		this.npcs.export(player);
		
		this.players.push(player);
	};

	Self.prototype.remove = function (event) {
		var model = this.npcs.pop(event.id)
			|| this.players.pop(event.id);
		this.players.triggerRemote(event);
	};

	/**
	 * Propagate an event to all clients, excluding
	 *	the (optional) source.
	 */
	Self.prototype.trigger = function (event, source) {
		this.players.triggerRemote(event, source);
	};

	Self.prototype.on = function () {

	};
	return Self;
});
