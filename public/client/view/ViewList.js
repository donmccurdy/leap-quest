/**
 * ViewList: Utility collection for View objects.
 */
define(['util/AbstractList'], function (Parent) {
	var Self = function (scene) {
		Parent.apply(this, arguments);
		this.scene = scene;
	};

	Self.prototype = new Parent();
	Self.prototype.constructor = Self;

	Self.prototype.push = function (obj) {
		Parent.prototype.push.apply(this, arguments);
		this.scene.add(obj.mesh);
	};

	Self.prototype.pop = function (id) {
		var obj = Parent.prototype.pop.apply(this, arguments);
		this.scene.remove(obj.mesh);
		return obj;
	};

	Self.prototype.unload = function () {
		var hash = Parent.prototype.unload.apply(this, arguments);
		_.each(hash, _.bind(function (obj) {
			this.scene.remove(obj.mesh);
		}, this));
		return hash;
	};

	Self.prototype.update = function (elapsed) {
		for (var id in this.hash) {
			if (this.hash.hasOwnProperty(id)) {
				this.hash[id].update(elapsed);
			}
		}
	};

	return Self;
});