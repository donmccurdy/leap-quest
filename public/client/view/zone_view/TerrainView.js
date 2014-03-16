define (function () {
	var Self = function (options) {
		options = options || {};
		this.id = _.uniqueId('terrain-');
		this.mesh = new THREE.Mesh(
			new THREE.CubeGeometry( 50, 0.5, 50 ),
			new THREE.MeshLambertMaterial({color: 0x55B663})
		);
		this.init();
	};

	Self.prototype.init = function () {
		this.mesh.position.set(0,0,0);
	};

	return Self;
});
