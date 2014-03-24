define([
	'interface/Interface'
], function (Parent) {
	var Self = function () {
		Parent.apply(this, arguments);
	};

	Self.prototype = new Parent();
	Self.prototype.constructor = Self;

	return Self;
});