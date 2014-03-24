define (function () {
	var Self = function (attributes) {
		this.attributes = _.extend(attributes || {}, {
			id: _.uniqueId('terrain-')
		});
		this.mesh = new THREE.Mesh(
			new THREE.CubeGeometry( 50, 0.5, 50 ),
			this.loadTexture()
		);
		this.init();
	};

	Self.prototype.get = function (property) {
		return this.attributes[property];
	};

	Self.prototype.set = function (property, value) {
		this.attributes[property] = value;
		return this;
	};

	Self.prototype.loadTexture = function () {
		var tex = THREE.ImageUtils.loadTexture('/resources/texture/terrain-01.png');
		tex.wrapS = THREE.RepeatWrapping;
		tex.wrapT = THREE.RepeatWrapping;
		tex.repeat.x = 12;
		tex.repeat.y = 12;
		return window.tex = new THREE.MeshBasicMaterial({
			map: tex
		});
	};

	Self.prototype.init = function () {
		this.mesh.position.set(0,0,0);
	};

	return Self;
});
