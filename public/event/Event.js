define(function () {

	var Self = function (attributes) {
		_.extend(this, attributes);
		this.start = this.start || _.now();
	};

	Self.prototype.export = function () {
		return _.omit(this, _.isFunction);
	};

	Self.prototype.update = function () {
		console.log('Event does not handle updates!');
	};

	return Self;
});