define([
	'ws',
	'ServerRelay',
	'model/WorldModel',
	'model/actor_model/PlayerActorModel'
], function (ws, ServerRelay, World, Player) {
	var Self = function (server) {
		this.ws = new ws.Server({server: server});
		this.world = new World();
		this.init();
	};

	Self.prototype.init = function () {
		this.ws.on('connection', _.bind(this.onConnect, this));
	};

	/**
	 * Create new player and bind event listeners.
	 */
	Self.prototype.onConnect = function (socket) {
		console.log('Client connected');
		socket.on('message', _.bind(
			this.onRemoteEvent, this, socket, {}));
	};

	/**
	 * Manages events coming from a client to the server.
	 */
	Self.prototype.onRemoteEvent = function (socket, context, event) {
		if (!(event = this.parse(event))) return;
		
		if (event.type === 'request-join') {
			// On request, instantiate player.
			context.player = new Player(event, new ServerRelay(socket));
			this.world.addPlayer(context.player);
		} else if (context.player) {
			// Delegate other events
			context.player.trigger(event);
		} else {
			// Error
			console.log('wrong event wrong time!');
			console.log(event);
		}
	};

	/**
	 * Decode the event data. Conversion to a full
	 *	Event.js object happens later.
	 */
	Self.prototype.parse = function (event) {
		try {
			var parsed = JSON.parse(event);
			return parsed;
		} catch (error) {
			console.log('Ur event sucks:');
			console.log(event);
		}
	};

	return Self;
});
