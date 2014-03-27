define([
		'ClientRelay',
		'ClientState',
		'ClientClock',
		'ClientInterface',
		'view/View'
	], function (Relay, State, Clock, Interface, View) {
	
		var Self = function (element) {
			this.element = element;
			this.state = new State();
			this.relay = new Relay(this.state);
			this.clock = new Clock(this.relay);
			this.interface = new Interface(this);
			this.view = new View(document.body, {
				clock: this.clock,
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
			if (event.eventClass === 'SystemEvent') {
				event.update(this);
			} else {
				this.view.trigger(event);
			}
		};

		/**
		 * Delegates local events and passes them
		 *	up to the remove server.
		 */
		Self.prototype.trigger = function (event) {
			this.relay.trigger(event);
			this.view.trigger(event);
		};

		return Self;
});