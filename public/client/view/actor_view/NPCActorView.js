define(['view/actor_view/ActorView'], function (Parent) {
	var Self = function (options) {
		Parent.apply(this, arguments);

		this.mesh = new THREE.Mesh(
			new THREE.CubeGeometry( 0.5, 0.5, 0.5 ),
			new THREE.MeshLambertMaterial({color: 0xFF8888})
		);

		this.init();
	};

	Self.prototype = new Parent();
	Self.prototype.constructor = Self;

	Self.prototype.init = function () {
		// TODO donmccurdy - this is a server-side decision.
		this.mesh.position.set(
			Math.random() * 50 - 25,
			0.5,
			Math.random() * 50 - 25
		);
	};

	return Self;
});
