/**
 * The simplest of protagonists
 */
define(['view/actor_view/ActorView'], function (Parent) {
	var Self = function (attributes) {
		Parent.apply(this, arguments);

		var head = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1));
		head.position.set(0,1,0);
		var torso = new THREE.Mesh(new THREE.CubeGeometry(0.2, 1, 0.2));
		torso.position.set(0,0,0);
		var arms = new THREE.Mesh(new THREE.CubeGeometry(1.5, 0.2, 0.2));
		arms.position.set(0,0.5,0);
		var geometry = new THREE.Geometry();
		THREE.GeometryUtils.merge(geometry, head);
		THREE.GeometryUtils.merge(geometry, torso);
		THREE.GeometryUtils.merge(geometry, arms);

		this.mesh = new THREE.Mesh(
			geometry,
			new THREE.MeshLambertMaterial({color: 0xf2d732})
		);
		this.mesh.position.set(0,0.8,0);

		// TODO donmccurdy - verify it's the current user.
		// Zone should probably handle this.
		this.bindEvents(window);
	};
	Self.prototype = new Parent();
	Self.prototype.constructor = Self;

	Self.prototype.bindEvents = function (element) {
		var bound = {},
			dirMap = { 37: ['x', -1], 38: ['z', -1], 39: ['x', 1], 40: ['z',1] };

		element.addEventListener('keydown', _.bind(function (e) {
			var delta = dirMap[e.keyCode];
			if (delta && !bound[delta[0]]) {
				bound[delta[0]] = 1;
				this.velocity[delta[0]] += delta[1];
			} else if (e.keyCode === 32 && !this.constraints.y) {
				this.jump();
			}
		}, this));

		element.addEventListener('keyup', _.bind(function (e) {
			var delta = dirMap[e.keyCode];
			if (delta && bound[delta[0]]) {
				bound[delta[0]] = 0;
				this.velocity[delta[0]] -= delta[1];
			}
		}, this));

	};

	Self.prototype.jump = function () {
		if (this.constraints.y) return;

		this.constraints.y = true;
		var ground = this.mesh.position.y;
		this.tween = createjs.Tween.get(this.mesh.position)
			.to({y: ground + this.options.bounceHeight},
				this.options.bounceSpeed * 0.6,
				createjs.Ease.circOut)
			.to({y: ground},
				this.options.bounceSpeed * 1.4,
				createjs.Ease.bounceOut)
			.call(_.bind(function () {
				this.constraints.y = false;
				this.tween = null;
			}, this));

		window.tw = this.tween;
	};

	return Self;
});
