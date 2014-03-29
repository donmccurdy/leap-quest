define(['events/Event'], function (Event) {

	var Self = function (attributes) {
		Event.apply(this, arguments);
		this.eventClass = 'ActorEvent';
	};

	Self.prototype = new Event();
	Self.prototype.constructor = Self;

	Self.prototype.update = function (target) {
		this[this.type](target);
	};

	/***********************************
	 ********* Event Effects ***********
	 ***********************************/

	Self.prototype.move = function (target) {

	};

	Self.prototype.moveTo = function (target) {
		target.moveTo(this.x, this.y, this.z);
	};

	Self.prototype.jump = function (target) {
		target.jump();
	};

	Self.prototype.animate = function (target) {

	};

	Self.prototype.damage = function (target) {

	};

	Self.prototype.say = function (target) {

	};

	Self.prototype.attack = function (target) {

	};

	Self.prototype.block = function (target) {

	};

	return Self;
});