define(['view/actor_view/ActorView'], function (Parent) {
	var Self = function (attributes, zone) {
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
		this.mesh.position.set(
			this.get('position').x,
			this.get('position').y,
			this.get('position').z
		);
	};

	return Self;
});
