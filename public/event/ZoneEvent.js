define(['events/Event'], function (Event) {

	var Self = function (attributes) {
		Event.apply(this, arguments);
		this.eventClass = 'ZoneEvent';
	};

	Self.prototype = new Event();
	Self.prototype.constructor = Self;

	Self.prototype.update = function(zone) {
		this[this.action](zone);
	};

	/***********************************
	 ********* Event Effects ***********
	 ***********************************/

	 Self.prototype.create = function(zone) {
	 	zone.add(this);
	 };

	 return Self;
});