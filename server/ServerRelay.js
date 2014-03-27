define(['events/events'], function (events) {
	var Self = function (socket) {
		this.socket = socket;
		this.socket.on('message', _.bind(this._onEvent, this));
		this.socket.on('close', _.bind(this._onDisconnect, this));
	};

	Self.prototype.send = function (event) {
		event = event.toJSON
			? event.toJSON()
			: JSON.stringify(event);

		this.socket.send(event, function (error) {
			if (error) {
				console.log('waaaat error?');
			}
		});
	};

	/**
	 * Overridden by Player
	 */
	Self.prototype.onEvent = function () {};

	/**
	 * Private listener
	 */
	Self.prototype._onEvent = function (event) {
		console.log('_onEvent');
		try {
			event = JSON.parse(event);
			event = events.create(event);
			this.onEvent(event);
		} catch (error) {
			console.log('bad event!');
			console.log(error);
			console.log(event);
		}
	};

	Self.prototype.onDisconnect = function () {};
	Self.prototype._onDisconnect = function () {
		this.onDisconnect();
	};

	return Self;
});