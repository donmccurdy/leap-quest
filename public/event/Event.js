define(function () {

	var _ = _ || require('lodash');

	var Self = function (attributes) {
		_.extend(this, attributes);
		this.start = this.start || _.now();
	};

	Self.prototype.export = function () {
		return _.reject(this, function (key) {
			return _.isFunction(this[key]);
		});
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