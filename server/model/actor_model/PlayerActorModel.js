define(['model/actor_model/ActorModel'], function (Parent) {
	var Self = function (attributes, relay) {
		Parent.apply(this, arguments);
		this.set('className', 'Player');
		this.relay = relay;
	};

	Self.prototype = new Parent();
	Self.prototype.constructor = Self;

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