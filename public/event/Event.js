define(function () {

	var Self = function (attributes) {
		this.attributes = attributes;
	};

	Self.prototype.toJSON = function () {
		return JSON.stringify(this.attributes);
	};

	Self.prototype.update = function () {
		console.log('Event does not handle updates!');
	};


	/**
	 * (Static) Factor function.
	 */
	Self.getInstance = function (event) {
		var EventClass = require('events/' + event.className);
		return new EventClass(event);
	};

	return Self;
});