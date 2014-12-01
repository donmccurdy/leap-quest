define ([
	'THREEx'
	], function (THREEx) {

	var TILE_WIDTH = 50;
	var TILE_HEIGHT = 0.5;
	var TUFT_COUNT = 1000;
	var TUFT_SCALE = 3.0;

	THREEx.createGrassTufts.baseUrl = 'bower_components/threex.grass/';

	var Self = function (attributes) {
		this.attributes = _.extend(attributes || {}, {
			id: _.uniqueId('terrain-')
		});
		this.mesh = new THREE.Mesh(
			new THREE.CubeGeometry( TILE_WIDTH, TILE_HEIGHT, TILE_WIDTH ),
			this.loadTexture()
		);
		this.props = this.loadProps();
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
		tex.repeat.x = 8;
		tex.repeat.y = 8;
		return window.tex = new THREE.MeshBasicMaterial({
			map: tex
		});
	};

	Self.prototype.loadProps = function () {
		var tufts, coords	= new Array(TUFT_COUNT);
		for(var i = 0; i < TUFT_COUNT; i++){
			coords[i] = new THREE.Vector3(
				(Math.random() - 0.5) * TILE_WIDTH / TUFT_SCALE,
				0.25 / TUFT_SCALE,
				(Math.random() - 0.5) * TILE_WIDTH / TUFT_SCALE
			);
		}
		tufts = new THREEx.createGrassTufts(coords);
		tufts.scale.set(TUFT_SCALE, TUFT_SCALE, TUFT_SCALE);
		return tufts;
	};

	Self.prototype.init = function () {
		this.mesh.add(this.props);
		this.mesh.position.set(0,0,0);
	};

	return Self;
});
