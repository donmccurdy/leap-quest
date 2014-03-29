define(['model/zone_model/ZoneModel'], function (Zone) {
	var Self = function () {
		this.zones = [ new Zone() ];
		this.chatlog = [];
	};

	Self.prototype.tick = function () {};

	Self.prototype.getZone = function (event) {
		return this.zones[0];
	};
	return Self;
});