define(['events/Event'], function (Event) {

	var Self = function (attributes) {
		Event.apply(this, arguments);
		this.eventClass = 'SystemEvent';
	};

	Self.prototype = new Event();
	Self.prototype.constructor = Self;

	Self.prototype.update = function(client) {
		this[this.type](client);
	};

	/***********************************
	 ********* Event Effects ***********
	 ***********************************/

	 Self.prototype['accept-join'] = function(client) {
	 	client.state.set('id', this.id);
	 };

	 Self.prototype['load-zone'] = function(client) {
	 	client.view.addZone(this);
	 };

	 return Self;
});