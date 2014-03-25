var defaults = {
	position: {x: 0, y: 0.8, z: 0},
	velocity: {x: 0, y: 0, z: 0},
	speed: 4 / 1000,
	jumpSpeed: 300,
	jumpHeight: 2
};

define(function () {
	var Self = function (attributes) {
		this.attributes = _.extend(
			{},
			defaults,
			_.omit(attributes, 'type')
		);
		this.init();
	};

	Self.prototype.init = function () {};
	Self.prototype.sync = function () {};

	Self.prototype.get = function (property) {
		return this.attributes[property];
	};

	Self.prototype.set = function (property, value) {
		this.attributes[property] = value;
		return this;
	};

	Self.prototype.joinZone = function (zone) {
		this.zone = zone;
		this.sync();
	};

	Self.prototype.export = function () {
		return _.extend({
			type: 'zone',
			action: 'create'
		}, this.attributes);
	};

	Self.prototype.trigger = function (event) {
		console.log(event);
		console.log('actor-trigger');
		this.zone.trigger(event, this);
	};

	Self.prototype.on = function (route, callback) {
		this.routes[route].push(callback);
	};

	Self.prototype.off = function (route, callback) {
		// TODO donmccurdy - memory might get out of control
		//	without this implemented.
	};

	Self.prototype.onError = function (error) {
		console.log('catastrophic loss!');
		console.log(error);
	};

	////////////////////// ACTOR INTERFACE

	Self.prototype.moveTo = function (x, y, z) {
		self.destination = { x: x, y: y, z: z };
	}

	Self.prototype.jump = function () {

	};
	return Self;
});
