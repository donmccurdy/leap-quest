define(function () {

	var util = {
		toVector: function (obj) {
			return new THREE.Vector3( obj.x, obj.y, obj.z );
		}
	};

	var Self = function (attributes) {
		if (!attributes) return;
		this.attributes = _.extend(attributes, {
			velocity: util.toVector(attributes.velocity),
			position: util.toVector(attributes.position)
		});
		this.constraints = {};
		this.tweens = {};
	};

	Self.prototype.get = function (property) {
		return this.attributes[property];
	};

	Self.prototype.set = function (property, value) {
		this.attributes[property] = value;
		return this;
	};

	Self.prototype.moveTo = function (x, y, z) {
		// TODO donmccurdy - this is not an ok way to estimate ETA
		var target = new THREE.Vector3(x, y, z);
		var eta = this.mesh.position.distanceTo(target) / this.get('speed');
		this.getTween('move')
			.to({x: x, z: z}, eta, createjs.Ease.linear);
	};

	Self.prototype.jump = function () {
		if (this.constraints.y) return;

		this.constraints.y = true;
		var ground = this.mesh.position.y;
		this.getTween('jump')
			.to({y: ground + this.get('jumpHeight')},
				this.get('jumpSpeed') * 0.6,
				createjs.Ease.circOut)
			.to({y: ground},
				this.get('jumpSpeed') * 1.4,
				createjs.Ease.bounceOut)
			.call(_.bind(function () {
				this.constraints.y = false;
			}, this));
	};

	/**
	 * Add an animation, which will overwrite any
	 *	other animation on the same key.
	 */
	Self.prototype.getTween = function (key) {
		var id = key || _.uniqueId();
		return (this.tweens[id] = createjs.Tween.get(
			this.mesh.position
		));
	};

	/**
	 * Update state. Called once per frame.
	 */
	Self.prototype.update = function (elapsed) {
		var delta = this.get('velocity')
			.clone()
			.setLength(elapsed * this.get('speed'));

		this.mesh.position.x += delta.x;
		this.mesh.position.z += delta.z;

		for (var id in this.tweens) {
			this.tweens[id].tick(elapsed);
		}
	};

	return Self;
});
