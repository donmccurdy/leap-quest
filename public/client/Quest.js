		view = new Quest.View(document.body, {
			width: window.innerWidth,
			height: window.innerHeight
		});
		terrain = new Quest.TerrainView();
		player = new Quest.PlayerActorView();

		view.loadTerrain(terrain);
		view.loadPlayer(player);
		view.animate();