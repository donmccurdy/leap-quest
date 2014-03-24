/**
 * ViewList: Utility collection for View objects.
 */
define(function () {
	var Self = function (scene) {
		this.scene = scene;
		this.hash = {};
	};

	Self.prototype.push = function (obj) {
		this._validate(obj);
		this.hash[obj.get('id')] = obj;
		this.scene.add(obj.mesh);
	};

	Self.prototype.get = function (id) {
		return this.hash[id];
	}

	Self.prototype.pop = function (id) {
		var obj = this.hash[id];
		delete this.hash[id];
		// TODO donmccurdy - remove mesh from scene
		return obj;
	};

	Self.prototype.unload = function () {
		var hash = this.hash;
		this.hash = {};
		// TODO donmccurdy - remove all from scene
		return hash;
	};

	Self.prototype.update = function (elapsed) {
		for (var id in this.hash) {
			if (this.hash.hasOwnProperty(id)) {
				this.hash[id].update(elapsed);
			}
		}
	};

	Self.prototype._validate = function (obj) {
		var id = obj.get('id');
		if (!id) throw 'No obj ID!';
		if (this.hash[obj.id]) throw 'Obj ID not unique!';
	};

	return Self;
});