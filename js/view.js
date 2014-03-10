window.Quest = {};

Quest.View = function (element, options) {
	options = options || {};
	this.element = element;
	this.width = options.width || 640;
	this.height = options.height || 400;
	this.init();
};

Quest.View.prototype.init = function () {
	// Scene
	this.scene = new THREE.Scene();

	// Renderer
	this.renderer = new THREE.WebGLRenderer({antialias:true});
	this.renderer.setSize(this.width, this.height);
	this.renderer.setClearColor(0x333F47, 1);
	this.element.appendChild(this.renderer.domElement);

	// Perspective + Lighting
	this.initCamera();
	this.initLighting();
	this.initControls();

	// Stats
	this.stats = new Stats();
	this.stats.domElement.style.position = 'absolute';
	this.stats.domElement.style.top = '0px';
	document.body.appendChild( this.stats.domElement );
};

Quest.View.prototype.initCamera = function () {
	this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 20000);
	this.camera.position.set(-8, 8, 20);
	this.scene.add(this.camera);
};

Quest.View.prototype.initLighting = function () {
	var light1 = new THREE.PointLight(0x888888),
		light2 = new THREE.PointLight(0x888888);
	light1.position.set(-100,200,100);
	light2.position.set(50,200,-100);
	this.scene.add(light1);
	this.scene.add(light2);
};

Quest.View.prototype.initControls = function () {
	this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
};

Quest.View.prototype.loadMap = function (map) {
	this.map = map;

	var mesh = map.getMesh();
	mesh.position.set(0,0,0);
	this.scene.add(mesh);
};

Quest.View.prototype.loadCharacter = function (character) {
	this.character = character;
	character.bindEvents(window);

	var mesh = character.getMesh();
	this.scene.add(mesh);
	mesh.position.set(0,1,0);
};

Quest.View.prototype.animate = function () {
	var now = _.now(),
		elapsed = now - this._last_animate;
	this._last_animate = now;

	this.renderer.render(this.scene, this.camera);
	this.controls.update();
	this.stats.update();

	if (elapsed) {
		this.character.update(elapsed);
	}

	requestAnimationFrame(_.bind(this.animate, this));
};