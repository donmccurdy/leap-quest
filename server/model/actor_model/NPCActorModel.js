var _ = require('lodash');
var Actor = require('./ActorModel.js');

var Self = module.exports = function (attributes) {
	Actor.apply(this, arguments);
	this.set('className', 'NPC');
};

Self.prototype = new Actor();
Self.prototype.constructor = Self;

Self.prototype.init = function () {

};