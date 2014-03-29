define([
	'model/actor_model/ActorModel',
	'events/events'
], function (Parent, events) {
	var Self = function (attributes) {
		Parent.apply(this, arguments);
		this.set('className', 'PlayerActor');
	};

	Self.prototype = new Parent();
	Self.prototype.constructor = Self;

	Self.prototype.init = function () {
		Parent.prototype.init.apply(this);

		this.relay = this.get('relay');
		this.set('relay', 0);
		this.relay.onEvent = _.bind(this.trigger, this);
		this.relay.onDisconnect = _.bind(function () {
			var removeEvent = events.create({
				eventClass: 'ZoneEvent',
				action: 'remove',
				id: this.get('id')
			});
			removeEvent.update(this.zone);
		}, this);

		this.on('death', _.bind(function () {
			console.log(this.get('name')  + ' has died!');
		}, this));
	};

	Self.prototype.joinZone = function (zone) {
		Parent.prototype.joinZone.apply(this, arguments);

		// Confirm login
		this.relay.send(events.create(_.extend(
			{
				eventClass: 'SystemEvent',
				type: 'accept-join'
			},
			this.attributes
		)));
	};

	Self.prototype.triggerRemote = function (event) {
		this.relay.send(event, function (error) {
			if (error) this.onError(error);
		});
	};
	return Self;
});