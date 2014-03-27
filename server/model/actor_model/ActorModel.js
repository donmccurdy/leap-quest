var defaults = {
	position: {x: 0, y: 0.8, z: 0},
	velocity: {x: 0, y: 0, z: 0},
	speed: 4 / 1000,
	jumpSpeed: 300,
	jumpHeight: 2
};

define(['events/events'], function (events) {
	var Self = function (attributes) {
		this.attributes = _.extend(
			{},
			defaults,
			_.omit(attributes, 'type')
		);
		this.routes = [];
		this.init();
	};

	Self.prototype.init = function () {};
	Self.prototype.sync = function () {
		this.zone.trigger(this.export(), this);
	};

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
		return events.create(_.extend({
			eventClass: 'ZoneEvent',
			action: 'create'
		}, this.attributes));
	};

	/**
	 * Handles events affecting *this* actor.
	 */
	Self.prototype.trigger = function (event) {
		if (this.routes[event.type]) {
			_.each(this.routes[event.type], function (cbk) {
				cbk(event);
			});
		}
		console.log(event);
		event.update(this);
		this.zone.trigger(event, this);
	};

	Self.prototype.on = function (route, callback) {
		this.routes[route] = this.routes[route] || [];
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

	////////////////////// EVENT INTERFACE

	Self.prototype.remove = function () {
		console.log('actor.remove() not implemented');
	};

	////////////////////// ACTOR INTERFACE

	Self.prototype.moveTo = function (x, y, z) {
		// TODO donmccurdy use 'destination', or
		//	tweens/delay.
		this.set('position', { x: x, y: y, z: z });
	}

	Self.prototype.jump = function () {

	};
	return Self;
});
