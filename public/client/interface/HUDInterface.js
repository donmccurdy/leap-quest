define([
	'interface/Interface',
	'events/ActorEvent'
], function (Parent, ActorEvent) {

	var DEBOUNCE = 300;

	var Self = function () {
		Parent.apply(this, arguments);
		this.mouseLock = false;
	};

	Self.prototype = new Parent();
	Self.prototype.constructor = Self;

	/**
	 * TODO donmccurdy - add HUD element.
	 */
	Self.prototype.init = function () {
		this.el.addEventListener('mousedown', _.bind(this.toggleLock, this, false));
		this.el.addEventListener('mousemove', _.bind(this.toggleLock, this, true));
		this.el.addEventListener('click', _.bind(this.onClick, this));
		this.el.addEventListener('resize', _.debounce(_.bind(this.onResize, this), DEBOUNCE));
		this.onResize();
	};

	Self.prototype.toggleLock = function (locked) {
		this.mouseLock = locked;
	};

	/**
	 * TODO donmccurdy - first check for hits
	 *	on the UI chrome, then terrain.
	 */
	Self.prototype.onClick = function (e) {
		if (this.mouseLock) return;

		var v = this.client.view.intersectScreen(
			(e.clientX / this.innerWidth) * 2 - 1,
			-(e.clientY / this.innerHeight) * 2 + 1
		);

		if (!v) return; 

		this.trigger(new ActorEvent({
			target: this.client.state.get('id'),
			t: this.client.clock.getCurrent(),
			type: 'moveTo',
			x: v.x,
			y: v.y,
			z: v.z
		}));
	};

	Self.prototype.onResize = function () {
		this.innerWidth = this.el.innerWidth;
		this.innerHeight = this.el.innerHeight;
		console.log('HUD resize!');
	};

	return Self;
});