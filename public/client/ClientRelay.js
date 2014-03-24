define(['settings'], function (settings) {
	var Self = function (state) {
		this.socket = new WebSocket(this.getSocketURL());
		this.socket.onopen = _.bind(this.onConnect, this, state);
		this.socket.onmessage = _.bind(this.onEvent, this);
		this.socket.onclose = _.bind(this.onClose, this);
		this.routes = { event: [] };
	};

	Self.prototype.on = function (route, callback) {
		this.routes[route].push(callback);
	};

	Self.prototype.onConnect = function (state) {
		this.socket.send(JSON.stringify(
			_.extend({type: 'request-join'}, state.export())
		));
	};

	Self.prototype.onClose = function () {
		console.log('Lost connection to ' + this.getSocketURL());
	};

	Self.prototype.onEvent = function (event) {
		event = JSON.parse(event.data);
		console.log(event);

		_.each(this.routes.event, function (callback) {
			callback(event);
		});
	};

	Self.prototype.trigger = function (event) {
		this.socket.send(JSON.stringify(event.export()));
	};

	Self.prototype.getSocketURL = function () {
		var s = settings;
		return s.protocol + s.host + ':' + s.port + '?v=' + s.version;
	};

	return Self;
});
