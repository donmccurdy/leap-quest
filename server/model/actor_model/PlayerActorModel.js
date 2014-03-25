define(['model/actor_model/ActorModel'], function (Parent) {
	var Self = function (attributes, relay) {
		Parent.apply(this, arguments);
		this.set('className', 'Player');
		this.relay = relay;
		this.relay.onEvent = _.bind(this.trigger, this);
		this.relay.onDisconnect = _.bind(function () {
			console.log(this.get('name')  + ' has disconnected.');
		}, this);
	};

	Self.prototype = new Parent();
	Self.prototype.constructor = Self;

	Self.prototype.init = function () {
		Parent.prototype.init.apply(this);

		this.on('death', _.bind(function () {
			console.log(this.get('name')  + ' has died!');
		}, this));
	};

	Self.prototype.joinZone = function (zone) {
		Parent.prototype.joinZone.apply(this, arguments);

		// Confirm login
		this.relay.send(_.extend(
			{type: 'accept-join'},
			this.attributes
		));
	};

	Self.prototype.triggerRemote = function (event) {
		this.relay.send(event, function (error) {
			if (error) this.onError(error);
		});
	};
	return Self;
});