var Zone = require('./zone_model/ZoneModel.js');

var Self = module.exports = function () {
	this.zones = [ new Zone() ];
	this.players = [];
	this.chatlog = [];
};

Self.prototype.addPlayer = function (player) {
	this.getZone(player).addPlayer(player);
	this.players.push(player);
};

Self.prototype.trigger = function (event) {

};

Self.prototype.on = function () {

};

Self.prototype.tick = function () {

};

Self.prototype.getZone = function (player) {
	return this.zones[0];
};