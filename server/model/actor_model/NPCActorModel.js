define(['model/actor_model/ActorModel'], function (Parent) {
	var Self = function (attributes) {
		Parent.apply(this, arguments);
		this.set('className', 'NPC');
	};

	Self.prototype = new Parent();
	Self.prototype.constructor = Self;

	Self.prototype.init = function () {

	};
	return Self;
});
