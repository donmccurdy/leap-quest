define(function () {

	var defaults = {
		speed: 0.004,
		bounceSpeed: 300,
		bounceHeight: 2,
		name: 'Hero'
	};

	var Self = function (options) {
		this.options = _.extend({}, defaults, options || {});
		this.velocity = new THREE.Vector3(0,0,0);
		this.constraints = {};
		this.tween = null;
	};

	/**
	 * Update state. Called once per frame.
	 */
	Self.prototype.update = function (elapsed) {
		var delta = this.velocity
			.clone()
			.setLength(elapsed * this.options.speed);

		this.mesh.position.x += delta.x;
		this.mesh.position.z += delta.z;

		if (this.tween) this.tween.tick(elapsed);
	};

	return Self;
});
