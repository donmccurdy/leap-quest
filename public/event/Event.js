define(function () {

	var Self = function (attributes) {
		_.extend(this, attributes);
		this.start = this.start || _.now();
	};

	Self.prototype.export = function () {
		return _.reduce(this, function (memo, value, key) {
			if (!_.isFunction(value)) memo[key] = value;
			return memo;
		}, {});
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