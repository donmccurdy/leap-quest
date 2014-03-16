define(['events/Event'], function (Event) {

	var Self = function (attributes) {
		Event.apply(this, attributes);
	};

	Self.prototype = new Event();
	Self.prototype.constructor = Self;

	Self.prototype.update = function (target) {
		if (this.action === 'update') {
			this.modify(target);
		} else if (this.action === 'create') {
			target.addActor(this.create());
		} else if (this.action === 'remove') {
			target.remove();
		}
	};

	Self.prototype.modify = function (target) {
		if (validActionTypes[this.actionType]) {
			this[this.actionType](target);
		}
	};

	Self.prototype.create = function () {

	};

	/***********************************
	 ********* Event Effects ***********
	 ***********************************/

	var validActionTypes = {
		move: 1,
		moveTo: 1,
		animate: 1,
		damage: 1,
		say: 1,
		attack: 1,
		block: 1
	};

	Self.prototype.move = function () {

	};

	Self.prototype.moveTo = function () {

	};

	Self.prototype.animate = function () {

	};

	Self.prototype.damage = function () {

	};

	Self.prototype.say = function () {

	};

	Self.prototype.attack = function () {

	};

	Self.prototype.block = function () {

	};

	return Self;
});