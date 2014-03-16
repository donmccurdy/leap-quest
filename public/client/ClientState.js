define(function () {
	var Self = function () {
		this.attributes = {
			id: 0,
			name: prompt('Name plz?', 'johnny')
		};
	};

	Self.prototype.set = function (property, value) {
		this.attributes[property] = value;
	};

	Self.prototype.get = function (property) {
		return this.attributes[property];
	};

	return Self;
});
