Quest.Map = function (options) {
	options = options || {};
	this.init();
};

Quest.Map.prototype.init = function () {
	this.mesh = new THREE.Mesh(
		new THREE.CubeGeometry( 50, 0.5, 50 ),
		new THREE.MeshLambertMaterial({color: 0x55B663})
	);
};

Quest.Map.prototype.getMesh = function () {
	return this.mesh;
};