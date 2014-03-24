/**
 * The simplest of protagonists
 */
define(['view/actor_view/ActorView'], function (Parent) {
	var Self = function (attributes) {
		Parent.apply(this, arguments);

		// TODO donmccurdy
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
		this.mesh.position.set(
			this.get('position').x,
			this.get('position').y,
			this.get('position').z
		);
	};
	Self.prototype = new Parent();
	Self.prototype.constructor = Self;

	return Self;
});
