define([
	'view/zone_view/TerrainView',
	'view/actor_view/NPCActorView',
	'view/actor_view/PlayerActorView',
	'view/ViewList'
	], function (Terrain, NPC, Player, ViewList) {

	var Self = function (scene, options) {
		this.id = options.id;
		this.scene = scene;
		this.terrain = new Terrain();
		this.active = new ViewList(scene);
		this.passive = new ViewList(scene);

		this.init();
	};

	Self.prototype.init = function () {
		this.scene.fog = new THREE.FogExp2( 0xefd1b5, 0.0025 );
		this.passive.push(this.terrain);
	};

	Self.prototype.trigger = function (event) {
		if (event.action === 'create') {
			if (event.className === 'Player') {
				this.add(new Player(event));
			} else if (event.className === 'NPC') {
				this.add(new NPC(event));
			} else if (event.className === 'Object') {
				// TODO donmccurdy - passive, active, and item objects
				this.add(new Object(event));
			} else {
				console.log('Unknown classname: ' + event.className);
			}
		} else if (event.action === 'update') {
			var target = this.active.get(event.target);
			if (target) {
				event.modify(target);
			}
		} else if (event.action === 'remove') {

		}
	};

	Self.prototype.add = function (actor) {
		this.active.push(actor);
	};

	Self.prototype.update = function (elapsed) {
		this.active.update(elapsed);
	};

	Self.prototype.intersectRay = function (ray) {
		var intersects = ray.intersectObject(this.terrain.mesh);
		return _.size(intersects) ? intersects[0].point : null;
	};

	return Self;
});
