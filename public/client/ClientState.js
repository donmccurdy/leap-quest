define(function () {
	var Self = function () {
		var id = 'user-' + Math.round(Math.random() * 100);
		this.attributes = { id: id, name: id };
	};

	Self.prototype.set = function (property, value) {
		this.attributes[property] = value;
	};

	Self.prototype.get = function (property) {
		return this.attributes[property];
	};

	Self.prototype.export = function () {
		return this.attributes;
	};

	return Self;
});
