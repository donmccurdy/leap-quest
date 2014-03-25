define(function () {
	var Self = function (socket) {
		this.socket = socket;
		this.socket.on('close', _.bind(this.disconnect, this));
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

	Self.prototype.disconnect = function () {
		console.log('disconnect whaat do i dooooo');
	};

	return Self;
});