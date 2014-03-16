define([
		'ClientRelay',
		'ClientState',
		'view/View'
	], function (ClientRelay, ClientState, View, Terrain, Player) {
	
		var Self = function (element) {
			this.state = new ClientState();
			this.relay = new ClientRelay();
			this.view = new View(document.body, {
				width: element.innerWidth,
				height: element.innerHeight
			});

			this.relay.on('event', _.bind(this.onEvent, this));
			this.view.animate();
		};

		/**
		 * Route remote events to appropriate
		 *	handlers.
		 */
		Self.prototype.onEvent = function (event) {
			switch (event.type) {
				case 'world': 
					return this.view.trigger(event);
				case 'system':
					return console.log('Let\'s do stuff.');
				case 'accept-join':
					console.log(event);
					return this.state.set('id', event.id);
				default:
					console.error('Unknown event:');
					console.log(event);
			}
		};

		return Self;
});