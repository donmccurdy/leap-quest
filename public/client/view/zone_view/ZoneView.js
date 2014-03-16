define([
	'view/zone_view/TerrainView',
	'view/actor_view/NPCActorView',
	'view/actor_view/PlayerActorView',
	'view/ViewList'
	], function (Terrain, NPC, Player, ViewList) {

	var Self = function (scene, options) {
		this.id = options.id;
		this.active = new ViewList(scene);
		this.passive = new ViewList(scene);

		this.init();
	};

	Self.prototype.init = function () {
		this.passive.push(new Terrain());
	};

	Self.prototype.trigger = function (event) {
		if (event.action === 'create') {
			if (event.className === 'Player') {
				this.active.push(new Player(event));
			} else if (event.className === 'NPC') {
				this.active.push(new NPC(event));
			} else if (event.className === 'Object') {
				// TODO donmccurdy - passive, active, and item objects
			} else {
				console.log('Unknown classname: ' + event.className);
			}
		} else if (event.action === 'modify') {

		} else if (event.action === 'remove') {

		}
	};

	Self.prototype.update = function (elapsed) {
		this.active.update(elapsed);
	};

	Self.prototype.loadPlayer = function (player) {
		this.scene.add(player.mesh);
		if (!this.player) player.bindEvents(window);
		this.player = player;
		this.active.push(player);
	};

	return Self;
});
