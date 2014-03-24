define(['events/Event'], function (Event) {

	var Self = function (attributes) {
		Event.apply(this, arguments);
		this.eventClass = 'Actor';
		this.action = actionTypeMap[this.type];
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
		if (actionTypeMap[this.type]) {
			this[this.type](target);
		}
	};

	Self.prototype.create = function () {

	};

	/***********************************
	 ********* Event Effects ***********
	 ***********************************/

	var actionTypeMap = {
		move: 'update',
		moveTo: 'update',
		animate: 'update',
		damage: 'update',
		say: 'update',
		attack: 'update',
		block: 'update',
		jump: 'update'
	};

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