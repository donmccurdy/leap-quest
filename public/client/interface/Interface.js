define(function () {
	var Self = function (client) {
		if (!arguments.length) return;
		this.client = client;
		this.el = this.client.element;
		this.callback = function () {};
		this.init();
	};

	Self.prototype.init = function () {};

	Self.prototype.on = function (event, callback) {
		// Assume event === '*'
		this.callback = callback;
	};

	Self.prototype.trigger = function (event) {
		this.callback(event);
	};

	return Self;
});