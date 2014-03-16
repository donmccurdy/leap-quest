define([
	'view/zone_view/TerrainView',
	'view/actor_view/PlayerActorView',
	'OrbitControls',
	'Stats'
	], function (Terrain, Player) {

	var View = function (element, options) {
		options = options || {};
		this.element = element;
		this.width = options.width || 640;
		this.height = options.height || 400;
		this.init();
	};

	View.prototype.init = function () {
		// Scene
		this.scene = new THREE.Scene();

		// Renderer
		this.renderer = new THREE.WebGLRenderer({antialias:true});
		this.renderer.setSize(this.width, this.height);
		this.renderer.setClearColor(0x333F47, 1);
		this.element.appendChild(this.renderer.domElement);

		// Active / Passive Objects
		this.active = [];
		this.passive = [];

		// Perspective + Lighting
		this.initCamera();
		this.initLighting();
		this.initControls();
		this.initStats();
	};

	View.prototype.initCamera = function () {
		this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 20000);
		this.camera.position.set(-8, 8, 20);
		this.scene.add(this.camera);
	};

	View.prototype.initLighting = function () {
		var light1 = new THREE.PointLight(0x888888),
			light2 = new THREE.PointLight(0x888888);
		light1.position.set(-100,100,100);
		light2.position.set(50,100,-100);
		this.scene.add(light1);
		this.scene.add(light2);
	};

	View.prototype.initControls = function () {
		this.active.push(
			new THREE.OrbitControls(
				this.camera,
				this.renderer.domElement
			)
		);
	};

	View.prototype.initStats = function () {
		var stats = new Stats();
		stats.domElement.style.position = 'absolute';
		stats.domElement.style.top = '0px';
		document.body.appendChild( stats.domElement );
		this.active.push(stats);
	};

	View.prototype.trigger = function (event) {
		if (event.action === 'create') {

		} else if (event.action === 'remove') {

		} else if (event.action === 'update') {

		}
		console.log('triggered loadup');
		this.loadTerrain(new Terrain());
		this.loadPlayer(new Player());
		this.loadPlayer(new Player());
	};

	View.prototype.loadTerrain = function (terrain) {
		this.terrain = terrain;
		this.scene.add(terrain.mesh);
	};

	View.prototype.loadPlayer = function (player) {
		this.scene.add(player.mesh);
		if (!this.player) player.bindEvents(window);
		this.player = player;
		this.active.push(player);
	};

	View.prototype.animate = function () {
		// Measure time elapsed
		var now = _.now(), 
			elapsed = now - this._last_animate;
		this._last_animate = now;

		// Update active objects
		for (var i = 0, len = this.active.length; i < len; ++i) {
			this.active[i].update(elapsed);
		} 

		// Render
		this.renderer.render(this.scene, this.camera);

		// Request next render
		requestAnimationFrame(_.bind(this.animate, this));
	};

	return View;
});