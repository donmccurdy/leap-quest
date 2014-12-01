define([
		'view/zone_view/ZoneView',

		// Utilities
		'OrbitControls',
		'Stats'
	], function (Zone) {

		var EPS = 0.05;

		var Self = function (element, options) {
			options = options || {};
			this.element = element;
			this.clock = options.clock;
			this.width = options.width || 640;
			this.height = options.height || 400;
			this.init();
		};

		Self.prototype.init = function () {
			// Scene
			this.scene = new THREE.Scene();

			// Renderer
			this.renderer = new THREE.WebGLRenderer({antialias:true});
			this.renderer.setSize(this.width, this.height);
			this.renderer.setClearColor(0x333F47, 1);
			this.element.appendChild(this.renderer.domElement);

			// Nearby zones
			this.zones = {};

			// Paintable UI elements
			this.paintable = [];

			// Perspective + Lighting
			this.initCamera();
			this.initLighting();
			this.initControls();
			this.initStats();
		};

		Self.prototype.initCamera = function () {
			this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 20000);
			this.camera.position.set(-8, 8, 20);
			this.scene.add(this.camera);
		};

		Self.prototype.initLighting = function () {
			var light1 = new THREE.PointLight(0xAAAAAA),
				light2 = new THREE.PointLight(0x888888);
			light1.position.set(-100,100,100);
			light2.position.set(50,100,-100);
			this.scene.add(light1);
			this.scene.add(light2);
		};

		Self.prototype.initControls = function () {
			var controls = new THREE.OrbitControls(
				this.camera,
				this.renderer.domElement
			);
			controls.minPolarAngle = Math.PI / 4.0;
			controls.maxPolarAngle = Math.PI / 2.0 - EPS;
			this.paintable.push(controls);
		};

		Self.prototype.intersectScreen = function (mouseX, mouseY) {
			var v = new THREE.Vector3(mouseX, mouseY, this.camera.near);
			this.projector = this.projector || new THREE.Projector();
			this.projector.unprojectVector(v, this.camera)
			return this.getZone().intersectRay(new THREE.Raycaster(
				this.camera.position,
				v.sub(this.camera.position).normalize()
			));
		};

		Self.prototype.initStats = function () {
			var stats = new Stats();
			stats.domElement.style.position = 'absolute';
			stats.domElement.style.top = '0px';
			document.body.appendChild( stats.domElement );
			this.paintable.push(stats);
		};

		Self.prototype.trigger = function (event) {
			if (event.eventClass === 'ZoneEvent') {
				event.update(this.getZone(event));
			} else {
				this.getZone(event).trigger(event);
			}
		};

		/**
		 * Only one zone for now, but eventually we
		 *	may need to delegate on the front end.
		 *
		 *	- event is optional: return player zone
		 *		if not given.
		 */
		Self.prototype.getZone = function (event) {
			return _.find(this.zones, function () { return 1; });
		};

		Self.prototype.addZone = function (event) {
			this.zones[event.id] = new Zone(this.scene, event);
		};

		/**
		 * Render loop. KEEP IT FAST.
		 */
		Self.prototype.animate = function () {
			var elapsed = this.clock.getDelta();

			// Update paintable objects
			for (var i = 0, len = this.paintable.length; i < len; ++i) {
				this.paintable[i].update(elapsed);
			} 

			// Paint the current zone
			var currentZone = this.getZone();
			if (currentZone) currentZone.update(elapsed);

			// Render
			this.renderer.render(this.scene, this.camera);

			// Request next render
			requestAnimationFrame(_.bind(this.animate, this));
		};

		return Self;
});