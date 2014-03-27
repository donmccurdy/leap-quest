define([
	'view/zone_view/TerrainView',
	'view/actor_view/NPCActorView',
	'view/actor_view/PlayerActorView',
	'view/ViewList',
	'view/views'
	], function (Terrain, NPC, Player, ViewList, views) {

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
		if (event.eventClass === 'ActorEvent') {
			var target = this.active.get(event.target);
			if (target) {
				event.modify(target);
			}
		} else {
			console.error('Zone doesn\'t know what to do with event:');
			console.log(event);
		}
	};

	Self.prototype.add = function (event) {
		this.active.push(views.create(event));
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
