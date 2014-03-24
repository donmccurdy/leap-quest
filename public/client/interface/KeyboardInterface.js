define([
	'interface/Interface',
	'events/ActorEvent'
], function (Parent, ActorEvent) {
	var Self = function () {
		Parent.apply(this, arguments);
	};

	Self.prototype = new Parent();
	Self.prototype.constructor = Self;

	Self.prototype.init = function () {
		// var bound = {};
		// var dirMap = { 37: ['x', -1], 38: ['z', -1], 39: ['x', 1], 40: ['z',1] };

		this.el.addEventListener('keydown', _.bind(function (e) {
			// var delta = dirMap[e.keyCode];
			// if (delta && !bound[delta[0]]) {
				// bound[delta[0]] = 1;
				// this.trigger(new ActorEvent({
				// 	type: 'move',
				// 	delta[0]: delta[1]
				// });
				// this.velocity[delta[0]] += delta[1];
			// } else 
			if (e.keyCode === 32) {
				this.trigger(new ActorEvent({
					target: this.client.state.get('id'),
					t: this.client.clock.getCurrent(),
					type: 'jump'
				}));
			}
		}, this));

		this.el.addEventListener('keyup', _.bind(function (e) {
			// var delta = dirMap[e.keyCode];
			// if (delta && bound[delta[0]]) {
			// 	bound[delta[0]] = 0;
			// 	this.velocity[delta[0]] -= delta[1];
			// }
		}, this));
	};

	return Self;
});