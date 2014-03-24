define([
	'interface/HUDInterface',
	'interface/KeyboardInterface',
	'interface/LeapInterface'
], function (HUD, Keyboard, Leap) {
	
	var Self = function (client) {
		this.client = client;
		this.interfaces = [
			new HUD(client),
			new Keyboard(client),
			new Leap(client)
		];
		this.init();
	};

	Self.prototype.init = function () {
		for (var itf, i = 0; (itf = this.interfaces[i]); ++i) {
			itf.on('*', _.bind(this._on, this));
		}
	};

	Self.prototype._on = function (e) {
		this.client.trigger(e);
	};

	return Self;
});