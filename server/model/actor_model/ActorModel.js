var Self = module.exports = function (options) {

};

Self.prototype.trigger = function (event) {
	console.log(event);
	console.log('actor-trigger');
	// Propagate up to yon world
};

Self.prototype.on = function (route, callback) {
	this.routes[route].push(callback);
};

Self.prototype.off = function (route, callback) {
	// TODO donmccurdy - memory might get out of control
	//	without this implemented.
};

Self.prototype.onError = function (error) {
	console.log('catastrophic loss!');
	console.log(error);
};