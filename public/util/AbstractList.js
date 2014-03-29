/**
 * AbstractList: Utility collection for objects with IDs.
 */
define(function () {
	var Self = function () {
		this.hash = {};
	};

	Self.prototype.push = function (obj) {
		this._validate(obj);
		this.hash[obj.get('id')] = obj;
	};

	Self.prototype.get = function (id) {
		return this.hash[id];
	}

	Self.prototype.pop = function (id) {
		var obj = this.hash[id];
		delete this.hash[id];
		return obj;
	};

	Self.prototype.unload = function () {
		var hash = this.hash;
		this.hash = {};
		return hash;
	};

	Self.prototype._validate = function (obj) {
		var id = obj.get('id');
		if (!id) throw 'No obj ID!';
		if (this.hash[obj.id]) throw 'Obj ID not unique!';
	};

	return Self;
});