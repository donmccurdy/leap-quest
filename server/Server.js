define([
	'ws',
	'ServerRelay',
	'model/WorldModel',
	'events/events'
], function (ws, ServerRelay, World, events) {
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
		socket.once('message', _.bind(this.onLogin, this, socket));
	};

	/**
	 * Approve/reject login event. Realistically
	 *	more will be necessary here.
	 */
	Self.prototype.onLogin = function (socket, event) {
		if ((event = JSON.parse(event)) && event.type === 'request-join') {

			// Spawn player
			event = events.create(_.merge({
				eventClass: 'ZoneEvent',
				className: 'PlayerActor',
				action: 'create',
				relay: new ServerRelay(socket)
			}, event));

			// Update zone
			event.update(this.world.getZone(event));

		}
	};

	return Self;
});
