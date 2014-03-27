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
		socket.once('message', _.bind(this.onLogin, this, socket));
	};

	/**
	 * Approve/reject login event. Realistically
	 *	more will be necessary here.
	 */
	Self.prototype.onLogin = function (socket, event) {
		// try {
			if ((event = JSON.parse(event)) && event.type === 'request-join') {
				this.world.addPlayer(new Player(event, new ServerRelay(socket)));
			}
		// } catch (error) {
		// 	console.error('Ur login sucks:');
		// 	console.log(error);
		// 	console.log(event);
		// }
	};

	return Self;
});
