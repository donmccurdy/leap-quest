define(['settings'], function (settings) {
	var Self = function (state) {
		this.socket = new WebSocket(settings.getSocketURL());
		this.socket.onopen = _.bind(this.onConnect, this, state);
		this.socket.onmessage = _.bind(this.onEvent, this);
		this.socket.onclose = _.bind(this.onClose, this);
		this.routes = { event: [] };
	};

	Self.prototype.on = function (route, callback) {
		this.routes[route].push(callback);
	};

	Self.prototype.onConnect = function (state) {
		console.log('Connected to ' + settings.getSocketURL());
		this.socket.send(JSON.stringify(
			_.extend({type: 'request-join'}, state)
		));
	};

	Self.prototype.onClose = function () {
		console.log('Lost connection to ' + settings.getSocketURL());
	};

	Self.prototype.onEvent = function (event) {
		console.log('Event Recieved!');
		event = JSON.parse(event.data);
		console.log(event);

		_.each(this.routes.event, function (callback) {
			callback(event);
		});
	};

	return Self;
});
